const fs = require('fs');
const util = require('util');
const path = require('path');

const filePath = path.join(__dirname, '/writeFile.js');

// 原版函数
// fs.writeFile(filePath, 'Hello Node.js', {flag: 'a'}, function (err) {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log('done!');
// });

// promisify 是 v8.0.0 加入的函数，用于生成 promise 对象

const writeFile = util.promisify(fs.writeFile);

writeFile(filePath, 'Hello Node.js', {flag: 'a'})
.then(() => {
    console.log('done!');
})
.catch((err) => {
    console.error(err);
});
