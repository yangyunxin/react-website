### 搭建react打包后的app.js的后台服务
- `express`启动后台服务
- `connect-history-api-fallback`解决服务启动后页面刷新的404问题
- `http-proxy`解决接口api的代理问题，用`prependPath`解决path的rewrite需求
- `express.static`设置打包后的`build`文件夹作为静态资源库
- `babel-register`解决node兼任es6语法启动问题

### pm2的使用
> pm2是node进程管理工具，可以利用它来简化很多node应用管理的繁琐任务，如性能监控、自动重启、负载均衡等
1. 安装：`npm install -g pm2`利用npm安装pm2包
2. 启动：`pm2 start ./server/index.js --watch`watch参数是express代码发生变化时候，pm2会重启服务
3. 重启：`pm2 reset ./server/index.js`
4. 停止：`pm2 stop all | appid`停止全部或者某个应用
5. 删除：`pm2 delete all | appid`删除全部或某个应用
6. 查看全部应用 `pm2 list`
7. 查看某个进程信息 `pm2 show appid`
8. 环境配置：`--env production`
9. 配置文件：`pm2 init`
10. 日志信息：`pm2 logs`

### nginx配置代理
