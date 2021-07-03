# javascript框架基础知识





### 一、this的几种指向

1. 在严格模式下自执行函数指向undefined

2. 非严格模式指向自执行函数指向window
   所以可以用这么判断当前环境是否严格模式

   ```javascript
   (function(){return !this}())
   ```

3. 在一个函数a里面定义一个函数b，然后在a函数里调用这个函数b，此时this指向跟自执行函数一样

### 二、new操作做了什么

模拟new的过程:

```javascript
const create = function(ClassName, ...args) {
    //让instant.prototype指向ClassName.prototype，缺少这一步新建的实例就没有ClassName原型
    let instant = Object.create(ClassName.prototype)
    ClassName.apply(instant, args)
    return instant;
}

const Dragon = function(name) {
    this.name = name;
}
Dragon.prototype.sounds = '吼吼吼...'

let dragon = create(Dragon, '小明')	
dragon.name //小明
dragon.sounds //吼吼吼...
```

### 三，Prototype

##### 定义：每个对象都会有prototype，prototype指向一个对象，类似于java的静态变量继承。

1. 为什么会有prototype？

一切都是为了复用和解藕，所有实例共享一个对象a，a对象是所有实例都需要且一样的。

2. 实例怎么指向原型。

   ```
   obj.__proto__
   obj.constructor.prototype
   ```

   

### 四，原型链

由于prototype指向一个对象。而js对象都会有自己的原型，对象原型＞对象＞对象原型＞对象...，因此形成了原型链。
    1. 原型链的尽头是什么呢
每个对象的原型链末端都会经过<u>Object.prototype</u>，而<u>Object.prototype＝undefined</u>。
<u>Object.getPrototypeOf(Object.prototype)结果为null</u>

2. **Object.prototype不能够被赋值, 会报错**

3. instanceof判断对象是否属于某个构造器。

   [^注意]: 1. 只要一个对象的原型不是`null`，`instanceof`运算符的判断就不会失真；2. 对于`undefined`和`null`，`instanceOf`运算符总是返回`false`； 3. instanceof不适用原始类型的值。

   ```js
   var s = 'hello';
   s instanceof String // false
   undefined instanceof Object // false
   null instanceof Object // false
   this instanceof ClassName //用于判断是否new出来的
   ```

   

   

