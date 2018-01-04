Buffer 类在 Node.js 中是一个全局变量，因此无需使用 `require('buffer').Buffer`。

node v8 之后各种 new Buffer() 构造函数已被废弃，并由 Buffer.from()、Buffer.alloc()、和 Buffer.allocUnsafe() 方法替代

* Buffer.from(array) 返回一个新建的包含所提供的字节数组的副本的 Buffer。
* Buffer.from(arrayBuffer[, byteOffset [, length]]) 返回一个新建的与给定的 ArrayBuffer 共享同一内存的 Buffer。
* Buffer.from(buffer) 返回一个新建的包含所提供的 Buffer 的内容的副本的 Buffer。
* Buffer.from(string[, encoding]) 返回一个新建的包含所提供的字符串的副本的 Buffer。

## 字符编码转换

Buffer.from(string[, encoding]) 返回一个新建的包含所提供的字符串的副本的 Buffer。

```js
const buf = Buffer.from('hello world', 'ascii');

// 输出 68656c6c6f20776f726c64
console.log(buf.toString('hex'));

// 输出 aGVsbG8gd29ybGQ=
console.log(buf.toString('base64'));
```

Node.js 目前支持的字符编码包括：

* 'ascii' - 仅支持 7 位 ASCII 数据。如果设置去掉高位的话，这种编码是非常快的。
* 'utf8' - 多字节编码的 Unicode 字符。许多网页和其他文档格式都使用 UTF-8 。
* 'base64' - Base64 编码。当从字符串创建 Buffer 时，按照 RFC4648 第 5 章的规定，这种编码也将正确地接受“URL 与文件名安全字母表”。
* 'binary' - 把 Buffer 编码成一字节编码的字符串
* 'hex' - 将每个字节编码为两个十六进制字符。

## 检查字符编码

Buffer.isEncoding(encoding)

## 复制Buffer数据

`+=` 操作符隐式调用 toString 的变换，所以复制操作可以用

buf.copy(targetBuffer,[targetStart],[sourceStart],[sourceEnd]);


## 关于中文乱码

在node.js中，一个字符串的长度与根据该字符串所创建的缓存区的长度并不相同，因为在计算字符串的长度时，是以文字作为一个单位，而在计算缓存区的长度时，是以字节作为一个单位。

比如针对 ”我喜爱编程”这个字符串，该字符串对象的length属性值与根据该字符串创建的buffer对象的length属性值并不相同。因为字符串对象的length属性值获取的是文字个数，而buffer对象的length属性值获取的是缓存区的长度，即缓存区中的字节。

```js
var str = '勇士队加油';
console.log(str.length); // 5

var buf = new Buffer(str);
console.log(buf.length); // 15
```

另外，可以使用0开始的序号来取出字符串对象或缓存区中的数据。但是，在获取数据时，字符串对象是以文字作为一个单位，而缓存区对象是以字节作为一个单位。比如，针对一个引用了字符串对象的str变量来说，str2获取的是第三个文字，而针对一个引用了缓存区对象的buf对象来说，buf2获取的是缓存区中的第三个字节数据转换为整数后的数值。如下：

```js
console.log(str[2]); // 队
console.log(buf[2]); // 135
```

正确读取文件内容的方式

从上文中可以看出，如果读取文件内容是，恰好不是一个完整文字时，可能会输出错误信息

```js
var fs = require('fs');
var rs = fs.createReadStream('testdata.md', {bufferSize: 11});
var data = '';
rs.on('data', function (trunk){
    data += trunk;
});
rs.on('end', function () {
    console.log(data);
});
```

可能会输出如下的内容

```
事件循���和请求���象构成了Node.js���异步I/O模型的���个基本���素，这也是典���的消费���生产者场景。 
```

造成这个问题的根源在于data += trunk语句里隐藏的错误，在默认的情况下，trunk是一个Buffer对象。这句话的实质是隐藏了toString的变换的：

```
data = data.toString() + trunk.toString(); 
```

由于汉字不是用一个字节来存储的，导致有被截破的汉字的存在，于是出现乱码。解决这个问题有一个简单的方案，是设置编码集：
var rs = fs.createReadStream('testdata.md', {encoding: 'utf-8', bufferSize: 11});
