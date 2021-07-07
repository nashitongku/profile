## Vue2原理

### 数据驱动

#### 核心点

##### 1. Object.defineProperty 拦截属性

###### a. 简单实现数据驱动视图

```js
//监听对象
const observe = function (target) {
    if (typeof target !== 'object' || target === null) {
        return
    }
    Object.keys(target).forEach(key => {
        defineProp(target, key, target[key])
    })
}

//修改属性值时拦截对象，并更新视图
const defineProp = function (target, prop, value) {
    observe(value)
    Object.defineProperty(target, prop, {
        get() {
            return value;
        },
        set(newValue) {
            if(value !== newValue){
                observe(newValue)
                value = newValue
                updateView()
            }
        }
    })
}

//更新视图
const updateView = function () {
    console.log("updateView")
}

// model层
let data = {
    name: 'feng',
    school: {
        name: 'beautiful school'
    }
}
//监听 data
observe(data)
```



##### 初步完

##### 成一个数据驱动视图，过程： 递归遍历data属性，如果是object类型，则遍历所有属性，对象的属性使用Object.defineProperty拦截处理，当set新值时更新视图。

###### 缺点：

1. Object.defineProperty只能拦截属性，data没有的属性，调用observe之后，无法监听；

2. 对象层级太多时，递归性能差；



##### 下面添加自定义数组监听，数组操作，

```js
let customArray = Object.create(Array.prototype);
['push', 'pop'].forEach(method => {
    customArray[method] = function () {
        updateView()
        Array.prototype[method].call(this, ...arguments)
    }
})
```



###### observe方法让 数组类型 继承自定义数组

```js
const observe = function (target) {
    if (typeof target !== 'object' || target === null) {
        return
    }

    if (Array.isArray(target)) {
        target.__proto__ = customArray;
    }

    Object.keys(target).forEach(key => {
        defineProp(target, key, target[key])
    })
}
```