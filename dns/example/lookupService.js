const dns = require('dns');

// 将参数address和port传入操作系统底层getnameinfo服务来解析处理并返回主机名。
// 22 ssh, 80 http
dns.lookupService('127.0.0.1', 22, (err, hostname, service) => {
    console.log(hostname, service);
    // Prints: localhost ssh
});
