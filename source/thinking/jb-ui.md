### 快速使用





1. 

   安装npm包 jb-cms-ui-test

   



```
npm install jb-cms-ui-test



Shell
```





1. 

   新建一个listMixin.js文件，继承BaseListPage

   



```
//listMixin.jsimport Vue from "vue";import BtnOperate from "@/page/user/components/BtnOperate";import JBCMSUI from '@lib/jb_cms_ui'const { BaseListPage } = JBCMSUI
export default {    extends: BaseListPage,     beforeMount() {        Vue.component('btn-operate', BtnOperate)    },}




TypeScript
```





1. 

   在vue文件import， 并且在mixins选项中使用

   



```
import listMixin from "@/mixins/ListMixin";
export default {...mixins: [listMixin],...}



TypeScript
```





1. 

   在vue文件的 模板中

   



```
<jb-table-widget  :table="table" :fetch-list-data="queryList"></jb-table-widget>
// queryList是 BaseListPage里的方法



TypeScript
```





1. 

   vue文件的js部分

   



```
import Course from '@/api'export default{	//api管理    apiManager: {      api: Course,      listFunc: "getPage",    },
	//表格配置    table: {       tableData: [],		//表格列的配置	   columnConfigs: [		{            label: "列标题",            prop: "id",            attrs: { align: "center", width: 150 },          },	   ],	}}




TypeScript
```





### table属性说明





1. 

   tableData: Array类型(对象数组), 数据源

   

2. 

   columnConfigs：表格列的配置，包括以下属性

   



- 

  label: String类型，列标题

  

- 

  prop: tableData每个元素的对象属性名(比如id, name)，当使用自定义组件时，这个值无效；

  

- 

  attrs: 会直接填在<e-table-column>标签的属性上

  

- 

  listeners: 监听<e-table-column>的事件

  

- 

  component: 自定义组件，包括name、attrs、attrsStatic、listeners四个属性、需要在beforeMount选项全局注册）

  



1. 

   name:  String类型，注册的组件名

   

2. 

   attrs:  Object类型，键是组件的prop，值是tableData的属性

   

3. 

   attrsStatic: Object类型，当无需tableData的数据时使用，键是组件的prop，值会原封不动的传入组件

   

4. 

   listeners： 监听组件事件

   



组件的功能描述











### 继承关系





**继承于：BaseListPage**







\+ 添加网页链接











### 显示样式一





显示效果：







\+ 上传图片





代码示例：





```
<template>  <jb-table-widget 	:table="table" 	:fetch-list-data="queryList">
</jb-table-widget>
</template>



Plain Text
```





```
// js 部分， 下面代码写在vue的 data(){ return {//写在这里...} }// 以下是例子      table: {        tableData: [],        columnConfigs: [          {            label: "课程ID",            prop: "id",            attrs: { align: "center", width: 150 },          },          {            label: "课程信息",            prop: "",            attrs: { align: "center", minWidth: 300 },            component: {              name: "slot-course",              attrs: {                avatar: "coverUrls",                rightTopStr: "title",              },            },          },          {            label: "学期归属",            prop: "",            attrs: { width: 230, align: "center" },            component: {              name: "term-type",              attrs: {                termType: "termType",              },            },          },          {            label: "是否上架",            prop: "",            attrs: {},            component: {              name: "switch-state",              attrs: {                id: "id",                value: "isDisabled",                row: "",              },              attrsStatic: {                buttons: [                  {                    label: "课程",                    open: false,                    emitEvent: "change",                  },                ],                type: false,              },              listeners: {                change: _.debounce(                  async (bol, id) => {                    console.log(bol, id, "点击");                    if (bol) {                      console.log("上架");                      await Course.onShelf(id).then((res) => {                        this.show(res.message);                      });                    } else {                      console.log("下架");                      await Course.offShelf(id).then((res) => {                        this.show(res.message);                      });                    }                    console.log(123);                    await this.getTabs();                    this.isDisabled = false;                    _self.queryList();                    // console.log(this.table.columnConfigs.attrsStatic);                    // await this.$nextTick(() => {});                  },                  250,                  { maxWait: 1000 }                ),              },            },          },
          {            label: "操作",            attrs: { minWidth: 260, fixed: "right", align: "center" },            prop: "",            component: {              name: "btn-operate",              attrs: { row: "", isDisabled: "isDisabled", hid: "hid" },              attrsStatic: {                buttons: [                  { label: "编辑", emitEvent: "edit", class: ["color-blue"] },                  {                    label: "删除",                    emitEvent: "delete",                    class: ["color-red"],                  },                ],              },              listeners: {                edit: (row) => {                  console.log("编辑");                  this.onEdit(row.id);                },                delete: (row) => {                  this.deleteCourseDialog = true;                  this.deleteCourseId = row.id;                },              },            },          },        ],        paginate: {          isShow: true,          page: 1,          pageSize: 15,          total: 0,        },     }




JavaScript
```





### Attributes





|               |            |                     |
| ------------- | ---------- | ------------------- |
| 参数          | 说明       | 类型                |
| data          | 表格数据源 | array               |
| columnConfigs | 表格列配置 | array: columnConfig |
| cssStyle      | 表格样式   |                     |
| paginate      | 分页配置   |                     |
| fetch         |            | function            |









### columnConfig





|           |                |      |        |        |
| --------- | -------------- | ---- | ------ | ------ |
| 属性      | 说明           | 类型 | 可选值 | 默认值 |
| label     |                |      |        |        |
| prop      |                |      |        |        |
| component | 自定义组件名称 |      |        |        |









### paginate





|          |      |      |        |        |
| -------- | ---- | ---- | ------ | ------ |
| 属性     | 说明 | 类型 | 可选值 | 默认值 |
| isShow   |      |      |        |        |
| page     |      |      |        |        |
| pageSize |      |      |        |        |
| totoal   |      |      |        |        |









### Events





|          |      |          |
| -------- | ---- | -------- |
| 事件名称 | 说明 | 回调参数 |
|          |      |          |













### Methods





|               |      |      |
| ------------- | ---- | ---- |
| 方法名        | 说明 | 参数 |
| fetchListData |      |      |
|               |      |      |