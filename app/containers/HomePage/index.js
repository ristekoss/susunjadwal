/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { LoginPage } from './temporaryJS';
import SUSUNJADWALPIC from './logoSusun.png';
import { setLoginData } from 'containers/App/actions';
import { API_BASE_URL } from '../api.js'

export class HomePage extends React.Component {
  static propTypes = {
    push: React.PropTypes.func,
    setLoginData: React.PropTypes.func,
  };

  ssoLogin() {
    window.open(API_BASE_URL + '/login/', '_blank', 'width=600,height=600');
  }

  componentDidMount() {
    window.addEventListener('message', (e) => {
      var data = e.data;
      e.source.close();

      var d = (new Date().getTime() + (30*24*60*60*1000));
      var expires = "expires="+d;
      document.cookie = "major_id=" + data.major_id + "; expires=" + expires + ";path=/";
      document.cookie = "token=" + data.token + "; expires=" + expires + ";path=/";
      document.cookie = "user_id=" + data.user_id + "; expires=" + expires + ";path=/";

      this.props.setLoginData(data.major_id, data.token, data.user_id);
      this.props.push('/susun');
    });

    var major_id = this.getCookie("major_id");
    var token = this.getCookie("token");
    var user_id = this.getCookie("user_id");
    if (major_id !== '' && token !== '' && user_id !== '') {
      this.props.setLoginData(major_id, token, user_id);
      this.props.push('/susun');
    }
  }

  getCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for(var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
              c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
              return c.substring(name.length, c.length);
          }
      }
      return "";
  }

  render() {
    return (
      <LoginPage>
        <div className="wholeContainer">
          <div className="loginContainer">
              <img src={SUSUNJADWALPIC} alt="susunPict" />
            <button onClick={this.ssoLogin} className="loginButton">login with SSO</button>
          </div>
        </div>
      </LoginPage>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    push: (url) => (dispatch(push(url))),
    setLoginData: (majorId, token, userId) => dispatch(setLoginData(majorId, token, userId)),
    dispatch,
  };
}

export default connect(null, mapDispatchToProps)(HomePage);