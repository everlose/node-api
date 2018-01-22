
require('shelljs/global');

var inquirer = require('inquirer');

inquirer.prompt([
    {
        name: 'command',
        message: '请选择要执行的命令',
        type: 'list',
        default: 'npm ls',
        choices: ['npm ls', 'npm -v', 'node -v']
    },
    {
        name: 'msg',
        message: '请输入内容',
        type: 'input',
        default: 'something'
    }
]).then(function (answers) {
    console.log(answers.msg)
    exec(answers.command);
});


// https://github.com/SBoudrias/Inquirer.js
