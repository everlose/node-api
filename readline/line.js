const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Please input > '
});

rl.question('asdfasdf', function () {});

rl
.on('line', (line) => {
    let url = line.trim();
    setTimeout(() => {
        console.log(url);
        rl.prompt()
    }, 500);
})
.on('close', () => {
    console.log('see you!');
    process.exit(0);
});
