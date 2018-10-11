### 搭建react打包后的app.js的后台服务
- `express`启动后台服务
- `connect-history-api-fallback`解决服务启动后页面刷新的404问题
- `http-proxy`解决接口api的代理问题，用`prependPath`解决path的rewrite需求
- `express.static`设置打包后的`build`文件夹作为静态资源库
- `babel-register`解决node兼任es6语法启动问题
