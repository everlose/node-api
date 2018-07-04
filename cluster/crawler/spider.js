const superagent = require('superagent');
const fs = require('fs');
const url = 'https://movie.douban.com/j/search_subjects';
const filePath = require('./config').filePath;
const pageSize = require('./config').pageSize;

module.exports = function (pageStart) {
    return new Promise((resolve, reject) => {
        superagent
            .get(url)
            .query({
                'type': 'movie',
                'tag': '热门',
                'sort': 'recommend',
                'page_limit': pageSize,
                'page_start': pageStart
            })
            .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36')
            .set('Host', 'movie.douban.com')
            .end(function (err, res) {
                if (err) return reject(err);

                if (res && res.text) {
                    fs.appendFile(filePath, res.text, (writeErr) => {
                        if (writeErr) return reject(writeErr);
                        return resolve('正常写入');
                    })
                } else {
                    console.log()
                    return reject('请求没有数据');
                }
            })
    });
};
