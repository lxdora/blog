---
title: nodeJs
tags:
  - 前端
categories:
  - 技术文档
date: 2021-05-24 20:05:54
---

Nodejs可以使用javascript写后端代码，有必要详细学习一下

<!--more-->

![image-20210524200834352](https://gitlab.com/lixiangteam/blogImg/uploads/65efeb310ee0b1485422c02bc72fcc5e/image-20210524200834352.png)

# 模块的使用

## http模块

```javascript
var http = require('http');
http.createServer(function (request, response) {
  response.writeHead(200,{'Content-Type':'text/html;charset=UTF-8'});
  response.write('你好，Hello World');
  response.end();
}).listen(8082);

console.log('Server running at http://127.0.0.1:8082/');
```

## url模块的使用

```javascript
var url = require('url');
path = 'https://www.baidu.com?name="张三"&age=20';
const query = url.parse(path, true).query;
console.log(`姓名:${query.name}----年龄:${query.age}`);
```

## supervisor使node自启动

前面改完代码总要手动重新启动node，比较麻烦，supervisor能够监听文件改变，自动重启node

1. 安装`npm install -g supervisor`
2. 使用supervisor代替node命令启动应用`supervisor app.js`

## CommonsJs，Nodejs， 自定义模块

## 什么是CommonJs

> CommonJs规范的提出,主要是为了弥补当前JavaScript没有标准库的缺陷，他的终极目标是：提供一个类似Python，Ruby和Java语言的标准库。
>
> CommonJs就是模块化的标准，nodejs就是CommonJs(模块化)的实现

# Node中的两种模块

## 核心模块(系统模块)

## 文件模块(自定义模块)

![image-20210526192243197](https://gitlab.com/lixiangteam/blogImg/uploads/4cc9c99de4b8088675e76655c3a67e1e/image-20210526192243197.png)

### 导出模块的两种方式

1. ```js
   //utils.js  所有方法在一个对象中
   const utils = {
     get: function(){
       console.log('获取数据');
     },
     post: function(){
       console.log("提交数据")
     }
   }
   
   module.exports = utils
   
   //common.js  使用模块
   const utils = require("utils")
   utils.get()
   ```

2. ```js
   //utils.js
   exports.get = function(){
       console.log('获取数据');
     }
   exports.post = function(){
     console.log("提交数据")
   }
   
   //common.js
   const utils = require("utils")
   utils.get()
   ```

几个小知识：

1. 当模块在node_modules文件夹中时，导入时路径中不需要写node_modules
2. 默认情况下，会导入模块文件夹中的index.js文件
3. 如果文件夹中有package.json文件，则首先导入package.json中的main对应的模块文件(入口文件)
4. `npm init --yes`在模块文件夹中生成默认package.json

# nodejs包

![image-20210526195836588](https://gitlab.com/lixiangteam/blogImg/uploads/fd3ed00c2800faf4d2dc68695fe4bbcb/image-20210526195836588.png)

silly-datetime 日期格式化模块

- `npm list`查看已安装的包
- `npm info md5` 查看md5包信息
- `npm install silly-datetime@2.1.0 --save` 指定版本安装,最好加上--save

![image-20210526201322434](https://gitlab.com/lixiangteam/blogImg/uploads/68a22a37ef5a4885727dd306bf2d776a/image-20210526201322434.png)

如果要指定版本安装，一个是安装的时候指定版本，也可以将前面的符号去掉

# fs模块的使用

1. fs.stat  检测是文件还是目录

   ```js
   fs.stat("./lib", (err, data)=>{
     if(err) throw err
     console.log(data.isFile())   //false
     console.log(data.isDirectory())  // true
   })
   ```

2. fs.mkdir 创建目录

   ```js
   //创建时可以指定权限
   fs.mkdir("./a", {Mode:755}, (err, data)=>{
     if(err) throw err
     console.log(data)
   })
   ```

3. fs.writeFIle 创建写入文件

4. fs.appendFile 追加文件

5. fs.readFile 读取文件

6. fs.readdir 读取目录

7. fs.rename 重命名

8. fs.rmdir  删除目录

9. fs.unlink  删除文件

第三方模块 mkdirp

<font color="red">fs中的方法都是异步的</font>

::: details
```js
const { rejects } = require('assert');
const fs = require('fs');
const { resolve } = require('path');
//需求，找出当前目录下所有文件，并将目录放入一个数组中

const dirArr = []

fs.readdir('./', (err, files)=>{
  if(err){
    console.log(err);
  }
  for(let i=0;i<files.length; i++){
    fs.stat(files[i],(err, stat)=>{
      if(err){
        console.log(err);
      }
      if(stat.isDirectory()){
        dirArr.push(files[i])
      }
    })
  }
  console.log("dirArr:", dirArr)  // []
})

// fs中的方法都是异步的
//解决方法1， 递归
const dirArr1 = []
fs.readdir('./', (err, files)=>{
  if(err){
    console.log(err);
  }
  (function getDir(i){
    if(i==files.length){
      console.log("dirArr1:", dirArr1)
      return
    }
    fs.stat(files[i],(err, stat)=>{
      if(err){
        console.log(err);
      }
      if(stat.isDirectory()){
        dirArr1.push(files[i])
      }
      getDir(i+1)
    })
  })(0)
})

const dirArr2 = []
async function isDir(path){
  return new Promise((resolve, reject)=>{
    fs.stat(path, (err, stat)=>{
      if(err){
        reject(err)
      }
      if(stat.isDirectory()){
        resolve(true)
      }else{
        resolve(false)
      }
    })
  })
}

async function listFiles(path){
  return new Promise((resolve, reject)=>{
    fs.readdir(path, (err, files)=>{
      if(err){
        reject(err)
      }
      resolve(files)
    })
  })
}

async function getDirArray(){
  const files = await listFiles('./')
  for(const file of files){
    const flag = await isDir(file)
    if(flag){
      dirArr2.push(file)
    }
  }
  console.log("dirArr2:", dirArr2)
}

getDirArray()
```
:::
async声明一个异步函数，await等待异步函数执行完成。await必须用在async方法中。async函数应返回一个promise

fs普通读取时会将所有内容读到内存中，这样的话如果文件内容很大会造成内存占用过大，所以读大文件的时候应该以流的方式读取

```js
const fs = require('fs')
const readStream = fs.createReadStream('./findDir.js')
let count = 0
let str = ""
readStream.on("data", (data)=>{
  count +=1 
  str += data
})

readStream.on("end", ()=>{
  console.log(count);
})

readStream.on("error", (err)=>{
  console.log(err);
})
```

管道流，从一个文件中读取数据，写入到另一个文件中

```js
const fs = require('fs')
const readStream = fs.createReadStream('./aaa.jpg')
const writeStream = fs.createWriteStream('./a/aaa.jpg')
readStream.pipe(writeStream)
```

# 创建一个静态web服务器
::: details
```js
var http = require('http');
const fs = require('fs')
const path = require('path')
const common = require('./common')
http.createServer(function (request, response) {
  let pathName = request.url;
  console.log(pathName);
  pathName = pathName=="/"? '/index.html': pathName
  const mime = common.getMime(path.extname(pathName))
  response.writeHead(200, {'Content-Type': `${mime}; charset="utf-8"`});
  console.log(pathName);
  if(pathName != './favicon.ico'){
    fs.readFile('./static' + pathName, (err, data)=>{
      if(err){
        response.writeHead(404, {'Content-Type': `${mime}; charset="utf-8"`})
        console.log(err)
        response.write('您访问的页面不存在')
        response.end()
        return
      }
      response.writeHead(200)
      response.write(data)
      response.end();
    } )
  }
}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');

// common.js
exports.getMime = function(extname){
  let mime = ''
  switch(extname){
    case 'html':
       mime = "text/html"
      break
    case 'css':
      mime = 'text/css'
      break
    case 'js':
      mime = 'text/javascript'
      break
    default:
      mime = 'text/html'    
  }
  return mime
}
```
:::

# MongoDB

1. `mongo` 连接数据库

2. `show dbs` 查看有哪些数据库

3. `use lxdora` 创建lxdora数据库, 创建完没有反应，不能直接看到， 有数据后才能看到

4. `db.user.insert({'username':'张三'})`插入一条数据

5. db.user.insertMany([{"name":"李四", "age": 20}, {"name": "王五", "age": 30}])

6. `db` 显示正在用的数据库

7. `show collections` 查看有哪些集合

8. `db.user.drop()` 删除user集合

9. `db.user.find()` 查看集合中的数据

10. `db.user.find({"name":"张三"})`查找name为张三的数据

11. `db.user.find({age: {$gt:20}})` 查找age大于20的数据

12. `db.user.find({age: {$lt:20}})` 查找age小于20的数据

13. `db.user,find({age:{$gte:20, $lte:30}})` 查找20<=age<=30的数据

14. `db.user.find({name:/张/})` 查找name中包含张的数据(性能不好，数据量较大时用第三方库)

15. `db.user.find({name:/四$/})` 查找name中以四结尾的数据

16. `db.user.find({},{name:1})` 只显示name列

17. `db.user.find({},{name:1, age:1})` 只显示name, age列

18. `db.user.find({age:{$gt:20}},{name:1})` 只显示age大于20的name列

19. `db.user.find().sort({age:1})` 按照年龄升序显示， -1表示降序

20. `db.user.find().limit(5)` 查询前5条数据

21. `db.user.find().skip(10)`查询10条以后的数据

22. `db.dropDatabase()` 删除数据库（先use）

23. ```js
    //一次性向表里面增加多条数据
    for(var i=0;i<100;i++){
    ... db.admin.insert({name:"张三"+i, age:i})
    ... }
    ```

24. `db.user.find().count()` 显示表里面一共有多少条数据

25. `db.user.find().skip((curPage-1)*10).limit(pageSize)`

26. `db.user.find({$or:[{age:20}, {age:30}]})` 查询age为20或30的数据

27. `db.user.update({name:"张三"}, {$set: {age:20}})` 将姓名为张三的年龄改为20, 前面是查询条件，后面是更新内容，如果没有$set， 会将整条数据替换为后面的

28. `db.user.update({age:{$lt:20}}, {$set: {age:20}}, {multi: true})`  将所有age小于20的数据的age都改为20， 不加multi只会改第一条

29. `db.user.remove({name: "张三"})` 删除name为张三的数据

30. `db.admin.remove({age:{$gt:50}}, {justOne: true})` justOne表示满足条件的数据只删除一条

31. `db.admin.find().explain("executionStats")` 查看一条语句的执行信息(主要看执行时间)

## 索引

1. 插入40万条数据

```js
for(var i=0; i<400000; i++){
  db.admin.insert({name:"张三"+i, age:i})
}
```

2. 查找一条数据， 查看查询时间

   ```js
   db.admin.find({name:"张三123456"}).explain("executionStats")
   // "executionTimeMillisEstimate" : 291, 执行时间为291毫秒
   ```

3. `db.admin.createIndex({name:1})`  创建索引， 1表示索引升序存储， -1表示索引降序存储

4. `db.admin.getIndexes()` 获取当前集合的索引

5. 设置完索引后再看查询时间

   ```js
   db.admin.find({name:"张三123456"}).explain("executionStats")
   // "executionTimeMillisEstimate" : 0, 我的天，变成0毫秒
   //换一条数据看看呢
   db.admin.find({name:"张三223456"}).explain("executionStats")
   //"executionTimeMillisEstimate" : 0, 也是0， 大大提高了查询时间
   ```

6. `db.admin.dropIndex({name:1})` 删除索引

### 复合索引

1. `db.admin.createIndex({name:1, age:1})`创建复合索引
2. 复合索引的查询规则是， 如果建立了name和age的索引，当查询条件中有name时，会使用该索引，当查询条件中有name和age时也会使用该索引，而当查询条件中只有age时，不会使用该索引。

### 账户权限设置

1. 创建超级管理员账户

   ```shell
   use admin
   db.createUser(
     {
       user: "admin",
       pwd: "245530",
       roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ]
     }
   )
   ```

2. 修改配置文件`/usr/local/etc/mongod.conf`

   ```shell
   systemLog:
      destination: file
      path: "/Users/hoge/mongo/log/mongo.log"
      logAppend: true
   storage:
      dbPath: "/Users/hoge/mongo/data/db"
      journal:
         enabled: true
   processManagement:
      fork: true
   net:
      bindIp: 127.0.0.1
      port: 27017
   setParameter:
      enableLocalhostAuthBypass: false
   security:
      authorization: "enabled"
   ```

3. 关闭mongodb服务

   ```shell
   use admin
   db.shutdownServer()
   ```

4. 重新启动mongodb服务

   `mongod -f /usr/local/etc/mongod.conf`

5. 再次进入mongo

   ```shell
   mongo -u admin -p 
   ```

   拥有所有权限的用户不能用db.auth()鉴权

   普通用户进入mongo后使用db.auth("username", "password")鉴权

### 表关系

- 一对一

- 一对多

- 多对多

### 聚合管道

使用聚合管道可以对集合中的文档进行变换和组合， 主要用于表的关联查询以及数据统计

| 管道操作符 |                                            |
| ---------- | ------------------------------------------ |
| $project   | 增加、删除、重命名字段                     |
| $match     | 条件匹配，只满足条件的文档才能进入下一阶段 |
| $limit     | 限制结果的数量                             |
| $skip      | 跳过文档的数量                             |
| $sort      | 条件排序                                   |
| $group     | 条件组合结果  统计                         |
| $lookip    | 用以引入其他集合的数据                     |

查找数据时，只显示指定字段的命令

`db.admin.find({}, {'age':1})`  只显示age字段

` db.admin.aggregate([{$project:{age:1}}])`

```shell
# 查找年龄小于10的且只显示age字段
db.admin.aggregate([
	{$project:{age:1}},
	{$match: {age:{$lte:10}}},
	{$sort: {age:1}},
	{$limit: 10}
	])
```

```shell
 # 按照name分组， 并且将同一组的age相加
 db.user.aggregate(
	 [
	  {$group: {_id: "$name", total: {$sum: "$age"}}}
	 ])
```

### 备份与还原

```shell
# 不需要登进mongo， 直接在命令行运行, 导出
mongodump -h dbhost -d dbname -u username -p password -o directory
mongodump -h 127.0.0.1 -d user -u admin --password 245530  -o ~ --authenticationDatabase admin
# 导入数据库
mongorestore -h dbhost -d dbname dbdirectory

```

# Nodejs操作mongodb数据库

1. 安装  `yarn add mongodb`

2. 
::: details
```js
   const {MongoClient} = require('mongodb')
   const user = encodeURIComponent('admin');
   const password = encodeURIComponent('245530');
   const authMechanism = 'DEFAULT';
   //数据库地址
   const url = `mongodb://${user}:${password}@127.0.0.1:27017/?authMechanism=${authMechanism}`
   // 操作的数据库
   const dbName = 'user'
   // 实例化客户端
   const client = new MongoClient(url, { useUnifiedTopology: true })
   //另一种获取客户端的方法
   MongoClient(url, { useUnifiedTopology: true }, (client, err)=>{
     
   })
   //连接数据库
   client.connect((err)=>{
     if(err){
       console.log(err);
     }
     console.log('数据库连接成功');
     let db = client.db(dbName)
     //查找数据
     db.collection('user').find({}).toArray((err, data)=>{
       console.log(data);
     })
     //增加数据
     db.collection('user').insertOne({
       name: 'lx',
       age: 18
     }, (err, result)=>{
       if(err){
         console.log(err)
         return 
       }
       console.log('增加成功');
     })
     //修改数据
     db.collection('user').updateOne({name: '张三'}, {$set:{age: 10}}, (err, result)=>{
       if(err){
         console.log('修改失败',err);
       }
       console.log('修改成功');
     })
     //删除数据
     db.collection('user').deleteOne({name: '张三'}, (err, data)=>{
       if(err){
         console.log('删除失败', err);
       }
       console.log('删除成功', data);
       client.close()
     })
   })
   
   ```
:::

3. `const querystring = require('querystring')`  querystring模块用于解析url中的参数

# Express

1. 安装`yarn add express`

2. 使用

   ```js
   const express = require('express')
   const app = express()
   
   app.get('/user', (req, res)=>{
     const query = req.query
     console.log(query);
     res.send('用户列表')
   })
   
   app.get('/user/:id', (req, res)=>{
     res.send('用户详情')
   })
   
   app.post('/user', (req, res)=>{
     res.send('新增用户')
   })
   
   app.put('/user/:id', (req, res)=>{
     res.send('修改用户')
   })
   
   app.delete('/user/:id', (req, res)=>{
     res.send('删除用户')
   })
   app.listen(3000)
   ```

# 中间件

## 内置中间件

```js
app.use(express.static("static"))  // 指定静态资源目录
```

## 应用级中间件

```js
// 通常用于检测权限
app.use((req, res, next)=>{
  //处理
  next()
})
```

## 路由级中间件(基本不用)

```js
// 通常匹配到路由后不会再向下匹配， 如果使用next()， 会接着向下匹配
app.get('/user/add', (req, res, next)=>{
  const query = req.query
  console.log(query);
  console.log('用户增加')
  next()
})

app.get('/user/:id', (req, res)=>{
  res.send('用户详情')
})
```

## 第三方中间件

1. body-parse中间件，获取post参数

   1. `yarn add body-parser`

   2. `const bodyParser = require('body-parser')`

   3. ```js
      app.use(bodyParser.urlencoded({extended: false}))
      app.use(bodyParser.json())
      ```

   4. ```js
      // 上面配置后， 直接使用req.body就可以获取body体
      app.post('/login', (req, res)=>{
        console.log(req.body);
      })
      ```

2. cookie-parser

3. express-session   session是基于cookie工作的

   1. 分布式架构配置session
   2. connect-mongo   将session信息存在数据库中   要配置touchAfter参数

# Express路由模块化





# Mongoose

1. `yarn add mongoose`

2. 
::: details
```js
   const mongoose = require('mongoose')
   mongoose.connect('mongodb://admin:245530@localhost:27017/user', {userNewUrlParser: true}, (err)=>{
     if(err){
       console.log('连接数据库失败')
     }
   })
   // 定义schema, 字段与数据库一一对应
   const UserSchema = mongoose.schema({
     name: String,
     age: {type: Number, default: 18},  //可以指定默认参数
     email: String
   })
   /** 创建数据模型, 
   	第一个参数， 首字母大写， 要和数据库表(集合名称)对应起来 如：集合为users， 则参数为User
   	第二个参数是对应的schema
   	第三个参数， 可以指定要关联哪一个集合
   */
   const User = mongoose.model('User', UserSchema, ’users‘)
   
   //查询数据
   User.find({}, (err, data)=>{
     
   })
   //增加数据， 先实例化model
   const user = new User({
     name: '张三',
     age: 18,
     email: '123@qq.com'
   })
   user.save((err)=>{
     
   })
   // 更新数据， 直接用model
   User.updateOne({id: '1'}, {name: '张三'})
   // 删除数据
   User.deleteOne({id: '123'})
   ```
:::

3. 模块化

   ```js
   1. 建立model文件夹
   2.新增db.js文件， 用于连接数据库
   3.操作哪个collection， 就建一个对应文件
   ```

4. mongoose 预定义模式修饰符

   1. lowercase、uppercase、trim

   2. ```js
      const UserSchema = mongoose.model({
        name: {
          type: String,
          trim: true
        },
        age: {
          type: Number,
          set(params){   // 自定义修饰符 ， 写数据的时候对数据进行格式化
            return params+1	
          }
        }
      })
      ```

5. mongoose设置索引

