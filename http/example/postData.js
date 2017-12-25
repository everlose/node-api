const http = require('http');
const querystring = require('querystring');

const postHTML = `
    <html>
        <head>
            <meta charset="utf-8">
            <title>菜鸟教程 Node.js 实例</title>
        </head>
        <body>
            <form method="post" action="/post">
                名字： <input name="name"><br>
                email： <input name="email"><br>
                <input type="submit">
            </form>
        </body>
    </html>
`;

http.createServer(function (req, res) {
    var body = '';
    req.on('data', function (chunk) {
        body += chunk;
    });
    req.on('end', function () {
        // 解析参数
        body = querystring.parse(body);
        // 设置响应头部信息及编码
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf8'
        });
        console.log(req.url);
        if (req.url === '/post') {
            res.write(`
                名字：${body.name}
                <br>
                email：${body.email}
            `)
        } else if (req.url === '/') {
            res.write(postHTML);
        }
        res.end();
    });
}).listen(8133);

