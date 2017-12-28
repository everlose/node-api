文件 I/O 是对标准 POSIX 函数的简单封装。 通过 require('fs') 使用该模块。 所有的方法都有异步和同步的形式。

下面只列出最常用的几项文件操作，其他的参照[官网](http://nodejs.cn/api/fs.html)

## 查询文件信息

fs.existsSync(path) 是否存在

```js
fs.existsSync(path.resolve('./fs/README.md')); // true
fs.existsSync(path.resolve('./fs')); // true
```

fs.stat(path, callback) 回调有两个参数 (err, stats) 其中 stats 是一个 [fs.Stats 对象](http://nodejs.cn/api/fs.html#fs_class_fs_stats)。用于查看文件或者文件夹的基础信息，如大小、权限、修改时间等

```js
fs.stat(__dirname + '/README.md', function (err, data) {
    if(err) throw err;
    console.log(data);
});
```

## 读取文件

fs.readFile(path[, options], callback)

```js
/**
 * filename, 必选参数，文件名
 * [options],可选参数，可指定flag（文件操作选项，如r+ 读写；w+ 读写，文件不存在则创建）及encoding属性
 * callback 读取文件后的回调函数，参数默认第一个err,第二个data 数据
 */

fs.readFile(__dirname + '/README.md', {flag: 'r+', encoding: 'utf8'}, function (err, data) {
    if(err) throw err;
    console.log(data);
});

// flag 标志的可能值参照： http://nodejs.cn/api/fs.html#fs_fs_open_path_flags_mode_callback
```

这是异步的做法，写回调函数可能造成回调地狱的后果，改用 promise 可以用一些第三方库，不过 node v8.0.0 提供了原生 promisely 支持，请看[例子](./example/readFile.js).

更底层的函数自行翻阅官方文档: [fs.read](http://nodejs.cn/api/fs.html#fs_fs_read_fd_buffer_offset_length_position_callback)

## 写入／追加文件

```js
/**
 * filename, 必选参数，文件名
 * data, 写入的数据，可以字符或一个Buffer对象
 * [options],flag,mode(权限),encoding
 * callback 读取文件后的回调函数，参数默认第一个err,第二个data 数据
 */

fs.writeFile(__dirname + '/README.md', 'Hello Node.js', {flag: 'a'}, function (err) {

    if(err) throw err;
    console.log('写入成功');

});
```

{flag: 'a'} 加上这个参数，内容将会被以追加方式写入文件，默认为 w 则会先清空内容，再写入数据。

## 流操作

上面的读写方法在大型文件上有一些限制，所谓大型文本文件，指的是文本文件的体积很大，读取操作的缓存装不下，只能分成几次发送，所以就出现了流操作 createReadStream/createWriteStream 每次发送会触发一个data事件，发送结束会触发end事件。

另见一个[文件拷贝的例子](./example/fileCopy.js);

[文件流的概念参考](https://www.jianshu.com/p/5683c8a93511)

```js
/*
 * 流，在应用程序中表示一组有序的、有起点有终点的字节数据的传输手段；
 * Node.js中实现了stream.Readable/stream.Writeable接口的对象进行流数据读写；以上接口都继承自EventEmitter类，因此在读/写流不同状态时，触发不同事件；
 * 关于流读取：Node.js不断将文件一小块内容读入缓冲区，再从缓冲区中读取内容；
 * 关于流写入：Node.js不断将流数据写入内在缓冲区，待缓冲区满后再将缓冲区写入到文件中；重复上面操作直到要写入内容写写完；
 * readFile、read、writeFile、write都是将整个文件放入内存而再操作，而则是文件一部分数据一部分数据操作；
 *
 * -----------------------流读取-------------------------------------
 * 读取数据对象：
 * fs.ReadStream 读取文件
 * http.IncomingMessage 客户端请求或服务器端响应
 * net.Socket    Socket端口对象
 * child.stdout  子进程标准输出
 * child.stdin   子进程标准入
 * process.stdin 用于创建进程标准输入流
 * Gzip、Deflate、DeflateRaw   数据压缩
 *
 * 触发事件：
 * readable  数据可读时
 * data      数据读取后
 * end       数据读取完成时
 * error     数据读取错误时
 * close     关闭流对象时
 *
 * 读取数据的对象操作方法：
 * read      读取数据方法
 * setEncoding   设置读取数据的编
 * pause     通知对象众目停止触发data事件
 * resume    通知对象恢复触发data事件
 * pipe      设置数据通道，将读入流数据接入写入流；
 * unpipe    取消通道
 * unshift   当流数据绑定一个解析器时，此方法取消解析器
 *
 * ------------------------流写入-------------------------------------
 * 写数据对象：
 * fs.WriteStream           写入文件对象
 * http.clientRequest       写入HTTP客户端请求数据
 * http.ServerResponse      写入HTTP服务器端响应数据
 * net.Socket               读写TCP流或UNIX流，需要connection事件传递给用户
 * child.stdout             子进程标准输出
 * child.stdin              子进程标准入
 * Gzip、Deflate、DeflateRaw  数据压缩
 *
 * 写入数据触发事件：
 * drain            当write方法返回false时，表示缓存区中已经输出到目标对象中，可以继续写入数据到缓存区
 * finish           当end方法调用，全部数据写入完成
 * pipe             当用于读取数据的对象的pipe方法被调用时
 * unpipe           当unpipe方法被调用
 * error            当发生错误
 *
 * 写入数据方法：
 * write            用于写入数据
 * end              结束写入，之后再写入会报错；
 */
```

## 目录操作

#### 查询目录是否存在

如上使用 fs.existsSync(path)

#### 读取目录

fs.readdir(path[, options], callback)

```js
fs.readdir(path.resolve(), function(err, files){
    if (err) throw err;
    files.forEach(function(file, index) {
        var filePath = path.resolve(file);
        fs.stat(filePath, function(err, stat){
            if (stat.isFile()) {
                console.log(filePath + ' is: ' + 'file');
            } else if (stat.isDirectory()) {
                console.log(filePath + ' is: ' + 'dir');
            }
        });
    });
});
```

#### 创建目录

```js
fs.mkdir(__dirname + '/testdir', function(err){
    if (err) throw err;
    console.log('创建目录成功');
})
```

#### 删除目录

```js
// 删除目录，先建一个testdir的目录吧。
fs.rmdir(__dirname + '/testdir', function(err){
    if (err) throw err;
    console.log('删除目录成功');
})
```

## 其他

* 复制文件 [fs.copyFile](http://nodejs.cn/api/fs.html#fs_fs_copyfile_src_dest_flags_callback)
* 重命名 [fs.rename](http://nodejs.cn/api/fs.html#fs_fs_rename_oldpath_newpath_callback)
* 改变文件权限 [fs.chown](http://nodejs.cn/api/fs.html#fs_fs_chown_path_uid_gid_callback)
* 改变文件时间戳 [fs.utimes](http://nodejs.cn/api/fs.html#fs_fs_utimes_path_atime_mtime_callback)
* 监听文件改变 [fs.watch](http://nodejs.cn/api/fs.html#fs_fs_watch_filename_options_listener)
