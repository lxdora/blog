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
      "main": "dist/vue.runtime.common.js",
      "module": "dist/vue.runtime.esm.js",
      ```

      可以知道，ESM资源默认是给rollup.js或webpack等打包工具使用的，而带有browser字样的ESM资源是直接给`<script type='module'>使用的`

   3. 除了可以使用`<script>`标签引入资源外，还希望可以在Node.js中通过require语句引用资源， `const Vue = require('vue')`,这个主要用于服务端渲染(SSR)。当进行服务端渲染时，Vue.js的代码是在Node环境中执行的，而非浏览器环境， Node环境中资源的模块格式是CommonJS(cjs), 同样可以通过配置`format:'cjs'`输出这样的资源

5. 特性开关

   > 通常框架给我们提供了大量的特性，而我们可能并不需要所有的特性，这时，如果提供一个特性开关，就能够通过控制特性开关，将不需要的特性排除，从而减小最终的资源的体积。
   >
   > 例如：
   >
   > Vue3推荐使用组合式api，而Vue2是使用选项式api的，且Vue3兼容了Vue2，因此，当我们使用Vue3进行开发时，如果我们确认不会使用选项式的api，就可以将该特性关闭。在Vue中，该特性开关为__VUE_OPTIONS_API,可以通过如下代码控制特性开关
   >
   > ```js
   > new webpack.DefinePlugin({
   >   __VUE_OPtiONS_API: JSON.stringify(false) //关闭该特性
   > })
   > ```

6. 错误处理

   ```js
   let handleError = null;
   export default {
     foo(fn){
       callWithErrorHandling(fn);
     }
     //用户可以调用该函数注册统一的错误处理函数
     registerErrorHandler(fn){
       handleError = fn
     }
   }
   
   function callWithErrorHandling(fn){
     try{
       fn & fn()
     }catch(e){
       //将捕获到的错误传递给用户的错误处理程序
       handlerError(e)
     }
   }
   ```

   提供了registerErrorHandler函数，用户可以调用它注册错误处理程序，然后在callWithErrorHandling函数内部捕获错误后，将错误传递给用户注册的错误处理程序， 这就是Vue.js错误处理的原理，在Vue中，也可以注册统一的错误处理函数

   ```js
   import App from 'App.vue'
   const app = createApp(App)
   app.config.errorHandler = ()=>{
     //错误处理程序
   }
   ```

## Vue.js3的设计思路

1. Vue.js3是一个声明式的UI框架，通常，描述UI有两种方法

   - 使用模板

     ```html
     <div onClick="handler"> <span></span> </div>
     ```

   - 使用JavaScript对象

     ```js
     const ui = {
       tag: div,
       props: {
         onClick: handler
       },
       children: [
         {tag: span}
       ]
     }
     ```

   那么这两种方式有何不同呢？使用JavaScript对象描述UI更加灵活。

   > 例如，有几个不同级别的标签h1~h3
   >
   > 如果使用JavaScript对象，只需要修改level值就行
   >
   > let level = 1;
   >
   > const ui = {
   >
   > tag: `h${level}`
   >
   > }
   >
   > 而使用模板的话，就必须穷举所有的情况
   >
   > \<h1 v-if="level===1">\</h1>
   >
   > \<h2 v-if="level===2">\</h2>
   >
   > \<h3 v-if="level===3">\</h3>
   
   可以看出，使用JavaScript对象来描述UI的方式更加灵活，而使用JavaScript对象描述UI就是所谓的虚拟DOM。在Vue组件中手写的渲染函数就是使用虚拟DOM来描述UI的。
   
   ```vue
   import {h} from 'vue'
   export default {
   render(){
   	return h('h1'. {onClick: handler})  //虚拟DOM
   }
   }
   ```
   
   h函数的返回值是一个对象，其作用是让我们编写虚拟DOM更加轻松。__h函数是一个辅助创建虚拟DOM的工具函数。__ 
   
   什么是组件的渲染函数？一个组件要渲染的内容是通过渲染函数来描述的，Vue会根据这个组件的渲染函数的返回值拿到虚拟DOM，然后就可以把组件的内容渲染出来了。

2. 渲染器

   虚拟DOM是如何变成真实DOM并渲染到浏览器界面的呢？ 这就使用到了渲染器，渲染器的作用就是把虚拟DOM渲染成真实DOM。

   假设有如下虚拟DOM：

   ```js
   const vnode = {
       tag: 'div',
       props: {
           onClick: ()=>alert('123'),
           
       },
       children: [
           {
               tag: 'span',
               props: {}.
               children: 'hello world'
           }
       ]
   }
   ```

   可以看出是有一个div标签，上面绑定了一个click事件，然后还有一个子span标签，内容为hello world, 接下来就是编写一个渲染器，将这个虚拟DOM渲染为真实DOM

   ::: details

   ```js
   function render(vnode, container){
       //使用vnode的tag作为标签名创建dom元素
       const el = document.createElement(vnode.tag);
       //遍历vnode的props， 将属性，事件添加到dom元素
       for(const key in vnode.props){
           if(/^on/.test(key)){
               //如果key以on开头，则认为是事件
               el.addEventListener(key.subString(2).toLowerCase(), vnode.props[key])
           }
       }
       //处理children
   	if(typeof vnode.children === 'string'){
           //如果children是一个字符串，则说明其是文本元素
           el.appendChild(document.createTextNode(vnode.children))
       }else if(vnode.children instenceof Array){
           //如果是一个数组，递归调用
           render(vnode.children, el);
       }
       //将元素添加到挂载点下
       container.appendChile(el);
   }
   ```

   :::

   上面的render函数接受两个参数， 一个是虚拟DOM对象， 另一个是真实DOM元素，作为挂载点，渲染器会把虚拟DOM渲染到该挂载点下。

   以上渲染器所作的操作是创建节点，渲染器更重要的作用是在更新节点上， 加入以上的vnode发生了变化

   ```js
   const vnode = {
       tag: 'div',
       props: {
           onClick: ()=>alert('123'),
           
       },
       children: [
           {
               tag: 'span',
               props: {}.
               children: 'good bye'
           }
       ]
   }
   ```

   文本内容从hello world 变成了 good bye,那么渲染器应该能够识别出哪里发生了变化并且只更新变化的部分，而不需要重新走一遍创建的流程。

3. 组件的本质

   __虚拟DOM就是用来描述真实DOM的普通JavaScript对象，渲染器会把这个对象渲染为真实的DOM__。

   虚拟DOM除了能够描述真实DOM，还可以用来描述组件， 组件是什么？__组件就是一组DOM元素的封装__。

   ```js
   const MyComponent = function(){
       return {
           tag: 'div',
           props: {
               onClick: ()=>alert('123')
           },
           children: 'hello component'
       }
   }
   ```

   vnode的tag可以用来描述普通的html标签，也可以用来描述组件，支持渲染组建的render函数如下：
   
   ```js
   function render(vnode, container){
       if(typeof vnode.tag === 'string'){
           renderElement(vnode, container)
       }else if (typeof vnode.tag === 'function'){
           renderComponent(vnode, container)
       }
   }
   ```

4. 编译器

   当我们提供虚拟DOM给Vue时，Vue可以使用渲染器将虚拟DOM渲染成真实DOM，但是如果提供虚拟DOM，对开发来说很不方便，因此Vue给我们提供了模板。编译器的作用就是将模板编译为渲染函数。一个.vue文件就是一个组件，其中template中的内容就是模板内容，编译器会将模板内容编译成渲染函数并添加到\<script>标签块的组件对象上。

   ```vue
   <template>
   	<div @click="()=>alert(123)">
           hello world
       </div>
   </template>
   export default {
   	data(){return {}},
   	methods: {}
   }
   ```

   最终在浏览器中运行的代码如下

   ```js
   export default {
       data(){return{}},
       methods: {},
       render(){
           return h('div', {onClick: ()=>alert(123), 'hello world'})
       }
   }
   ```


# 响应系统

## 响应系统作用与实现

1. 副作用函数是指会产生副作用的函数，如下

   ```js
   const data = {name: '张三'}
   function effect(){
       document.body.innerHTML = data.name
   }
   ```

   effect函数执行后，innerHTML被设为data.name， 那么所有其他需要读取innerHTML的地方都受到了影响，因此effect函数就称为副作用函数。当data的name属性值发生改变后，希望effect函数能够再次执行，以保证innerHTML的数据是最新的，如果能够实现这个目标，data数据就被称为响应式数据。

   那么如何实现这个目标呢？可以通过拦截对data的属性的读取和设置操作，在ES2015之前，只能使用`Object.defineProperty`（Vue2就使用了这种方式）, 之后则可以使用代理对象Proxy来实现（Vue3使用这种方式）。

   ::: details 响应式系统工作原理

   ```js
   const bucket = new Set();
   const data = {name: '张三'},
   //代理
   const prosyData = new Proxy(data, {
       //拦截读取操作
       get(target, key){
           //将副作用函数effect添加到bucket中
           bucket.add(effect)
           return target[key]
       },
       set(target, key, val){
   	    target[key] = val;
           //依次执行副作用函数
       	bucket.forEach(fn=>fn());
           //返回true代表设置操作成功
           return true;
   }
   })
   ```

   :::

   可以看出， 一个响应式系统的工作流程为：
   
   - 当读取操作发生时，将副作用函数收集到桶中
   - 当设置操作发生时，从桶中取出副作用函数并执行
   
   上面将副作用函数命名为effect， 但是实际中的副作用函数可能是任意名称的,因此，我们需要一个注册副作用函数的机制。
   
   ::: details 注册副作用函数
   
   ```js
   let activeEffect;
   function effect(fn){
       activeEffect = fn;
       fn();
   }
   ```
   
   此时加入用一个匿名的副作用函数，将使用effect进行注册。
   
   ```js
   effect(()=>{
       document.body.innerHTML = data.name
   })
   //响应式数据将变为
   const prosyData = new Proxy(data, {
       //拦截读取操作
       get(target, key){
           //如果有值，说明注册过副作用函数了
           if(acctiveEffect){
               bucket.add(acctiveEffect);
           }
           return target[key]
       },
       set(target, key, val){
   	    target[key] = val;
           //依次执行副作用函数
       	bucket.forEach(fn=>fn());
           //返回true代表设置操作成功
           return true;
   }
   })
   ```
   
   :::
   
   上面的代码实现了data数据的响应式，但是它有一个问题，就是对data所有属性的访问和设置都会执行一遍相同副作用函数，这并不是我们想要的，我们想要的是对于每个属性的操作，能够有不同的副作用函数。
   
   ::: details
   
   ```js
   const bucket = new WeakMap();
   const obj = new Proxy(data, {
       get(target, key){
           //如果没有副作用函数，直接返回
           if(!activeEffect) return;
           //根据target从桶中取出depsMap
           let depsMap = bucket.get(target);
           if(!depsMap){ //如果没有，则新建
               bucket.set(target, (depsMap = new Map()))
           }
           //再根据key从depsMap中取出副作用函数集合
           let deps = depsMap.get(key);
           if(!deps){
               depsMap.set(key, (deps = new Set()))
           }
           deps.add(activeEffect);
           return target[key]
       },
       set(target, key, value){
           target[key] = value;
           const depsMap = bucket.get(target);
           if(!depsMap) return;
           const deps = deps.get(key);
   		deps&&deps.forEach(fn=>fn());
       }
   })
   ```
   
   :::
   
   ![image-20220503110347493](https://gitlab.com/lixiangteam/blogImg/uploads/3f2177e28553acd9dea3eeecd4682cb8/image-20220503110347493.png)

上面直接将收集副作用函数和重新执行副作用函数放在get和set拦截中，更好的做法是将他们封装到函数中。

::: details 进一步的封装

```js
const bucket = new WeakMap();
const obj = new Proxy(data, {
    get(target, key){
        track(target, key);
        return target[key]
    },
    set(target, key, value){
        target[key] = value;
        trigger(target, key);
    }
})

function track(target, key){
    //如果没有副作用函数，直接返回
        if(!activeEffect) return;
        //根据target从桶中取出depsMap
        let depsMap = bucket.get(target);
        if(!depsMap){ //如果没有，则新建
            bucket.set(target, (depsMap = new Map()))
        }
        //再根据key从depsMap中取出副作用函数集合
        let deps = depsMap.get(key);
        if(!deps){
            depsMap.set(key, (deps = new Set()))
        }
        deps.add(activeEffect);
}
function trigger(target, key){
    const depsMap = bucket.get(target);
    if(!depsMap) return;
    const deps = deps.get(key);
    deps&&deps.forEach(fn=>fn());
}
```

:::

2. 分支切换

   ```js
   const data = {ok: true, text: 'hello'}
   const obj = new Proxy(data, {})
   
   effect(function effectFn(){
       document.body.innerText = obj.ok?obj.text:'not'
   })
   ```

   上面的副作用函数中存在一个三元表达式，当effectFn执行时，由于obj.ok默认为true，所以会同时读取obj.ok和obj.text,此时副作用函数effectFn与响应式数据的联系如下：

   ![image-20220522145603472](https://gitlab.com/lixiangteam/blogImg/uploads/74f75cafae8e7b56df4ff9ede0c1c822/image-20220522145603472.png)

当obj.ok变为false后，此时已经不需要再读取obj.text的值，当时obj.text与副作用函数建立的依赖仍然存在，所以即使obj.text的改变不会影响到document.body.innerText的值，但是仍然会执行副作用函数，这就产生了不必要的性能消耗。为了解决这个问题，可以在每次副作用函数执行时，先将它从所有与之关联的以来集合中删除。当副作用函数执行完毕后，会重新建立联系，新的联系中已经不包含遗留的副作用函数。

要将一个副作用函数从所有的依赖集合中删除，就需要知道它被包含在哪些集合中。为此，在effect函数中为effectFn函数添加了deps属性，用来存储所有包含该副作用函数的依赖集合。

::: details 依赖集合

```js
let activeEffect ;
//副作用函数注册器
function effect(fn){
    const effectFn = ()=>{
        //当副作用函数执行时，将当前执行的副作用函数赋值给activeEffect
        activeEffect = effectFn
        fn()
    }
    //用来存储所有与该副作用函数相关联的集合
    effectFn.deps = []
    //执行副作用函数
    effectFn()
}

//在track的时候收集依赖集合
function track(target, key){
    if(!activeEffect) return;
    let depsMap = bucket.get(target);
    if(!despMap){
        bucket.set(target, (depsMap = new Map()))
    }
    let deps = depsMap.get(key)
    if(!deps){
        depsMap.set(key, (deps = new Set()))
    }
    //将当前激活的副作用函数添加到依赖集合中
    deps.add(activeEffect)
    //deps就是与当前副作用函数存在联系的依赖集合
    activeEffect.deps.push(deps)
}
```

:::

