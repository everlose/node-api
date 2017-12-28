const fs = require('fs');
const util = require('util');
const path = require('path');

const filePath = path.join(__dirname, '/readFile.js');

const stat = util.promisify(fs.stat);

stat(filePath)
.then((data) => {
    console.log(data);
    // data.isFile()
    // data.isDirectory()
})
.catch((err) => {
    console.error(err);
});

// Stats {
//     dev: 16777218,
//     mode: 33188,
//     nlink: 1,
//     uid: 501,
//     gid: 20,
//     rdev: 0,
//     blksize: 4096,
//     ino: 89687805,
//     size: 609,
//     blocks: 8,
//     atimeMs: 1514354668000,
//     mtimeMs: 1514354667000,
//     ctimeMs: 1514354667000,
//     birthtimeMs: 1514344878000,
//     atime: 2017-12-27T06:04:28.000Z,
//     mtime: 2017-12-27T06:04:27.000Z,
//     ctime: 2017-12-27T06:04:27.000Z,
//     birthtime: 2017-12-27T03:21:18.000Z
// }
