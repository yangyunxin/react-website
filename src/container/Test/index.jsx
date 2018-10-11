import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';

export default class Test extends React.PureComponent {
  state = {
    value: '',
    test: 'test'
  }
  handleChange = (e) => {
    this.setState({ value: e.target.value })
  }
  componentDidMount() {
    console.log('parent mount did')
  }
  render() {
    console.log('parent render')
    const { match } = this.props;
    return (
      <div>
        <input onChange={this.handleChange} />
        <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
        <Switch>
          <Route render={() => <Item value={this.state.value} />} path={`/test/list/props-v-state`} />
        </Switch>
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
      <div>ddd{this.props.value}</div>
    )
  }
}
