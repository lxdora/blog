---
title: uniapp开发问题记录
tags:
  - 前端
categories:
  - 技术文档
date: 2022-4-12 09:01:51

---

# webpack的作用

webpack可以帮助我们处理模块间的依赖关系，而且不仅仅是Javascript文件，css，图片，json文件等等在webpack中都可以当作模块来使用
gulp也可以用来打包，与webpack的区别？

- gulp的核心是Task
   - 我们可以配置一系列的task，并且定义task要处理的事务(如ES6、ts转化，图片压缩，scss转成css)
   - 之后让gulp来依次执行这些task，而且让整个流程自动化
   - 所以gulp被称为前端自动化工具
- 什么时候用gulp呢？
    -  如果工程模块依赖非常简单，甚至没有模块化的概念
    - 只需要进行简单的合并、压缩、就使用gulp即可
    - 如果整个项目使用了模块化管理，而且相互依赖非常强，就可以使用更加强大的webpack了
- webpack与gulp的区别？
   - gulp更加强调的是前端流程自动化，模块化不是他的核心
  - webpack更加强调模块化开发管理，而文件压缩合并、预处理等功能是它附带的功能
# webpack安装
- 安装webpack需要安装Node.js, Node.js自带了软件包管理工具npm
- npm install webpack -g
全局安装与局部安装。
- 局部安装webpack。 --save-dev是开发时依赖，项目打包后不需要继续使用。局部安装的在package.json中定义。
- 直接在终端执行webpack命令，使用的是全局安装的webpack
```js
info.js
export const name='aaaa';
export const age = 18;
export const height = 1.78;
--------------------------------------------
func.js
export function sum(num1, num2){
  return num1+num2;
}
----------------------------------------------
main.js
import {name, age, height, sum} from './info'
console.log(name)
console.log(age)
console.log(height)
------------------------------------------------
main.js是入口文件，webpack可以自动处理模块间的依赖
webpack  src/main.js   dist/bundle.js
在index.html中导入bundle.js即可
```
## 希望webpack命令简单一点（只输出一个webpack，它就知道去打包哪个文件,也知道在哪里输出），如何处理？
修改webpack.config.js
```js
const path= require('path')    //node语法
module.exports = {
  enrty: '/src/main.js',
  output: {
    path: path.resolve(_dirname, 'dist'),    //动态获取绝对路径
    filename: 'bundle.js'
}
}
```
npm init 会创建package.json文件
package.json中的scripts的脚本在执行时，会按照一定的顺序寻找命令对应的位置。
- 首先，会寻找本地的node_modules/.bin路径中对应的命令
- 如果没有找到，会到全局变量中寻找
# loader
loader是什么？
- webpack可以用来处理js代码，并自动化处理js之间相关的依赖
- 开发中不仅仅有js代码，也有css，图片，将es6转成es5，将ts转成js，将scss，less转成css，将jsx，.vue转成js文件等。对于webpack本身来说，这些转化是不支持的。那怎么办呢？给webpack扩展对应的loader就可以了。
### loader的使用过程
1. 使用npm安装需要使用的loader
2. 在webpack.config.js中的module关键字下进行配置
#### 使用css-loader
1. 安装 `npm install css-loader --save-dev`
2. 修改webpack.config.json
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,    //匹配所有的css文件
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  }
}
```
3. css-loader只负责将css文件进行加载，还需要style-loader将样式添加到DOM中。use中的顺序不能错，webpack读取loader时是从右向左的顺序读取的。
[为什么webpack加载loader是从右往左的](https://blog.csdn.net/qq_37109325/article/details/80169289)
## less文件处理
使用less-loader
```js
module.exports = {
    ...
    module: {
        rules: [{
            test: /\.less$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "less-loader" // compiles Less to CSS
            }]
        }]
    }
};
```
###图片处理
使用url-loader
```
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
//当加载的图片大小小于limit时，会将图片编译成base64的形式,
//当加载的图片大小大于limit时，需要使用file-loader模块进行加载
              name: '/img/[name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  }
}
```
file-loader会把大于limit的图片压缩并使用hash改名后放到dist目录下，使用的时候需要配置一下webpack.config.js
```js
module.exports = {
  publicPath: 'dist'
}
```
默认情况下，webpack会将图片名称修改为一个32位的hash值，看起来不太方便，但是我们开发中可能对图片名称有要求，而且所有图片都放在dist目录下比较乱。
可以在options中添加以下选项： 

- img: 图片要打包到的文件夹
- name: 获取图片原来的名字放到该位置
- hash:8 ： 防止图片名称冲突，依然使用hash，但是只保留8位
- ext： 使用图片原来的扩展名
 ## 将ES6转成ES5 babel-loader
`npm install --save-dev bable-loader babel-core bable-preset-es 2015`
```js
{
  test: /\.m?js$/,
  exclude: /{node_modules|bower_components}/,
  use: {
        loader: 'babel-loader',
        options: {
                presets: ['es2015']
}
}
}
```
# webpack配置Vue
1. Vue在运行时环境也要使用，所以不能只安装在开发环境中
`npm install vue --save`
--save  运行时依赖
--save-dev  开发时依赖
2. webpack打包vue后的版本可能有两种
- runtime-only-->代码中不可以有任何的template
- runtime-compiler --> 代码中可以有template，因为有compiler可以用于编译template
```js
module.exports = {
  resolve: {
        alias: {
                  'vue$': 'vue/dist/vue.esm.js'
}
}
}
# import Vue from 'vue'
导入Vue时，会到node_modules下面的vue/dist/vue.esm.js里面找，使用这个编译出来是runtime-complier的
```
 template会覆盖el
```js
new Vue({
  el: '#app',
 template: `
    <div id="app">hello world<div>
`
})
```
如何使webpack能够识别vue文件？
`npm install vue-loader  vue-template-compiler  --save--dev`
```js
{
  test: /\.vue$/,
  use: {loader: ['vue-loader']}
}
```
# plugin
## plugin是什么？
- 插件，通常是用于对某个现有的架构进行扩展
- webpack中的插件，就是对webpack现有功能的扩展，如打包优化，文件压缩等
## loader和plugin的区别
- loader主要用于转换某些类型，他是一个转换器
- plugin是对webpack的扩展，它是一个扩展器
## plugin的使用过程
1. 通过npm安装需要使用的plugins
2. 在webpack.config.js中的plugins中配置插件
## 添加版权声明的plugin
- BannerPlugin，webpack自带插件
```js 
const webpack = require('webpack')
module.exports = {
  plugins: [
      new webpack.BannerPlugin('最终解释权归本人')
]
}
```
## 打包html的plugin
- src目录下有一个index.html文件，这是整个项目页面的入口，但是dist目录下没有这个文件，那么打包的js文件就失去了意义
- 所以需要将src下的index.html文件打包到dist文件夹中，可以使用`HtmlWebpackPlugin`
- HtmlWebpackPlugin可以做以下事：
  ·1. 自动生成一个index.html文件（可以指定模板来生成）
   2. 将打包的js文件，自动通过script标签插入到body中
- 安装HtmlWebpackPlugin插件 `npm install html-webpack-plugin  --save-dev`
- 修改webpack.config.js
```js
const htmlwebpackPlugin = require('html-webpack-plugin')
plugins: [
    new htmlwebpackPlugin({
          template: 'index.html'
})
]
```
## js压缩的plugin
- 项目发布前需要对js等文件进行压缩处理
- 使用`npm install uglifyjs-webpack-plugin  --save-dev`
```js
const uglifyJsPlugin = require('uglifyjs-webpack-plugin')
plugins:[
  new uglifyJsPlugin()
]
```
js丑化后版本声明也会删掉
# 搭建本地服务器
- webpack提供了一个可选的本地开发服务器，基于node.js搭建，内部使用express框架，可以实现让浏览器自动刷新显示我们修改后的结果。
- 安装`npm install webpack-dev-server --save-dev`
- devserver也是作为webpack中的一个选项，选项本身可以设置如下属性：
~ contentBase: 为哪一个文件夹提供服务，默认是跟文件夹，我们写./dist
~port：端口号
~inline：页面实时刷新
~historyApiFallback：在SPA页面中，依赖HTML5的history模式
- 配置
```js
devServer: {
  contentBase: './dist',
  inline: true
}
```
- 启动时增加一个参数(package.json中)
`"dev": "webpack-dev-server --open"`
# webpack配置分离
webpack配置时，有的配置是开发是需要的，如dev-server,有的配置是编译时需要的，如uglyfyjs-plugin，这时候就需要将webpack进行分离
- base.config.js   开发和编译的公共配置
- dev.config.js    开发时配置
- prod.config.js   编译时配置
`npm install webpack-merge --save-dev`
```js
//dev.config.js
const webpackMerge = require('webpack-merge')
const baseConfig = require('./base.config')
module.exports = webpackMerge(baseConfig, {
  devServer: {
        contentBase: './dist',
        inline: true
}
})
```
在package.json中指定用哪个配置文件
```js
scripts: {
  "build" : "webpack --config dev.config.js"
}
```