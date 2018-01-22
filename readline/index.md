使用 require('readline')，可以使用这个模块。逐行读取（Readline）可以逐行读取流（比如process.stdin）

一旦你开启了这个模块，node 程序将不会终止，直到你关闭接口。以下的代码展示了如何优雅的退出程序：

```js
var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("What do you think of node.js? ", function (answer) {
    // TODO: Log the answer in a database
    console.log("Thank you for your valuable feedback:", answer);

    rl.close();
});
```

## 简单的命令行界面

[line.js](./line.js)

## 更好的命令行交互洁面

需要用到 inquirer 库，具体见[demo](./inquirer.js)
