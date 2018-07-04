const cluster = require('cluster');
const cpuNums = require('os').cpus().length;
let workerList = [];

cluster.setupMaster({
    exec: './worker.js',
    args: ['--use', 'http']
});

for (let i = 0; i < cpuNums; i++) {
    let worker = cluster.fork();
    worker.send({
        currentProgressNum: i,
        totalProgressNum: cpuNums
    });
    workerList.push(worker);
    worker.on('message', function (msg) {
        if (msg.info) {
            console.log(msg.info);
        } else if (msg.diretive === 'shutdown') {
            worker.disconnect();
            setTimeout(() => {
                worker.kill();
            }, 2000);
        }
    })
    worker.on('exit', function (code, signal) {

    })
}

cluster.on('exit', (worker, code, signal) => {
    console.log(worker.process.pid + ' is died');
});
