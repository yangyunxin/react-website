import React from 'react';

export default class Test extends React.PureComponent {
  componentDidMount() {
    console.log('-------menu2------')
    console.log(this.props);
  }
  render() {
    return (
      <div>菜单2</div>
    )
  }
}
