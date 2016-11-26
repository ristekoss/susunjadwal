/*
 *
 * JadwalSpesifik
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import selectJadwalSpesifik from './selectors';
import { push } from 'react-router-redux';
import { fetch } from './actions';
import styles from './styles.css';
import { isEmpty } from 'lodash';

import Header from 'components/Header';

export class JadwalSpesifik extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    push: React.PropTypes.func,
    params: React.PropTypes.object,
    fetch: React.PropTypes.func,
    primarySched: React.PropTypes.array,
    firstTimeLoad: React.PropTypes.bool,
  };

  componentDidMount() {
    if(this.props.firstTimeLoad) {
      this.props.fetch(this.props.params.slug);
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

  convertToMinute(val) {
    var temp = val.split(".");
    var hour = parseInt(temp[0]);
    var minute = parseInt(temp[1]);
    return hour * 60 + minute;
  }

  render() {
    let navbarButton = null;
    var major_id = this.getCookie("major_id");
    var token = this.getCookie("token");
    var user_id = this.getCookie("user_id");
    if (major_id !== '' && token !== '' && user_id !== '') {
      navbarButton = [
        (<button key="logoutButtonJS" onClick={() => this.props.push('/logout')}>Logout</button>),
        (<button key="toJadwalButtonJS" onClick={() => this.props.push('/jadwal')}>Kembali ke daftar jadwal</button>),
      ];
    }

    let primarySchedElem = null;
    if(!isEmpty(this.props.primarySched)) {
      primarySchedElem = this.props.primarySched.map((value, key) => {
        const dur = this.convertToMinute(value.end) - this.convertToMinute(value.start);
        const start = this.convertToMinute(value.start) - this.convertToMinute('08.00');
        return (
          <div key={`entryJadwal-${value.name}-${value.day.toLowerCase()}-${value.start}-${value.end}-${value.room}`} className={`entryJadwal ${value.day.toLowerCase()}`} style={{height: `${(dur / 30) * 2}rem`, top: `${(start / 30) * 2}rem`}}>
            <div className="entryTime">
              <p>{value.start} - {value.end}</p>
            </div>
            <div className="entryContent">
              <h1>{value.name}</h1>
              <h3>{value.room}</h3>
            </div>
          </div>
        );
      });
    }

    return (
      <div>
        <Helmet
          title="Jadwal"
          meta={[
            { name: 'description', content: 'Description of Jadwal' },
          ]}
        />
        <Header>
          {navbarButton}
        </Header>
        <div className={styles.jadwal}>
          <div className={styles.scheduleModule}>
            <div className={styles.scheduleHeader}>
              <div className={styles.timeHeader}>
                <p>Jam</p>
              </div>
              <div className={styles.dayHeader}>
                <p>Senin</p>
              </div>
              <div className={styles.dayHeader}>
                <p>Selasa</p>
              </div>
              <div className={styles.dayHeader}>
                <p>Rabu</p>
              </div>
              <div className={styles.dayHeader}>
                <p>Kamis</p>
              </div>
              <div className={styles.dayHeader}>
                <p>Jumat</p>
              </div>
              <div className={styles.dayHeader}>
                <p>Sabtu</p>
              </div>
            </div>
            <div className={styles.scheduleContent}>
              <div className={styles.timeContent}>
                <div className={styles.container}>
                  <p>08.00</p>
                  <p>08.30</p>
                  <p>09.00</p>
                  <p>09.30</p>
                  <p>10.00</p>
                  <p>10.30</p>
                  <p>11.00</p>
                  <p>11.30</p>
                  <p>12.00</p>
                  <p>12.30</p>
                  <p>13.00</p>
                  <p>13.30</p>
                  <p>14.00</p>
                  <p>14.30</p>
                  <p>15.00</p>
                  <p>15.30</p>
                  <p>16.00</p>
                  <p>16.30</p>
                  <p>17.00</p>
                  <p>17.30</p>
                  <p>18.00</p>
                </div>
              </div>
              <div className={styles.dayContent}>
                {primarySchedElem}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = selectJadwalSpesifik();

function mapDispatchToProps(dispatch) {
  return {
    push: (url) => dispatch(push(url)),
    fetch: (slug) => dispatch(fetch(slug)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(JadwalSpesifik);
