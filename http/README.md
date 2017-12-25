要使用 HTTP 服务器与客户端，需要 require('http')。

## 搭建一个 Web Server

`http.createServer([requestListener])` 返回一个新建的 http.Server 实例。requestListener 是一个函数，会被自动添加到 'request' 事件。 [http.Server 类](http://nodejs.cn/api/http.html#http_class_http_server)

```js
var http = require('http');

http.createServer(function(req, res) {
    res.writeHead(200, {
        'content-type': 'text/plain'
    });
    res.write('hello world');
    res.end();
}).listen(8132);

// 开起来后运行这条命令可以测试并发量：ab -n1000 -c10 http://localhost:8132/
```

上面代码中的 `req` 是 [http.IncomingMessage 类](http://nodejs.cn/api/http.html#http_class_http_incomingmessage)的实例，而 `res` 是 [http.ServerResponse 类](http://nodejs.cn/api/http.html#http_class_http_serverresponse) 的实例

#### req 查看请求头

```js
req.headers;

// {
//     host: 'localhost:8132',
//     connection: 'keep-alive',
//     pragma: 'no-cache',
//     'cache-control': 'no-cache',
//     'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36',
//     accept: 'image/webp,image/apng,image/*,*/*;q=0.8',
//     referer: 'http://localhost:8132/',
//     'accept-encoding': 'gzip, deflate, br',
//     'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
// }
```

#### 查看请求参数

```js
require('url').parse(req.url, true);

// Url {
//     protocol: null,
//     slashes: null,
//     auth: null,
//     host: null,
//     port: null,
//     hostname: null,
//     hash: null,
//     search: '?foo=bar&id=1',
//     query: { foo: 'bar', id: '1' },
//     pathname: '/1',
//     path: '/1?foo=bar&id=1',
//     href: '/1?foo=bar&id=1'
// }
```

#### 获取 post 请求 data

[./example/postData.js](./example/postData.js)。

```js
var http = require('http');
var querystring = require('querystring');

http.createServer(function (req, res) {
    // 定义了一个post变量，用于暂存请求体的信息
    var post = '';

    // 通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
    req.on('data', function (chunk) {
        post += chunk;
    });

    // 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
    // post.xxx 就可以获取到一个叫xxx的参数
    req.on('end', function () {
        post = querystring.parse(post);
        res.end(post);
    });
}).listen(3000);

```

话说回来，express 里的 body-parser 中间件就是转化参数弄成 req.body 用的。

#### 返回内容

```js
// 设置响应头，该方法在消息中只能被调用一次。多处设置请用res.setHeader
res.writeHead(200, {
    'content-type': 'text/plain',
    'Set-Cookie': ['foo=bar', 'bar=baz']
});
// 返回内容
res.write('hello world');
// 结束响应
res.end();
```

## 发送一个请求

http.request(options[, callback]) 不过原生提供的调用起来麻烦一些

常用的 options 参数有以下集中，详情请看[官方文档](http://nodejs.cn/api/http.html#http_http_request_options_callback)

* host：请求发送到的服务器的域名或IP地址。默认为'localhost'。
* hostname：用于支持url.parse()。hostname比host更好一些
* port：远程服务器的端口。默认值为80。
* localAddress：用于绑定网络连接的本地接口。
* method：指定HTTP请求方法的字符串。默认为'GET'。
* path：请求路径。默认为'/'。如果有查询字符串，则需要包含。例如'/index.html?page=12'。请求路径包含非法字符时抛出异常。目前，只否决空格，不过在未来可能改变。
* headers：包含请求头的对象。
* auth：用于计算认证头的基本认证，即'user:password'

```js
var http = require('http');

//需要带上user－agent参数这个网站才会处理我的请求，不然会出现403错误
var opt = {
    //代理服务器的ip或者域名，默认localhost
    host: '122.228.179.178',
    //代理服务器的端口号，默认80
    port: 80,
    //path是访问的路径
    path: 'http://www.163.com',
    //希望发送出去的请求头
    headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36',

    }
};

//一个request请求，下面是接收的代码。
var req = http.get(opt, function(res) {
    var data = '';
    res.setEncoding("utf8"); 

    res
    .on('data', function(chunk) {
        data += chunk;
    })
    .on('end', function() {

        console.log(data)
    });
});

req.on('error', (e) => {
    console.error(`请求遇到问题: ${e.message}`);
});
```

简化写法还有 http.get 方法，常用于做爬虫，例子见 [crawlerMZT.js](./example/crawlerMZT.js)。

不过 on 监听要写很多次，特别麻烦，于是可以用第三方的 [request 库](https://github.com/request/request)。

请求起来无需写on监听拼装了，调用起来就是这么简单。

```js
const request = require('request');

request('http://www.163.com', function (error, response, body) {
    console.log('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
});
```

