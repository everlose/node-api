
```js
// cpu架构
os.arch(); // x64

// 操作系统的名字. Darwin 在 macOS 系统上
os.type(); // Darwin

// 系统开机时间
os.uptime(); // 432189

// 主机名
os.hostname(); // everlsedeMacBook-Pro.local

// 主目录
os.homedir(); // /Users/everlse

// 总内存 8G 返回字节数.
os.totalmem(); // 8589934592
// 空闲内存
os.freemem(); // 170668032

// cpu
const cpus = os.cpus();
cpus.forEach((cpu,idx,arr)=>{
    var times = cpu.times;
    console.log(`cpu${idx}：`);
    console.log(`型号：${cpu.model}`);
    console.log(`频率：${cpu.speed}MHz`);
    console.log(`使用率：${((1-times.idle/(times.idle+times.user+times.nice+times.sys+times.irq))*100).toFixed(2)}%`);
});

// 网卡
const networksObj = os.networkInterfaces();
for(let nw in networksObj){
    let objArr = networksObj[nw];
    console.log(`\r\n${nw}：`);
    objArr.forEach((obj,idx,arr)=>{
        console.log(`地址：${obj.address}`);
        console.log(`掩码：${obj.netmask}`);
        console.log(`物理地址：${obj.mac}`);
        console.log(`协议族：${obj.family}`);
    });
}
```
