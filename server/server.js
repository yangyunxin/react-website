import path from 'path';
import express from 'express';
import history from 'connect-history-api-fallback';
import httpProxy from 'http-proxy';
import compression from 'compression';
import helmet from 'helmet';

const app = new express();
const port = 8000;
app.use(history());
app.use(compression()); // 使用 gzip/deflate 压缩响应文件
app.use(helmet());      // 使用 Helmet 避免被常见漏洞侵袭

app.use('/', express.static(path.join(__dirname, '..', 'build')));

const targetUrl = 'http://123.207.241.55:9997';
const proxy = httpProxy.createProxyServer({
  target: targetUrl,
  prependPath: false
})

app.use('/api', (req, res) => {
  proxy.web(req, res);
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`===>open listen port 8000`);
  }
});
