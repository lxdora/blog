---
title: nginx的使用
date: 2022-04-11 17:55:00
tags: 
 - nginx
categories:
 - 技术文档

---

# 安装

## mac安装

1. 直接在终端执行`brew install nginx`

2. 安装完成后执行`brew info nginx`查看一下nginx的信息

   ::: details 

   ```shell
   nginx: stable 1.21.0 (bottled), HEAD
   HTTP(S) server and reverse proxy, and IMAP/POP3 proxy server
   https://nginx.org/
   /usr/local/Cellar/nginx/1.21.0 (25 files, 2.2MB) *   #nginx的安装位置
     Poured from bottle on 2022-04-11 at 17:57:39
   From: https://github.com/Homebrew/homebrew-core/blob/HEAD/Formula/nginx.rb
   License: BSD-2-Clause
   ==> Dependencies
   Required: openssl@1.1 ✔, pcre ✔
   ==> Options
   --HEAD
   	Install HEAD version
   ==> Caveats
   Docroot is: /usr/local/var/www     # 根目录
   
   The default port has been set in /usr/local/etc/nginx/nginx.conf to 8080 so that   # nginx的配置文件位置以及默认端口号
   nginx can run without sudo.
   
   nginx will load all files in /usr/local/etc/nginx/servers/.
   
   To start nginx now and restart at login:
     brew services start nginx
   Or, if you don't want/need a background service you can just run:
     nginx
   ==> Analytics
   install: 38,401 (30 days), 123,932 (90 days), 486,135 (365 days)
   install-on-request: 38,319 (30 days), 123,724 (90 days), 485,137 (365 days)
   build-error: 24 (30 days)
   ```

   :::

## WSL安装（ubuntu）

1. 先执行`apt list | grep nginx` 看一下
2. 执行`sudo apt install nginx`
3. 完成后执行`nginx -v`查看版本信息
4. 执行`dpkg -S nginx`查看nginx的安装位置

# 使用

> 主要关注的文件夹有两个：
>
> 1. `/etc/nginx/conf.d/` 文件夹，是我们进行子配置的配置项存放处，`/etc/nginx/nginx.conf` 主配置文件会默认把这个文件夹中所有子配置项都引入；
> 2. `/usr/share/nginx/html/` 文件夹，通常静态文件都放在这个文件夹，也可以根据你自己的习惯放其他地方；

1. 执行`sudo service nginx start`启动nginx

2. 启动成功后在浏览器中访问127.0.0.1就可以看到nginx的欢迎页面

3. nginx的常用操作命令

   > nginx -s reload  # 向主进程发送信号，重新加载配置文件，热重启
   > nginx -s reopen	 # 重启 Nginx
   > nginx -s stop    # 快速关闭
   > nginx -s quit    # 等待工作进程处理完成后关闭
   > nginx -T         # 查看当前 Nginx 最终的配置
   > nginx -t -c <配置路径>    # 检查配置是否有问题，如果已经在配置目录，则不需要-c

4. nginx配置语法

   > main        # 全局配置，对全局生效
   > ├── events  # 配置影响 Nginx 服务器或与用户的网络连接
   > ├── http    # 配置代理，缓存，日志定义等绝大多数功能和第三方模块的配置
   > │   ├── upstream # 配置后端服务器具体地址，负载均衡配置不可或缺的部分
   > │   ├── server   # 配置虚拟主机的相关参数，一个 http 块中可以有多个 server 块
   > │   ├── server
   > │   │   ├── location  # server 块可以包含多个 location 块，location 指令用于匹配 uri
   > │   │   ├── location
   > │   │   └── ...
   > │   └── ...
   > └── ...

   一个 Nginx 配置文件的结构就像 `nginx.conf` 显示的那样，配置文件的语法规则：

   1. 配置文件由指令与指令块构成；
   2. 每条指令以 `;` 分号结尾，指令与参数间以空格符号分隔；
   3. 指令块以 `{}` 大括号将多条指令组织在一起；
   4. `include` 语句允许组合多个配置文件以提升可维护性；
   5. 使用 `#` 符号添加注释，提高可读性；
   6. 使用 `$` 符号使用变量；
   7. 部分指令的参数支持正则表达式；

# 典型配置

::: details

```shell
user  nginx;                        # 运行用户，默认即是nginx，可以不进行设置
worker_processes  1;                # Nginx 进程数，一般设置为和 CPU 核数一样
error_log  /var/log/nginx/error.log warn;   # Nginx 的错误日志存放目录
pid        /var/run/nginx.pid;      # Nginx 服务启动时的 pid 存放位置

events {
    use epoll;     # 使用epoll的I/O模型(如果你不知道Nginx该使用哪种轮询方法，会自动选择一个最适合你操作系统的)
    worker_connections 1024;   # 每个进程允许最大并发数
}

http {   # 配置使用最频繁的部分，代理、缓存、日志定义等绝大多数功能和第三方模块的配置都在这里设置
    # 设置日志模式
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;   # Nginx访问日志存放位置

    sendfile            on;   # 开启高效传输模式
    tcp_nopush          on;   # 减少网络报文段的数量
    tcp_nodelay         on;
    keepalive_timeout   65;   # 保持连接的时间，也叫超时时间，单位秒
    types_hash_max_size 2048;

    include             /etc/nginx/mime.types;      # 文件扩展名与类型映射表
    default_type        application/octet-stream;   # 默认文件类型

    include /etc/nginx/conf.d/*.conf;   # 加载子配置项
    
    server {
    	listen       80;       # 配置监听的端口
    	server_name  localhost;    # 配置的域名
    	
    	location / {
    		root   /usr/share/nginx/html;  # 网站根目录
    		index  index.html index.htm;   # 默认首页文件
    		deny 172.168.22.11;   # 禁止访问的ip地址，可以为all
    		allow 172.168.33.44； # 允许访问的ip地址，可以为all
    	}
    	
    	error_page 500 502 503 504 /50x.html;  # 默认50x对应的访问页面
    	error_page 400 404 error.html;   # 同上
    }
}

```

:::

server 块可以包含多个 location 块，location 指令用于匹配 uri，语法：

```nginx
location [ = | ~ | ~* | ^~] uri {
	...
}
复制代码
```

指令后面：

1. `=` 精确匹配路径，用于不含正则表达式的 uri 前，如果匹配成功，不再进行后续的查找；
2. `^~` 用于不含正则表达式的 uri； 前，表示如果该符号后面的字符是最佳匹配，采用该规则，不再进行后续的查找；
3. `~` 表示用该符号后面的正则去匹配路径，区分大小写；
4. `~*` 表示用该符号后面的正则去匹配路径，不区分大小写。跟 `~` 优先级都比较低，如有多个location的正则能匹配的话，则使用正则表达式最长的那个；

如果 uri 包含正则表达式，则必须要有 `~` 或 `~*` 标志。

# nginx内置自定义变量

| 变量名              | 定义                                                         |
| ------------------- | ------------------------------------------------------------ |
| $arg_PARAMETER      | GET请求中变量名PARAMETER参数的值。                           |
| $args               | 这个变量等于GET请求中的参数。例如，foo=123&bar=blahblah;这个变量只可以被修改 |
| $binary_remote_addr | 二进制码形式的客户端地址。                                   |
| $body_bytes_sent    | 传送页面的字节数                                             |
| $content_length     | 请求头中的Content-length字段。                               |
| $content_type       | 请求头中的Content-Type字段。                                 |
| $cookie_COOKIE      | cookie COOKIE的值。                                          |
| $document_root      | 当前请求在root指令中指定的值。                               |
| $document_uri       | 与$uri相同。                                                 |
| $host               | 请求中的主机头(Host)字段，如果请求中的主机头不可用或者空，则为处理请求的server名称(处理请求的server的server_name指令的值)。值为小写，不包含端口。 |
| $hostname           | 机器名使用 gethostname系统调用的值                           |
| $http_HEADER        | HTTP请求头中的内容，HEADER为HTTP请求中的内容转为小写，-变为_(破折号变为下划线)，例如：$http_user_agent(Uaer-Agent的值); |
| $http_user_agent    | 客户端agent信息;                                             |
| $http_cookie        | 客户端cookie信息;                                            |
| $sent_http_HEADER   | HTTP响应头中的内容，HEADER为HTTP响应中的内容转为小写，-变为_(破折号变为下划线)，例如： $sent_http_cache_control, $sent_http_content_type…; |
| $is_args            | 如果$args设置，值为"?"，否则为""。                           |
| $limit_rate         | 这个变量可以限制连接速率。                                   |
| $nginx_version      | 当前运行的nginx版本号。                                      |
| $query_string       | 与$args相同。                                                |
| $remote_addr        | 客户端的IP地址。                                             |
| $remote_port        | 客户端的端口。                                               |
| $remote_user        | 已经经过Auth Basic Module验证的用户名。                      |
| $request_filename   | 当前连接请求的文件路径，由root或alias指令与URI请求生成。     |
| $request_body       | 这个变量（0.7.58+）包含请求的主要信息。在使用proxy_pass或fastcgi_pass指令的location中比较有意义。 |
| $request_body_file  | 客户端请求主体信息的临时文件名。                             |
| $request_completion | 如果请求成功，设为"OK"；如果请求未完成或者不是一系列请求中最后一部分则设为空。 |
| $request_method     | 这个变量是客户端请求的动作，通常为GET或POST。包括0.8.20及之前的版本中，这个变量总为main request中的动作，如果当前请求是一个子请求，并不使用这个当前请求的动作。 |
| $request_uri        | 这个变量等于包含一些客户端请求参数的原始URI，它无法修改，请查看$uri更改或重写URI,包含请求参数的原始URI，不包含主机名，如：”/foo/bar.php?arg=baz”。 |
| $scheme             | 所用的协议，比如http或者是https，比如`rewrite ^(.+)$ $scheme://example.com$1 redirect`; |
| $server_addr        | 服务器地址，在完成一次系统调用后可以确定这个值，如果要绕开系统调用，则必须在listen中指定地址并且使用bind参数。 |
| $server_name        | 服务器名称。                                                 |
| $server_port        | 请求到达服务器的端口号。                                     |
| $server_protocol    | 请求使用的协议，通常是HTTP/1.0或HTTP/1.1。                   |
| $uri                | 请求中的当前URI(不带请求参数，参数位于args)，不同于浏览器传递的args)，不同于浏览器传递的args)，不同于浏览器传递的request_uri的值，它可以通过内部重定向，或者使用index指令进行修改。uri不包含主机名，如”/foo/bar.html”。 |