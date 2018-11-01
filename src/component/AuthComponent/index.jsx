import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { Spin } from 'antd';
import { authCheck } from '../../action/auth';

@connect(({ auth }) => ({
  authStatus: auth.authStatus
}), {
  authCheck
})
export default class AuthComponent extends React.PureComponent {
  state = {
    hasAuth: false,
  }
  async componentDidMount() {
    await this.props.authCheck();
    const { authStatus } = this.props;
    if (authStatus) {
      this.setState({ hasAuth: true});
    } else {
      this.setState({ hasAuth: true});
    }
  }
  render() {
    const { component, redirectPath, ...rest } = this.props;
    return this.state.hasAuth ? (
      <Fragment>
        {
          this.props.authStatus ? (
            <Route
              {...rest}
              render={(props) => <this.props.component {...props} />}
            />
          ) : (
            <Redirect
              to={{
                pathname: redirectPath,
                state: { from: rest.location }
              }}
            />
          )
        }
      </Fragment>
    ) : (
      <div style={{ width: '100%', height: '100%',margin: 'auto', paddingTop: 50, textAlign: 'center' }}>
        <Spin />
      </div>
    )
  }
}
