## Webpack优化

- #### 打包文件名

  contentHash: 根据文件内容形成的hash，如果内容不变hash值不变，命中缓存时不会重新加载。

  

- #### css抽离

  为什么要抽离？因为css文件内容并不经常变，抽离之后有利与缓存，加载网页的速度。

  默认打包过程：css-loader --> style-loader；

  style-loader会将css放到 网页的style标签里；

  MiniExtractPlugin插件抽离到css文件中；

- css压缩

  TerserJSPlugin + OptimizeCSSAssetsPlugin

  #### css跨浏览器兼容

  使用postcss-loader处理css

- ##### 第三方库用cdn代替，减少打包的体积

  webpack中配置externals，一般用key-value的方式配置，左边是导入模块的名称（比如element-ui)，右边是cdn链接产生的全局变量（比如 ELEMENT）

- ##### 使用splitChunks分割大小

- ##### webpackChunkName 注释分割

  ```js
  例子：/* webpackChunkName: "userDetail"*/
  ```



## 插件使用集合

- #### DllPlugin+DllReferencePlugin实现动态库

  将不需要变化的第三方库打包成js文件独立出来通过manifest.json维护。

  ##### 使用：先使用dllplugin插件打包：dll.js和manifest.json文件

  ```js
  //webpack.dll.js 配置文件
  const path = require('path')
  const DllPlugin = require('webpack/lib/DllPlugin')
  const {srcPath, distPath} = require('./paths')
  
  module.exports = {
      mode: 'development',
      // JS 执行入口文件
      entry: {
          // 把 多个 相关模块的放到一个单独的动态链接库
          vendor: ['vue', 'element-ui', 'vue-router', 'axios', 'lodash', 'vuex', 'vue2-transitions', 'moment', 'echarts', 'ali-oss']
      },
      output: {
          // 输出的动态链接库的文件名称，[name] 代表当前动态链接库的名称，
          // 也就是 entry 中配置的 react 和 polyfill
          filename: '[name].dll.js',
          // 输出的文件都放到 dist 目录下
          path: distPath,
          // 存放动态链接库的全局变量名称，例如对应 vendor 来说就是 vendor__lib__
          // 之所以在前面加上 __lib__ 是为了防止全局变量冲突
          library: '[name]__lib__',
      },
      plugins: [
          // 接入 DllPlugin
          new DllPlugin({
              // 动态链接库的全局变量名称，需要和 output.library 中保持一致
              // 该字段的值也就是输出的 manifest.json 文件 中 name 字段的值
              // 例如 vendor.manifest.json 中就有 "name": "vendor__lib__"
              name: '[name]__lib__',
              // 描述动态链接库的 manifest.json 文件输出时的文件名称
              path: path.join(distPath, '[name].manifest.json'),
          }),
      ],
  }
  ```

  ```shell
  使用webpack --config webpack.dll.js 命令打包
  ```

  ##### vue.config.js文件中使用DllReferencePlugin插件

```js
// 第一，引入 DllReferencePlugin
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');
const webpack = require('webpack')
const path = require('path')
const { srcPath, distPath } = require('./paths')
const manifest = require('./dist/vendor.manifest.json');

module.exports = {
    configureWebpack: {
        plugins: [
            new webpack.DefinePlugin({
                // window.ENV = 'production'
                ENV: JSON.stringify('development')
            }),
            // 第三，告诉 Webpack 使用了哪些动态链接库
            new DllReferencePlugin({
                // 描述 动态链接库的文件内容
                manifest
            }),
        ]
    }
}
```

##### 最后需要在js或者index.html中引用vendor.dll.js文件
