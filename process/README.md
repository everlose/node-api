process 对象是一个 global （全局变量），提供有关信息，控制当前 Node.js 进程。作为一个对象，它对于 Node.js 应用程序始终是可用的，故无需使用 require()。

## 常用属性

process.argv: 属性返回一个数组，这个数组包含了启动Node.js进程时的命令行参数。第一个元素为process.execPath。如果需要获取argv[0]的值请参见 process.argv0。第二个元素为当前执行的JavaScript文件路径。剩余的元素为其他命令行参数。

```js
// print process.argv
process.argv.forEach((val, index) => {
    console.log(`${index}: ${val}`);
})

// $ node process-args.js one two=three four

// 0: /usr/local/bin/node
// 1: /Users/mjr/work/node/process-args.js
// 2: one
// 3: two=three
// 4: four
```

process.env：指向当前shell的环境变量，比如process.env.HOME。

process.pid: 当前进程的进程号。

process.version: Node的版本，比如v0.10.18。

process.platform: 当前系统平台，比如Linux。

process.title: 默认值为“node”，可以自定义该值。

## 常用方法

process.exit()：退出当前进程。

process.cwd()：返回运行当前脚本的工作目录的路径。

process.chdir()：改变工作目录。

process.nextTick()：将一个回调函数放在下次事件循环的顶部。process.nextTick()的例子，指定下次事件循环首先运行的任务。可以用setTimeout改写，但是nextTick回调的优先级更高，会被放在事件队列的最前面，而settimeout是放在最后面.

```js
process.nextTick(function () {
    console.log('Next event loop!');
});

// setTimeout(function () {
//     console.log('Next event loop!');
// }, 0)
```

## 事件

exit事件

```js
process.exit(1)

process.on('exit', function () {
    console.log(process.exitCode)
});
```

uncaughtException

如果Javascript未捕获的异常，沿着代码调用路径反向传递回event loop，会触发'uncaughtException'事件。 Node.js默认情况下会将这些异常堆栈打印到stderr 然后进程退出。 为'uncaughtException'事件增加监听器会覆盖上述默认行为。

