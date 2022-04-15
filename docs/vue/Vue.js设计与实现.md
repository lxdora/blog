---
title: Vue.js设计与实现
date: 2022-4-11 19:01:35
tags: 
 - 前端
categories:
 - 技术文档

---

# 框架设计概览

## 权衡的艺术

视图层框架分为命令式和声明式。命令式框架的一大特点就是关注过程，jQuery就是一个命令式框架。声明式框架更加关注结果。Vue.js就是一个声明式框架。

声明式框架的性能不优于命令式, 但是声明式框架的可维护性优于命令式。

```js
<div id="div"></div>
//比如说要修改div中间的文字
// 命令式代码
div.textContent = 'hello'
//声明式, vue
<div id="div">{{value}}</div>
data(){
  return{
    value: ''
  }
}
created(){
  this.value = 'value'
}
```

能够想到，声明式框架的底层还是使用的命令式，只是将声明暴露给了用户

当需要对数据进行修改时，命令式框架能够直接知道要修改什么，所以其性能消耗最小，而声明式框架需要先找出哪些数据有了变化，然后才能进行修改，所以有以下公式：

假如将直接修改的性能消耗定位A，而寻找差异的性能消耗定为B，则：

- 命令式代码的更新性能消耗 = A
- 声明式代码的更新性能消耗 = B + A

虚拟DOM就是为了使寻找差异的性能消耗最小而出现的。

## 框架设计的核心要素

1. 提升开发体验，要提供友好的警告信息。

2. 控制框架代码的体积，生产中使用的代码体积越小越好，所以上面的提示信息不应再生产环境中出现。vue.js是这样解决的，所有的提示信息都通过一个变量来控制,在开发环境这个变量为true，生产环境则为false

   ```js
   if(__DEV__){
     warn('这是开发环境的警告信息')
   }
   ```

3. 要做到良好的Tree-Shaking

   Tree-Shaking是指消除那些永远不会被执行的代码。要想实现Tree-Shaking，模块必须是ESM，因为Tree-Shaking依赖ESM的静态结构。webpack和rollup等框架可以帮助我们实现Tree-Shaking，那么这些框架如何知道是否应该移除某段代码呢？__如果一个函数调用会产生副作用，那么就不能将它移除，什么是副作用呢？就是当调用函数的时候会对外部产生影响__

   ```js
   //utils.js
   export function foo(obj){
     obj && obj.foo
   }
   
   export function bar(obj){
     obj && obj.bar
   }
   // input.js
   import {foo} from 'utils.js'
   
   //使用roolup进行构建, 以input.js为入口，输出ESM，输出的文件叫做bundle.js
   npx rollup input.js -f esm -o bundle.js
   
   //bundle.js的内容如下
   function foo(obj){
     obj&obj.foo
   }
   ```

   从上面的代码可以看出， utils.js中的bar函数没有被用到，因此构建的时候就被删除了。那我们再看foo函数，能够看到只是读取了他的属性，并没有产生其他的副作用，那么为什么foo函数没有被删除呢。这是因为foo函数又产生副作用的可能性，比如说obj对象是一个通过Proxy代理的对象，并且他的getter夹子被进行了自定义，那么当我们获取obj属性的时候就会触发这个自定义夹子，从而产生副作用，而这种情况是构建工具无法识别的。因此就产生了另一种方法，让我们能够明确的告诉构建工具，这段代码不会产生副作用，构建的时候可以删除，这种方法就是注释代码`/*#__PURE__*/`,当构建工具在构建时遇到这一行代码，就会将其直接删除

   ```js
   const abc = /*#__PURE__*/ '123'
   function foo(obj){
     obj & obj.foo
   }
   
   /*#__PURE__*/ foo()
   ```

   __这个注释可以用于任何语句__

4. 框架应该输出怎样的构建产物？

   1. 如果希望能够直接通过`<script>`标签引入，那么构建产物应该是一个IIFE格式的资源，即立即调用的函数表达式，vue.js与vue.min.js就是这种形式的资源。rollup可以通过配置`format:iife`来输出这种形式的资源。

      ```js
      (function(){}())
      ```

   2. 目前浏览器基本已经实现了对原生ESM的支持，所以用户也可以使用`<script>`标签引入ESM格式的资源。`<script type="module" src="vue.esm-browser.js">`,同样，可以通过配置`format:esm`输出这种形式的资源。__无论是webpack还是roolup，在寻找资源时，如果package.js中存在module字段，那么会优先使用module字段指向的资源来代替main字段指向的资源。__

      在vue的package.json文件中可以看到如下配置

      ```js
      ```

      

   3. 

   4. 