---
layout: post
title:  "JavaScript原型"
date:   2017-09-01 23:14:05 +0800
categories: [JavaScript]
tags: [javascript] 
excerpt: javascript原型的理解
---

# prototype(原型)

### 原型是函数特有的。  
>比如 `function P(){}`, P函数拥有属性(prototype)  

### 原型是可以更改的。
>我们可以在原型上添加和修改一些属性和方法， 
比如 `P.prototype = {method1: function(){}}`  ,  
但是这种赋值方式是直接覆盖原型，会覆盖之前的原型属性,  
而我们常常是在原型上添加属性或者方法，所以除非是第一次给原型赋值，否则直接赋值是不正确的。  
建议用这种方法添加原型: `P.prototype.method1 = function(){}`

### 原型链（重要）。(原型上的属性和方法只能通过原型来修改，子实例无法直接修改。)
>关于对象属性(通过函数创建的实例)的查找顺序。 首先看一下这个例子:
```javascript 
P.prototype.prop1 = 'i am prop1 from propotype'; 
var p1 = new P; 
p1.prop1; // i am prop1 from propotype 
```
当通过 p1.prop1 来获取 p1对象的prop1属性时，p1先在自身的属性里面查找prop1，发现没有这个属性，  
那怎么办呢？  
p1会到原型链里面去找,他发现确实有这个属性，然后就把原型上prop1的值读取出来。  
注意：如果没有找到prop1这个属性，他会继续顺着原型链直到找到需要的属性或者到达原型链的顶端(null)为止
```javascript 
p1.prop1 = 'i am prop1 from my own prop'
p1.prop1 // i am prop1 from my own prop
P.prototype.prop1 // i am prop1 from propotype
```
看到没有，当改变实例p1的prop1的值的时候，原型的prop1属性值没有变，这是因为p1本身没有prop1这个属性，直接`p1.prop1 = 'i am prop1 from my own prop'`给他赋值这个属性之后，相当于只是给p1添加prop1属性，并不会改变原型的属性值。
当我们再次通过 p1.prop1 来获取值的时候，由于p1自身已经有prop1这个属性了,所以他直接读取自身的属性值，不会去原型上找了。)

### 原型被子实例共享。
>```javascript 
function P(){}; 
P.prototype.prop1 = new Array; 
var p1 = new P,
p2 = new P; 
p1.prop1 === p2.prop1; // true
p1.__prop__.prop1 = 1; 
p2.__prop__.prop1; // 1
```
(p1 跟 p2 都是 P的实例对象, 当修改p1原型的prop1属性值时，p2原型的prop1属性值也被同时修改了，所以他们两个的原型是共享的，。)
运算符 instanceof 也是根据原型来判断 某个对象是否属于某个构造函数的.
