/*
 *
 * LogoutModule
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { logOut } from 'containers/App/actions';

export class LogoutModule extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
  	logOut: React.PropTypes.func,
  	push: React.PropTypes.func,
  };

  componentDidMount() {
    document.cookie = "major_id=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/";
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/";
    document.cookie = "user_id=; expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/";
    this.props.logOut();
    this.props.push('/');
  }
  
  render() {
    return (
      <div>
      	<p>Logout...</p>
      </div>
    );
  }
}


function mapDispatchToProps(dispatch) {
  return {
  	push: (url) => dispatch(push(url)),
  	logOut: () => dispatch(logOut()),
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(LogoutModule);
