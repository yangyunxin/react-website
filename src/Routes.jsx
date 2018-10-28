import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import AuthComponent from './component/AuthComponent';
// import AuthRoute from './component/AuthRoute';

import Login from './container/Login';
import Main from './layout/Main';
const NoMatch = (props) => (
  <div>nomatch</div>
)

export default class Routes extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <AuthComponent path="/" redirectPath="/login" component={Main} noMatch={NoMatch} />
          {/* <Route render={() => <AuthRoute Layout={Main} />} /> */}
        </Switch>
      </Router>
    );
  }
}
