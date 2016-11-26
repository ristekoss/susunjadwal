/*
 *
 * Jadwal
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import selectGlobal from 'containers/App/selectors';
import selectJadwal from './selectors';
import { push } from 'react-router-redux';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { setJadwalUtama, fetch } from './actions';
import styles from './styles.css';
import { isEmpty } from 'lodash';
import { setLoginData } from 'containers/App/actions';

import Header from 'components/Header';

export class Jadwal extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    push: React.PropTypes.func,
    fetch: React.PropTypes.func,
    setJadwalUtama: React.PropTypes.func,
    setLoginData: React.PropTypes.func,
    globalState: React.PropTypes.object,
    localState: React.PropTypes.object,
  };

  componentDidMount() {
    if(this.props.localState.firstTimeLoad) {
      this.props.fetch();
    }

    const globalStateObject = this.props.globalState;
    console.log(globalStateObject);
    var major_id = this.getCookie("major_id");
    var token = this.getCookie("token");
    var user_id = this.getCookie("user_id");
    if (!(major_id !== '') || !(token !== '') || !(user_id !== '')) {
      this.props.push('/');
    } else {
      if(globalStateObject.major_id === '' && globalStateObject.token === '' && globalStateObject.user_id === '') {
        this.props.setLoginData(major_id, token, user_id);
      }
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
    let primarySchedElem = null;
    if(!isEmpty(this.props.localState.primarySched)) {
      primarySchedElem = this.props.localState.primarySched.map((value, key) => {
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

    let scheduleListElemPrimary = null;
    let scheduleListElemNotPrimary = null;

    if(!isEmpty(this.props.localState.scheduleList)) {
      scheduleListElemPrimary = this.props.localState.scheduleList.map((value, key) => {
        let primaryElement = null;
        const createdAt = new Date(value.created_at);
        if(value.utama) {
          primaryElement = (
            <div key={`primary-sched-${value.id}`} className="small-12 columns flashUpdate">
              <div className={styles.listItem}>
                <div className="row expanded">
                  <div className="small-6 columns">
                    <div className={styles.listItemContent}>
                      <button onClick={() => this.props.push(`/jadwal/${value.id}`)}>{`http://ristek.cs.ui.ac.id/susunjadwal/jadwal/${value.id}`}</button>
                    </div>
                  </div>
                  <div className="small-4 columns">
                    <div className={styles.listItemContent}>
                      <p>{createdAt.getDate()} - {createdAt.getMonth() + 1} - {createdAt.getFullYear()}</p>
                    </div>
                  </div>
                  <div className="small-2 columns">
                    <div className={styles.listItemContent}>
                      { value.utama ? (<p>Jadwal Utama</p>) : (<button onClick={() => console.log('cie')}>Set jadwal utama</button>) }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }
        return primaryElement;
      });

      scheduleListElemNotPrimary = this.props.localState.scheduleList.map((value, key) => {
        let notPrimaryElement = null;
        const createdAt = new Date(value.created_at);

        if(!value.utama) {
          notPrimaryElement = (
              <div key={`non-primary-sched-${value.id}`}  className="small-12 columns">
                <div className={styles.listItem}>
                  <div className="row expanded">
                    <div className="small-6 columns">
                      <div className={styles.listItemContent}>
                        <button onClick={() => this.props.push(`/jadwal/${value.id}`)}>{`http://ristek.cs.ui.ac.id/susunjadwal/jadwal/${value.id}`}</button>
                      </div>
                    </div>
                    <div className="small-4 columns">
                      <div className={styles.listItemContent}>
                        <p>{createdAt.getDate()} - {createdAt.getMonth() + 1} - {createdAt.getFullYear()}</p>
                      </div>
                    </div>
                    <div className="small-2 columns">
                      <div className={styles.listItemContent}>
                        { value.utama ? (<p>Jadwal Utama</p>) : (<button onClick={() => this.props.setJadwalUtama(value.id)}>Set jadwal utama</button>) }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
        }

        return notPrimaryElement;
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
          <button onClick={() => this.props.push('/logout')}>Logout</button>
          <button onClick={() => this.props.push('/susun')}>Buat Jadwal Baru</button>
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
          <div className={styles.scheduleList}>
            <div className="row expanded">
              <div className="small-12 columns">
                <h1>My Schedules</h1>
              </div>
              <div className="small-12 columns">
                <div className="row expanded">
                  <div className="small-6 columns">
                    <div className={styles.listHeader}>
                      <p>Link Jadwal</p>
                    </div>
                  </div>
                  <div className="small-4 columns">
                    <div className={styles.listHeader}>
                      <p>Tanggal Dibuat</p>
                    </div>
                  </div>
                  <div className="small-2 columns">
                    <div className={styles.listHeader}>
                      <p>Status</p>
                    </div>
                  </div>
                </div>
              </div>
              {scheduleListElemPrimary}
              {scheduleListElemNotPrimary}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  globalState: selectGlobal(),
  localState: selectJadwal(),
});

function mapDispatchToProps(dispatch) {
  return {
    push: (url) => dispatch(push(url)),
    fetch: () => dispatch(fetch()),
    setJadwalUtama: (id) => dispatch(setJadwalUtama(id)),
    setLoginData: (majorId, token, userId) => dispatch(setLoginData(majorId, token, userId)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Jadwal);
