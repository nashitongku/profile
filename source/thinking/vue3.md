### vue3.x 新特性

##### 一、组合式api





##### 二、tree-sharking(死代码消除)

可减少vue体积

尝试了解其原理



##### 三、 各种api的用法

```js
import { createApp } from 'vue'
const app = createApp({})
app.component
app.directive
app.mixin	
app.use
app.config
app.provide
```

```js
import { defineComponent } from 'vue'
import { ref, onMounted } from 'vue'
import { toRefs,computed, watch } from 'vue'

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
  props: ({
    msg: String
  } as unknown) as undefined,
  setup(props: {
    msg: string
  }) {
    const computedMsg = computed(() => props.msg + '!!!')

    return {
      computedMsg,
    }
  }
})
</script>

```

##### 四、函数式组件

```js
import { h } from 'vue'
const DynamicHeading = (props, context) => {
  return h(`h${props.level}`, context.attrs, context.slots)
}

DynamicHeading.props = ['level']

export default DynamicHeading
```



##### 五、片段(支持多个根节点，注意：非 Prop 的 Attribute）

禁用 attribute 继承的常见情况是需要将 attribute 应用于根节点之外的其他元素。

```js
inheritAttrs:false //传给组件的 非props、v-on 也和props一起传到组件的$attrs属性
```

##### 六、Teleport

```html
<teleport to="#modals">
  <div>A</div>
</teleport>
<teleport to="#modals">
  <div>B</div>
</teleport>

<!-- result-->
<div id="modals">
  <div>A</div>
  <div>B</div>
</div>
```

##### 七、 v-model

支持定义修饰符、支持多v-model



##### 八、setup

接受两个参数：

props:  传入定义的props

context: 包含 attrs、slots和emit 三个对象

