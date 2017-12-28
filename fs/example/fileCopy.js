const fs = require('fs');
const path = require('path');

const origin = path.resolve('./fs/example/fileCopy.js');
const target = path.resolve('./fs/example/fileCopy1.txt');

// 版本1
/* const fileCopy = function (originFileName, targetFileName, done) {
    var input = fs.createReadStream(originFileName);
    var output = fs.createWriteStream(targetFileName);

    input.on('data', function (d) {
        output.write(d);
    });
    input.on('error', function (err) {
        throw err;
    });
    input.on('end', function () {
        output.end();
        if (done) done();
    });
}; */

const fileCopy = function (originFileName, targetFileName, done) {
    var input = fs.createReadStream(originFileName);
    var output = fs.createWriteStream(targetFileName);

    input.pipe(output);
    input.on('data', function (d) {
        console.log(d); // It's a buffer string
    });
    input.on('error', function (err) {
        throw err;
    });
    input.on('end', function () {
        console.log('read success');
        if (done) done();
    });
};

fileCopy(origin, target, function () {
    console.log('done!');
})

// 最后要说的是文件拷贝在 node v8.5.0 已经有了现成的函数：fs.copyFile(src, dest[, flags], callback)
// http://nodejs.cn/api/fs.html#fs_fs_copyfile_src_dest_flags_callback
