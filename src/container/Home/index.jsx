import React from 'react';
import { connect } from 'react-redux';
import { getUserInfo } from '../../action/auth';

@connect(({ auth }) => ({
  userInfo: auth.userInfo,
}), {
  getUserInfo,
})
export default class Home extends React.PureComponent {
  render() {
    const { userInfo = {} } = this.props;
    const { sysUser = {} } = userInfo;
    return (
      <div>{sysUser.username}，欢迎来到快易布业务管理系统！</div>
    )
  }
}
