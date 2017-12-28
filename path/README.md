path 模块提供了一些工具函数，用于处理文件与目录的路径。可以通过以下方式使用：

```javascript
const path = require('path');
```

## 获取文件名

path.basename(path[, ext])

path.basename() 方法返回一个 path 的最后一部分，类似于 Unix 中的 basename 命令。 

```js
path.basename('/foo/bar/baz/asdf/quux.min.html');
// 返回: 'quux.min.html'

path.basename('/foo/bar/baz/asdf/quux.html', '.html');
// 返回: 'quux'
```


## 获取文件后缀

path.extname(p)

返回路径文件中的扩展名（若存在）

```js
path.extname('index.html');
// 返回: '.html'

path.extname('index.coffee.md');
// 返回: '.md'

path.extname('index.');
// 返回: '.'

path.extname('index');
// 返回: ''

path.extname('.index');
// 返回: ''
```

## 获取文件目录名

path.dirname(path)

`path.dirname()` 方法返回一个 `path` 的目录名，类似于 Unix 中的 `dirname` 命令。
Trailing directory separators are ignored, see [`path.sep`][].

例子：

```js
path.dirname('/foo/bar/baz/asdf/quux');
// 返回: '/foo/bar/baz/asdf'
```

## 获取当前所在路径

path.resolve([...paths]) 以应用程序根目录为起点，根据参数字符串解析出一个绝对路径

```js
path.resolve() // '/Users/xxx/workspace/github/nodeAPI'

path.resolve('./README.md') // '/Users/xxx/workspace/github/nodeAPI/README.md'
```

或者利用 __dirname

```js
path.join(__dirname, '/xxxxfile')
```

## 结合多个路径

path.join([path1], [path2], [...])

```js
path.join('./foo/bar', '../test'); // ./foo/test
```

## 解析文件路径

path.parse(path)

path.parse() 方法返回一个对象，对象的属性表示 path 的元素

```js
path.parse('/home/user/dir/file.txt');
// 返回:
// { root: '/',
//   dir: '/home/user/dir',
//   base: 'file.txt',
//   ext: '.txt',
//   name: 'file' }
```

path.format(pathObject) 从对象中返回路径字符串，和 path.parse 相反



