const spider = require('./spider');
const config = require('./config.js');

let successLog = 0;

process.on('message', (params) => {
    let theCurrentPage = 1 + params.currentProgressNum;
    for (let i = 0; i < config.totalPage; i++) {

        (function (page) {
            console.log('do request the page ' + page + ' on ' + process.pid);
            spider(config.pageSize * page)
            .then(function () {
                process.send({
                    info: 'I have finished at the page ' +
                        page +
                        ' on ' +
                        process.pid
                });
            })
            .catch(function (e) {
                process.send({
                    info: 'I have failed at the page ' +
                        page +
                        ' on ' +
                        process.pid +
                        ' cause ' +
                        e
                });
            })
            .then(function () {
                successLog += 1;
                if (successLog === config.totalPage) {
                    process.send({
                        diretive: 'shutdown'
                    });
                }
            });
        })(theCurrentPage)

        theCurrentPage += params.totalProgressNum;
    }
});
