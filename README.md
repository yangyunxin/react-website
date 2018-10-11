## creat-react-server
- [x] creat-react-app
- [x] react-hot-loader
- [x] redux
- [x] redux-thunk
- [x] antd-mobile
- [ ] 服务端渲染
- [x] 接口转发处理
- [ ] jwt使用
- [x] axios
- [x] antd
- [ ] eslint怎么做的


## ANTD真的好大
1. 按需加载之后一个Button组件引入就有500kb
2. 在Main.jsx文件中，竟然从600kb增加到了1300kb
3. 如果只引入login.jsx文件，只有720kb，感觉一个组件要增加100kb左右
4. 必须在nginx服务下开启gzip压缩机制，不然真的很卡


## AuthRoute组件判断是否登录
1. 因为子组件在父组件之前执行，因此引入了`AuthRoute`组件先判断是否登录再加载children组件


## Authorization和后台对接方式
1. auth权限接口设计，每一次接口请求都要在header里添加`Authorization`属性来判断是否有权限，感觉像以前的cookie或者jwt方式登录
2. 如果后台判断没有权限，就会返回401状态，理想中想直接在request中直接push跳转到login页面，但是react-router库在4.0移出了直接使用push方法
3. 目前每次在action中判断是否401，如果是就设置store的isAuth值来跳转路由


## 遇到问题
1. nginx怎么部署
2. 怎么开始gzip服务


## 父组件改变引起子组件改变
1. 父组件发生state或者props改变时，使用继承Component组件，会引起子组件render改变
2. 如果使用继承PureComponent组件，就拥有浅比较，不会引起多余的子组件渲染

### PureComponent浅比较是什么
