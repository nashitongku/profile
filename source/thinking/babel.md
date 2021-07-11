# babel

用于es6及以上的语法转换。只关心语法不关心新的api和module；

### module

如果文件中导入了其他js文件，babel本身是无法导入的，所以可以使用webpack，在webpack中一切导入的文件都是模块。

说到模块化，顺便记住：es6的imports 是静态导入，在编译时就导入了； 而commonjs的require是运行时导入，在编译前是不确定文件的。



### es 新的api怎么兼容

babel-polyfill： core.js + regenerator



### babel-polyfill的缺点

会污染全局变量。如果想要构建第三方库文件，是不能出现环境污染的。

可以使用 babel-runtime解决，原理：改变变量名称，不与使用者的变量发生冲突。





