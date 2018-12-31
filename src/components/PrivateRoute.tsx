import * as React from 'react';
// import { observer } from 'mobx-react';
import { Redirect, Route } from 'react-router-dom';

import userService from '../services/user.service';

// @observer //TODO:
class PrivateRoute extends React.Component<any> {

  renderComponent = () => {
    const { component, hunter, employee } = this.props;

    const isLogged = userService.isLoggedIn;
    const allowed =
      (hunter && userService.isHunter) ||
      (employee && userService.isEmployee) ||
      (isLogged && !hunter && !employee)

    return allowed
      ? React.createElement(component, this.props)
      : <Redirect to={{pathname: '/login'}}/>
  }

  render() {
    const { component, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={this.renderComponent}
      />
    )
  }
};

export default PrivateRoute;

