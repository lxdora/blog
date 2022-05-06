---
title: uniapp开发问题记录
tags:
  - 前端
categories:
  - 技术文档
date: 2022-02-15 15:25:43
---

记录一下使用uni-app开发小程序过程中遇到的问题

<!--more-->

- 文本必须放在<text></text>标签内，且此标签不能换行，否则文本周围会出现无法消除的边框

- 添加或更换静态资源后需要重新编译，否则找不到新的静态资源

- position:absolute的元素必须设置宽度，否则定位后元素会消失

- 使用scroll-view组件时，如果要使用scroll-into-view属性使其滚动到指定元素，则绑定的id要在onReady中赋值

- moveable-view中嵌套list时，安卓平台，内部list滚动会导致外面moveable-view跟着滚动，遍寻良方而不得，最后使用如下方式： 当滚动内部list时，将moveable-view的disabled设置为true，当点击list外面时，再将disabled设置为false，这样就有一个体验问题，安卓平台滚动完list需要先点击一下外面，然后才能拖动。

- [uni-app如何使用自定义字体](https://ask.dcloud.net.cn/article/id-36400__page-4)

  > nvue和subnvue引入自定义自体/自定义图标，不能用CSS方法，而只能用week所规定的方法。具体做法是，在nvue或subnvue页面内，引入如下js代码（uni-app编译模式下，可放置于onLoad函数内；week编译模式下，可放置于beforeCreate函数内。貌似也可以直接放置于“export default {...}”之前）。
  >
  > ```javascript
  > 复制代码const domModule = weex.requireModule('dom')  
  > domModule.addRule('fontFace', {  
  >     'fontFamily': "iconfont2",  
  >     'src': "url('http://at.alicdn.com/t/font_1469606063_76593.ttf')"  
  > });
  > ```
  >
  > 其中：
  >
  > - @fontFace 协议名称，不可修改。
  > - @fontFamily font-family的名称。
  > - @src 字体地址，url('') 是保留字段，其参数如下:
  >   1. http. 从HTTP请求加载, e.g. url('http://at.alicdn.com/t/font_1469606063_76593.ttf')
  >   2. https. 从HTTPS请求加载, e.g. url('https://at.alicdn.com/t/font_1469606063_76593.ttf')
  >   3. local, Android ONLY. 从assets目录读取, e.g. url('local://foo.ttf'), foo.ttf 是文件名在你的assets目录中.
  >   4. file. 从本地文件读取, e.g. url('file://storage/emulated/0/Android/data/com.alibaba.weex/cache/http:__at.alicdn.com_t_font_1469606063_76593.ttf')
  >   5. data. 从base64读取, e.g. url('data:font/truetype;charset=utf-8;base64,AAEAAAALAIAAAwAwR1NVQrD ....'), 上述data字段不全。
  >
  > **问题**
  >
  > 问题的难点在于：src的正确写法。http和https写法要求联网加载，如果断网就无法显示，其用户体验肯定不好。local写法只有Android能够采用，iOS无法采用，兼容性差。那么，就只剩下file写法和data写法可用了。
  >
  > 但问题在于，file的正确写法是怎样的？我试了N种办法，都失败了。最后只能采用data写法：先百度“ttf转base64”，把ttf文件上传到网上的“ttf转base64”网页，将生成的data字段复制到上述data字段即可。但问题来了：（1）不放心那些未知网站，担心转码形成的base64有个别字节错误；（2）大段的base64数据影响代码的美观，且会干扰HX的变量提示功能；（3）修改ttf文件（如增删改图标）需要重新转码生成新的base64……总之，很不方便。
  >
  > **理想的写法，还是file写法，url('file://storage/...');**
  >
  > **具体办法**
  >
  > （1）将自己的ttf文件（如iconfont.ttf），放置于static目录下
  > （2）在nvue或subnve的js中加入如下代码：
  >
  > ```javascript
  > 复制代码const domModule = weex.requireModule('dom')  
  > domModule.addRule('fontFace', {  
  >     'fontFamily': "iconfont2",  
  >     'src': 'url("'+"file:/" + plus.io.convertLocalFileSystemURL("_www/static/iconfont.ttf")+'")'  
  > });
  > ```
  >
  > （3）在需要引入iconfont.ttf中的自定义字体/图标的页面元素的css中添加font-family: iconfont2。这一步千万别忘了。
  > （4）引用字体。在html中，采用"**&#n位十进制unicode码**"格式引用自定义字符/字体图标，例如“**&#57349**”；在js中，采用“**\u四位十六进制unicode码**”格式，例如“**\uE005**”；而在css中，则采用“**\四位十六进制unicode**”格式，例如“**\E005**”。
  >
  > **注意**
  >
  > 1. plus.io.convertLocalFileSystemURL()函数可以把本地相对路径转换为本地绝对路径。
  > 2. 代码中的“file:/”只有一条斜杠，而是不两条。因为，plus.io.convertLocalFileSystemURL()函数获得的本地绝对路径，已经自带了一条斜杠。
  > 3. fontFamily的值，即iconfont2可以任意取。但iconfont.ttf文件内部的字体的名称必须足够特殊、不与系统注册的其他字体的名称冲突。
  > 4. “font-family: iconfont2;”必须直接放置于具体引用自定义字体的标签的css中，而不能放置于标签的父/祖标签的css中，否则自定义定体将不生效。

- uni-app如何退出

  调用`plus.runtime.quit()`

- uni-app上传图片， 视频，文件等

  ::: details uni-app上传

  ```js
  async afterReadImg(event){
  				const fileList = event.file.map(item=>item.url)
  				const res = await this.uploadFileList(fileList, 'image');
  				this.imageList = res.map(item=>{return {url: item.data.file_url}})
  			},
  			deleteImg(event){
  				this.imageList.splice(event.index, 1);
  			},
  			async afterReadVideo(event){
  				const res = await this.uploadFile(event.file.url, 'video');
  				this.videoList = [{url: res.data.file_url}];
  				this.content_video = res.data;
  			},
  			deleteVideo(event){
  				this.videoList = [];
  				this.content_video = {};
  			},
  			async uploadFile (filePath, type) {
  				uni.showLoading({
  					title: '上传中'
  				})
  				const globalData = getApp().globalData;
  				let access_token = globalData.userInfo.userTokenKey || '';
  				let headerInfo = globalData.headerInfo;
  				headerInfo['X-API-ACCESS-TOKEN'] = access_token;
  				let host = globalData.host;
  				let url = `${host}/api/apiroute.php?route=card/upload_attach&uploadfield=${type}&format=json&m=attach&fromm=card`
  				const res = await uni.uploadFile({
  					url,
  					filePath: filePath,
  					header: headerInfo,
  					name: 'file',
  				})
  				uni.hideLoading();
  				console.log({res})
  				return JSON.parse(res[1].data);
  			},
  			async uploadFileList (fileList, type) {
  				uni.showLoading({
  					title: '上传中'
  				})
  				const globalData = getApp().globalData;
  				let access_token = globalData.userInfo.userTokenKey || '';
  				let headerInfo = globalData.headerInfo;
  				headerInfo['X-API-ACCESS-TOKEN'] = access_token;
  				let host = globalData.host;
  				let url = `${host}/api/apiroute.php?route=card/upload_attach&uploadfield=${type}&format=json&m=attach&fromm=card`
  				const resList = []
  				for(const item of fileList){
  					const res = await uni.uploadFile({
  						url,
  						filePath: item,
  						header: headerInfo,
  						name: 'file',
  					})
  					resList.push(JSON.parse(res[1].data));
  				}
  				uni.hideLoading();
  				return resList;
  			},
  ```

  

  :::

