querystring 参数处理模块，用于解析与格式化 URL 查询字符串。 引入：

```js
const querystring = require('querystring')
```

## querystring.stringify 对象格式化成参数字符串

querystring.stringify(obj, [sep], [eq])

对象格式化成参数字符串 ,obj就是要格式化的对象,必选参数;[sep]指分隔符 默认'&'; [eq]指分配符 默认'='

```js
var querystring = require('querystring')
var param = ;
    
querystring.stringify({
    name: "feng",
    age: "33"
}); // name=feng&age=33

querystring.stringify({
    name: "feng",
    age: "33"
}, '$', '-'); // name-feng$age-33

querystring.stringify({
    name: {
        first: 'Kaishek',
        last: 'Chiang'
    },
    age: "33"
}); // name=&age=33

querystring.stringify({
    name: [1, 2],
    age: "33"
}); // name=1&name=2&age=33
```

本方法会自动编码汉字，顺便说一句，有个库叫 [qs](https://github.com/ljharb/qs)，提供比原生 queryString 更为强大的序列/反序列化方法，具体就体现为 querystring 只能处理平级对象属性，没法处理嵌套属性，上例第三个输出中的 name 就无值。转化数组的时候序列化的有些奇怪。

## 参数字符串格式化成对象

querystring.parse(str, [sep], [eq], [options])

```js
querystring.parse('name=Kaishek&age=33'); // { name: 'Kaishek', age: '33' }

querystring.parse('name-Kaishek$age-33', '$', '-'); // { name: 'Kaishek', age: '33' }
```

## querystring.escape 参数编码

```js
querystring.escape('name=Kaishek&age=33');
// name%3DKaishek%26age%3D33
```

## querystring.unescape 参数解码

```js
querystring.unescape('name%3DKaishek%26age%3D33');
// name=Kaishek&age=33
```
