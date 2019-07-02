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
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { deleteJadwal, setJadwalUtama, fetch } from './actions';
import styles from './styles.css';
import { isEmpty } from 'lodash';
import { setLoginData } from 'containers/App/actions';
import deleteIcon from './baseline-delete-24px.png';

import Header from 'components/Header';

export class Jadwal extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    push: React.PropTypes.func,
    fetch: React.PropTypes.func,
    setJadwalUtama: React.PropTypes.func,
    setLoginData: React.PropTypes.func,
    deleteJadwal: React.PropTypes.func,
    globalState: React.PropTypes.object,
    localState: React.PropTypes.object,
  };

  componentDidMount() {
    this.props.fetch();

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
    console.log(this.props.localState.primarySched)
    if(!isEmpty(this.props.localState.primarySched)) {
      primarySchedElem = this.props.localState.primarySched["schedule_items"].map((value, key) => {
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

    let scheduleListElem = null;

    if(!isEmpty(this.props.localState.scheduleList)) {
      scheduleListElem = this.props.localState.scheduleList.map((value, key) => {
        let primaryElement = null;
        const createdAt = new Date(value.created_at);
        primaryElement = (
          <div key={`primary-sched-${value.id}`} className="small-12 columns flashUpdate">
            <div className={styles.listItem}>
              <div className="row expanded">
                <div className="small-3 columns">
                  <div className={styles.listItemContent}>
                    <p>SCHED_NAME 📝</p>
                  </div>
                </div>
                <div className="small-3 columns">
                  <div className={styles.listItemContent}>
                    <p>{createdAt.getDate()} - {createdAt.getMonth() + 1} - {createdAt.getFullYear()}</p>
                  </div>
                </div>
                <div className="small-4 columns">
                  <div className={styles.listItemContent}>
                    <Link to={`/jadwal/${value.id}`}>{`http://www.sunjad.com/jadwal/${value.id}`}</Link>
                  </div>
                </div>
                <div className="small-2 columns">
                      <div className={styles.listItemContent}>
                        <button onClick={() => this.props.deleteJadwal(value.id)}>
                          <img src={deleteIcon} alt="Delete" /> Delete
                        </button>
                      </div>
                    </div>
                </div>
            </div>
          </div>
        );
        return primaryElement;
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
          <div className={styles.scheduleList}>
            <div className="row expanded">
              <div className="small-12 columns">
                <div className={styles.pageTitle}>
                  <p>Riwayat Jadwal</p>
                </div>
              </div>
              <div className="small-12 columns">
                <div className="row expanded">
                  <div className="small-3 columns">
                    <div className={styles.listHeader}>
                      <p>Nama Jadwal</p>
                    </div>
                  </div>
                  <div className="small-3 columns">
                    <div className={styles.listHeader}>
                      <p>Tanggal Dibuat</p>
                    </div>
                  </div>
                  <div className="small-4 columns">
                    <div className={styles.listHeader}>
                      <p>Shareable Link</p>
                    </div>
                  </div>
                  <div className="small-2 columns">
                    <div className={styles.listHeader}>
                      <p>DEL_COLUMN</p>
                    </div>
                  </div>
                </div>
              </div>
              {scheduleListElem}
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
    deleteJadwal: (id) => dispatch(deleteJadwal(id)),
    setLoginData: (majorId, token, userId) => dispatch(setLoginData(majorId, token, userId)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Jadwal);
