const fs = require('fs');
const util = require('util');
const path = require('path');

const filePath = path.join(__dirname, '/readFile.js');

// 原版函数
// fs.readFile(filePath, {flag: 'r+', encoding: 'utf8'}, function (err, data) {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log(data);
// });

// promisify 是 v8.0.0 加入的函数，用于生成 promise 对象

const readFile = util.promisify(fs.readFile);

readFile(filePath, {flag: 'r+', encoding: 'utf8'})
.then((data) => {
    console.log(data);
})
.catch((err) => {
    console.error(err);
});
