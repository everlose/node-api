url 模块提供了一些实用函数，用于 URL 处理与解析。 可以通过以下方式使用：

```js
const url = require('url');
```

Class: URL

```js
// http://user:pass@host.com:8080/p/a/t/h?query=string#hash

href: 解析前的完整原始 URL，协议名和主机名已转为小写
// 例如: 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash'

protocol: 请求协议，小写
// 例如: 'http:'

slashes: 协议的“：”号后是否有“/”
// 例如: true or false

auth: URL中的认证信息
// 例如: 'user:pass'

host: URL主机名，包括端口信息，小写
// 例如: 'host.com:8080'

hostname: 主机名，小写
// 例如: 'host.com'

port: 主机的端口号
// 例如: '8080'

path: pathname 和 search的合集
// 例如: '/p/a/t/h?query=string'

pathname: URL中路径
// 例如: '/p/a/t/h'

search: 查询对象，即：queryString，包括之前的问号“?”
// 例如: '?query=string'

query: 查询字符串中的参数部分（问号后面部分字符串），或者使用 querystring.parse() 解析后返回的对象
// 例如: 'query=string' or {'query':'string'}

hash: 锚点部分（即：“#”及其后的部分）
// 例如: '#hash'
```

## 解析一个 URL 字符串并返回一个 URL 对象

url.parse(urlString[, parseQueryString[, slashesDenoteHost]])

```js
// 第二个可选参数设置为true时，会使用querystring模块来解析URL中德查询字符串部分，默认为 false。
var urlString = 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash';
url.parse(urlString, true);
// {
//     protocol: 'http:',
//     slashes: true,
//     auth: 'user:pass',
//     host: 'host.com:8080',
//     port: '8080',
//     hostname: 'host.com',
//     hash: '#hash',
//     search: '?query=string',
//     query: {query:"string"},
//     pathname: '/p/a/t/h',
//     path: '/p/a/t/h?query=string',
//     href: 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash' 
// }
```

## 格式化URL对象

url.format(urlObject) 与上面的 url.parse 正好相反

## 拼装url

url.resolve(from, to)

```js
const url = require('url');
url.resolve('/one/two/three', 'four');         // '/one/two/four'
url.resolve('http://example.com/', '/one');    // 'http://example.com/one'
url.resolve('http://example.com/one', '/two'); // 'http://example.com/two'
```
