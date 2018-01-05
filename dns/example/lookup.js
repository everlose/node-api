var dns = require('dns');

// 会受本地hosts文件影响，如果不欲如此则可以用下面的 resolve4 函数
dns.lookup('local.souche.com', { all: true }, function (err, address, family) {
	console.log(address)
});

// dns.resolve4('f2e.souche.com', function (err, address, family) {
// 	console.log(address)
// });

// [ { address: '103.232.215.139', family: 4 } ]
