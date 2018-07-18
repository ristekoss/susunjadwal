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

// import React from 'react';
// import { connect } from 'react-redux';
// import { push } from 'react-router-redux';
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
// import styles from './styles.css';
// import { setLoginData } from 'containers/App/actions';
//
// export class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
//   static propTypes = {
//     push: React.PropTypes.func,
//     setLoginData: React.PropTypes.func,
//   };
//
//   componentDidMount() {
//     window.processLogin = (data) => {
//       /*set cookies*/
//       var d = new Date();
//       d.setTime(d.getTime() + (30*24*60*60*1000));
//       var expires = "expires="+d.toUTCString();
//       document.cookie = "major_id=" + data.major_id + "; expires=" + expires + ";path=/";
//       document.cookie = "token=" + data.token + "; expires=" + expires + ";path=/";
//       document.cookie = "user_id=" + data.user_id + "; expires=" + expires + ";path=/";
//       this.props.setLoginData(data.major_id, data.token, data.user_id);
//       this.props.push('/susun');
//     };
//
//     var major_id = this.getCookie("major_id");
//     var token = this.getCookie("token");
//     var user_id = this.getCookie("user_id");
//     if (major_id !== '' && token !== '' && user_id !== '') {
//       this.props.setLoginData(major_id, token, user_id);
//       this.props.push('/susun');
//     }
//   }
//
//   getCookie(cname) {
//       var name = cname + "=";
//       var ca = document.cookie.split(';');
//       for(var i = 0; i < ca.length; i++) {
//           var c = ca[i];
//           while (c.charAt(0) == ' ') {
//               c = c.substring(1);
//           }
//           if (c.indexOf(name) == 0) {
//               return c.substring(name.length, c.length);
//           }
//       }
//       return "";
//   }
//
//   ssoLogin() {
//     window.open('http://localhost:9000/api', 'Sunjad_SSO_Login', 'width=600,height=600');
//   }
//
//   render() {
//     return (
//       <div className="row expanded">
//         <div className="small-12 columns text-center">
//           <div className={styles.hero}>
//             <div className={styles.posContainer}>
//               <h1 className={styles.logo}>
//                 Susun<span>Jadwal</span>
//               </h1>
//               <p className={styles.subtitle}>
//                 <FormattedMessage {...messages.subtitle} />
//               </p>
//               <button className={styles.loginButton} onClick={this.ssoLogin} >Login dengan SSO</button>
//               <p className={styles.gabungJadwalInfo}>Ingin cari waktu kosong? Gunakan fitur <button className={styles.link} onClick={() => this.props.push('/gabung')} >Gabungkan Jadwal</button></p>
//               <div className={styles.noticeBar}>
//                 <FormattedMessage {...messages.noticeMessage} />
//               </div>
//               <p className={styles.disclaimer}>Ini Disclaimer buat SSO, Kami menggunakan akun SSO anda seperlunya wkwk</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
//
// function mapDispatchToProps(dispatch) {
//   return {
//     push: (url) => (dispatch(push(url))),
//     setLoginData: (majorId, token, userId) => dispatch(setLoginData(majorId, token, userId)),
//     dispatch,
//   };
// }
//
// export default connect(null, mapDispatchToProps)(HomePage);

// Temporary


import React from 'react';
import { LoginPage } from './temporaryJS';
import SUSUNJADWALPIC from './logoSusun.png';

export default class HomePage extends React.Component {
  render() {
    return (
      <LoginPage>
        <div className="wholeContainer">
          <div className="loginContainer">
              <img src={SUSUNJADWALPIC} alt="susunPict" />
            <button className="loginButton">login with SSO</button>
          </div>
        </div>
      </LoginPage>
    );
  }
}
