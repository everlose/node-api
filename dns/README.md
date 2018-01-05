引入 const dns = require('dns');

## 查询域名对应ip

dns.lookup(hostname[, options], callback) 或者 dns.resolve4(hostname[, options], callback)

[demo](./example/lookup.js)

```js
var dns = require('dns');

// 会受本地hosts文件影响，如果不欲如此则可以用下面的 resolve4 函数
dns.lookup('local.souche.com', { all: true }, function (err, address, family) {
	console.log(address)
});

// dns.resolve4('f2e.souche.com', function (err, address, family) {
// 	console.log(address)
// });

// [ { address: '103.232.215.139', family: 4 } ]
```

## 查询ip与端口所对应的主机与服务

dns.lookupService(address, port, callback), [demo](./example/lookupService.js)

```js
const dns = require('dns');

// 将参数address和port传入操作系统底层getnameinfo服务来解析处理并返回主机名。
// 22 ssh, 80 http
dns.lookupService('127.0.0.1', 22, (err, hostname, service) => {
    console.log(hostname, service);
    // Prints: localhost ssh
});
```
