## 父组件改变引起子组件改变

在组件中，如果props和state改变，会引起当前组件的render的重新渲染，那么父组件的子组件会产生什么变化呢

### 父组件的state和props改变引起普通子组件改变
> 子组件是继承Component类形成的

&emsp;如果子组件是继承类Component的一定会随着父组件的render改变发生重新render的
```
export default class Test extends React.PureComponent {
  state = {
    value: ''
  }
  handleChange = (e) => {
    this.setState({ value: e.target.value })
  }
  render() {
    console.log(this.state.value);
    return (
      <div>
        <input onChange={this.handleChange} />
        <Item />
      </div>
    )
  }
}

class Item extends React.Component {
  render() {
    console.log('child render')
    return (
      <div>item</div>
    )
  }
}

```

### 父组件的state和props改变引起纯子组件改变
> 子组件是继承PureComponent类或纯函数形成的

&emsp;1. 如果子组件和父组件不存在数据传递关系，或传递的数据没有发生改变，那么父组件的render渲染不会对子组件造成影响
&emsp;2. 如果子组件的数据由父组件传递，且传递的数据在父组件发生改变，那么子组件render一定随着父组件重新渲染
```
export default class Test extends React.PureComponent {
  state = {
    value: '',
    test: 'test'
  }
  handleChange = (e) => {
    this.setState({ value: e.target.value })
  }
  render() {
    console.log(this.state.value);
    return (
      <div>
        <input onChange={this.handleChange} />
        <Item value={this.state.value} />
      </div>
    )
  }
}


class Item extends React.PureComponent {
  componentDidMount() {
    console.log('child mount did')
  }
  render() {
    console.log('child render')
    return (
      <div>{this.props.value}</div>
    )
  }
}
```

### 组件和react-router一起使用
&emsp;1. 父组件没有向路由组件传递数据时，路由数据不会重新渲染
&emsp;2. 父组件向路由组件传递数据时，路由组件可能会引起一些问题
如果只传入一个组件时，可以使用Router的component属性，但是你要通过props传递数据给路由子组件时，就不能用component属性了，因为你构建一个新的组件，这就导致组件变成卸载和安装而不是更新了
eg:
```<Route component={() => <Item value={this.state.value} />} path={`/test/list/props-v-state`} />```
官方推荐时候render或children属性进行组件传递，就不会造成上面问题，也就是遇见很奇怪的路由组件会产生多次componentDidMount
```<Route render={() => <Item value={this.state.value} />} path={`/test/list/props-v-state`} />```
