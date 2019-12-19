const path = require('path');
const webpack = require('webpack');
module.exports = {
  mode: "development", // "production" | "development" | "none"  // Chosen mode tells webpack to use its built-in optimizations accordingly.
  devtool: 'eval-source-map',
  entry: "./src/main.js", // string | object | array  // 这里应用程序开始执行
  // webpack 开始打包

  output: {
    // webpack 如何输出结果的相关选项
    path: path.resolve(__dirname, "dist"), // string
    // 所有输出文件的目标路径
    // 必须是绝对路径（使用 Node.js 的 path 模块）
    filename: "bundle.js", // string    // 「入口分块(entry chunk)」的文件名模板（出口分块？）
 },
    devServer: {
      contentBase: "./dist",//本地服务器所加载的页面所在的目录
      historyApiFallback: true,//不跳转
      // inline: true,//实时刷新,
       // 告诉服务器从哪里dist目录中提供内容
      contentBase: './dist',
      hot: true,
      progress: true,
      port:8023
    },
    module: {
      rules: [
          {
              test: /(\.jsx|\.js)$/,
              use: {
                  loader: "babel-loader",
                  options: {
                      presets: [
                          "env", "react"
                      ]
                  }
              },
              exclude: /node_modules/
          },
          {
            test: /\.css$/,
            use: [
                {
                    loader: "style-loader"
                }, 
                {
                    loader: "css-loader",
                    options: {
                      modules: true, // 指定启用css modules
                      localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
                    }
                },
                {
                  loader: "postcss-loader" //为不同的浏览器css加前缀
               }
            ]
        }
      ]},
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new webpack.HotModuleReplacementPlugin()//热加载插件
    ]
  }