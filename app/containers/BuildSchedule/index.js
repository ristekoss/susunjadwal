/*
 *
 * BuildSchedule
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Helmet from 'react-helmet';
import { isEmpty, isEqual } from 'lodash';
import { createStructuredSelector } from 'reselect';
import selectGlobal from 'containers/App/selectors';
import selectBuildSchedule from './selectors';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles.css';
import { saveJadwal } from './actions';

import Header from 'components/Header';
import List from 'components/List';
import Course from 'containers/Course';

import { changeSelectedClass, removeSelectedClass, addSelectedClass } from './actions';
import { setLoginData } from 'containers/App/actions';

export class BuildSchedule extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    globalState: PropTypes.object,
    localState: PropTypes.object,
    dispatch: PropTypes.func,
    removePicked: PropTypes.func,
    addSelectedClass: PropTypes.func,
    saveJadwal: PropTypes.func,
    setLoginData: PropTypes.func,
  };

  constructor(props) {
    super();

    this.state = {
      agendaModuleVisibility: false,
      agendaModule: {
        name: '',
        schedule: {
          day: 'Senin',
          start: '',
          end: '',
          room: '',
        },
        sks: 0,
        errMesage: {
          name: '',
          schedule: {
            day: '',
            start: '',
            end: '',
            room: '',
          },
        },
      },
    };

    this.addAgenda = this.addAgenda.bind(this);
    this.showAgenda = this.showAgenda.bind(this);
    this.hideAgenda = this.hideAgenda.bind(this);
    this.finishAddAgenda = this.finishAddAgenda.bind(this);
    this.agendaChangeInput = this.agendaChangeInput.bind(this);
  }

  componentDidMount() {
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

  finishAddAgenda() {
    this.setState({
      agendaModuleVisibility: false,
      agendaModule: {
        name: '',
        schedule: {
          day: 'Senin',
          start: '',
          end: '',
          room: '',
        },
        sks: 0,
        errMesage: {
          name: '',
          schedule: {
            day: '',
            start: '',
            end: '',
            room: '',
          },
        },
      },
    });
  }

  addAgenda() {
    const timeChecker = /^([0-1]?[0-9]|2[0-4])\.([0-5][0-9])(\.[0-5][0-9])?$/;

    const nameCheck = this.state.agendaModule.name === '' || this.state.agendaModule.name === null;
    const dayCheck = this.state.agendaModule.schedule.day === '' || this.state.agendaModule.schedule.day === null;
    const startTimeCheck = timeChecker.test(this.state.agendaModule.schedule.start);
    const endTImeCheck = timeChecker.test(this.state.agendaModule.schedule.end);
    const roomCheck = this.state.agendaModule.schedule.room === '' || this.state.agendaModule.schedule.room === null;
    if(startTimeCheck && endTImeCheck && !nameCheck && !dayCheck && !roomCheck) {
      this.props.addSelectedClass(`${this.state.agendaModule.name} - ${this.state.agendaModule.schedule.day} - ${this.state.agendaModule.schedule.start} - ${this.state.agendaModule.schedule.end} - ${this.state.agendaModule.schedule.room}`, {"name":`${this.state.agendaModule.name}`, "schedule": [{day: this.state.agendaModule.schedule.day, start: this.state.agendaModule.schedule.start, end: this.state.agendaModule.schedule.end, room: this.state.agendaModule.schedule.room}],"sks":this.state.agendaModule.sks});
      this.finishAddAgenda();
    } else {
      const currentState = this.state.agendaModule;
      let newState = currentState;

      if(nameCheck) {
        newState['errMesage']['name'] = 'Nama agenda tidak boleh kosong';
      }

      if(dayCheck) {
        newState['errMesage']['schedule']['day'] = 'Hari tidak boleh kosong';
      }

      if(!startTimeCheck) {
        newState['errMesage']['schedule']['start'] = 'Error, format jam salah, seharusnya HH.MM, contoh: 12.30';
      }

      if(!endTImeCheck) {
        newState['errMesage']['schedule']['end'] = 'Error, format jam salah, seharusnya HH.MM, contoh: 12.30';
      }

      if(roomCheck) {
        newState['errMesage']['schedule']['room'] = 'Ruangan tidak boleh kosong';
      }

      this.setState({
        agendaModule: newState,
      });
    }
  }

  showAgenda() {
    this.setState({
      agendaModuleVisibility: true,
    });
  }

  hideAgenda() {
    this.setState({
      agendaModuleVisibility: false,
    });
  }

  agendaChangeInput(field, value) {
    const currentState = this.state.agendaModule;
    let newState = currentState;

    if (Array.isArray(field)) {
      newState[field[0]][field[1]] = value;
    } else {
      newState[field] = value;
    }

    this.setState({
      agendaModule: newState,
    });
  }

  render() {
    let scheduleListItems = null;
    let pickedItems = [];
    let totalSKS = 0;

    if(!isEmpty(this.props.localState.courses)) {
      scheduleListItems = (<List items={this.props.localState.courses} component={Course} />);
    }

    if(!isEmpty(this.props.localState.picked)) {
      for(let [key, value] of Object.entries(this.props.localState.picked)) {
        let isConflict = false;
        
        this.props.localState.conflict.map((item, index) => {
          value.schedule.map((valueItem, valueIndex) => {
            if(isEqual(item, valueItem)) {
              isConflict = true;
            }
          });
        });

        const classesTimes = value.schedule.map((item, index) => (
            <li key={`classtime-${index}`}>{item.day}, {item.start}-{item.end}</li>
          ));

        const entry = (
            <div key={`pickedcourse-${key}`} className="small-12 columns" style={{ background: isConflict ? '#DC5539' : 'none'}}>
              <div className="row expanded">
                <div className="small-4 columns">
                  <div className={styles.tableItem}>
                    <p className={styles.courseName}>{value.name}</p>
                  </div>
                </div>
                <div className="small-5 columns">
                  <div className={styles.tableItem}>
                    <ul className={styles.time}>
                      {classesTimes}
                    </ul>
                  </div>
                </div>
                <div className="small-2 columns">
                  <div className={styles.tableItem}>
                    <p>{value.sks}</p>
                  </div>
                </div>
                <div className="small-1 columns text-right">
                  <button className={styles.removeButton} onClick={() => this.props.removePicked(key)} style={{ color: isConflict ? 'inherit' : '#DC5539'}}>X</button>
                </div>
              </div>
            </div>
          );
        totalSKS += value.sks;
        pickedItems.push(entry);
      }
    }

    return (
      <div className={styles.buildSchedule}>
        <Helmet
          title="BuildSchedule"
          meta={[
            { name: 'description', content: 'Description of BuildSchedule' },
          ]}
        />
        <div className={styles.agendaModule} style={{ display: this.state.agendaModuleVisibility ? 'block' : 'none' }}>
          <div className={styles.container}>
            <div className={styles.agendaModuleContainer}>
              <div className="row expanded">
                <div className="small-12 columns">
                  <input type="text" placeholder="Nama agenda" value={this.state.agendaModule.name} onChange={(evt) => this.agendaChangeInput('name', evt.target.value)} />
                  <h3 style={{ display: this.state.agendaModule.errMesage.name === '' ? 'none' : 'block'}}>{this.state.agendaModule.errMesage.name}</h3>
                </div>
                <div className="small-12 columns">
                  <select value={this.state.agendaModule.schedule.day} onChange={(evt) => this.agendaChangeInput(['schedule', 'day'], evt.target.value)}>
                    <option value="Senin">Senin</option>
                    <option value="Selasa">Selasa</option>
                    <option value="Rabu">Rabu</option>
                    <option value="Kamis">Kamis</option>
                    <option value="Jumat">Jumat</option>
                    <option value="Sabtu">Sabtu</option>
                  </select>
                  <h3 style={{ display: this.state.agendaModule.errMesage.schedule.day === '' ? 'none' : 'block'}}>{this.state.agendaModule.errMesage.schedule.day}</h3>
                </div>
                <div className="small-12 columns">
                  <input type="text" placeholder="Jam Mulai, format: HH.MM" value={this.state.agendaModule.schedule.start} onChange={(evt) => this.agendaChangeInput(['schedule', 'start'], evt.target.value)} />
                  <h3 style={{ display: this.state.agendaModule.errMesage.schedule.start === '' ? 'none' : 'block'}}>{this.state.agendaModule.errMesage.schedule.start}</h3>
                </div>
                <div className="small-12 columns">
                  <input type="text" placeholder="Jam Selesai, format: HH.MM" value={this.state.agendaModule.schedule.end} onChange={(evt) => this.agendaChangeInput(['schedule', 'end'], evt.target.value)} />
                  <h3 style={{ display: this.state.agendaModule.errMesage.schedule.end === '' ? 'none' : 'block'}}>{this.state.agendaModule.errMesage.schedule.end}</h3>
                </div>
                <div className="small-12 columns">
                  <input type="text" placeholder="Ruangan" value={this.state.agendaModule.schedule.room} onChange={(evt) => this.agendaChangeInput(['schedule', 'room'], evt.target.value)} />
                  <h3 style={{ display: this.state.agendaModule.errMesage.schedule.room === '' ? 'none' : 'block'}}>{this.state.agendaModule.errMesage.schedule.room}</h3>
                </div>
                <div className="small-12 columns text-right">
                  <button className={styles.cancel} onClick={this.finishAddAgenda}>Batal</button>
                  <button className={styles.add} onClick={this.addAgenda}>Tambah</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Header isFixed={true}>
          <button onClick={() => this.props.push('/logout')}>Logout</button>
          <button onClick={() => this.props.push('/jadwal')}>Lihat Jadwal Saya</button>
        </Header>
        <div className="row expanded">
          <div className="small-12 medium-9 columns">
            <div className={styles.scheduleList}>
              <div className="row expanded">
                {scheduleListItems}
              </div>
            </div>
          </div>
          <div className="small-12 medium-3 columns">
            <div className={styles.pickedSchedule}>
              <div className="row expanded">
                <div className="small-12 columns">
                  <div className={styles.pickedScheduleHeader} >Kelas Pilihan</div>
                </div>
                <div className="small-12 columns">
                  <div className={styles.pickedScheduleList}>
                    <div className="row expanded">
                      <div className="small-12 columns">
                        <div className={styles.tableHeader}>
                          <div className="row expanded">
                            <div className="small-4 columns">
                              <div className={styles.tableItem}>
                                <p>Kelas</p>
                              </div>
                            </div>
                            <div className="small-5 columns">
                              <div className={styles.tableItem}>
                                <p>Waktu</p>
                              </div>
                            </div>
                            <div className="small-2 columns">
                              <div className={styles.tableItem}>
                                <p>SKS</p>
                              </div>
                            </div>
                            <div className="small-1 columns text-right">
                              <div className={styles.tableItem}>
                                <p>X</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {pickedItems}
                <div className="small-12 columns">
                  <div className={styles.pickedScheduleList}>
                    <div className="row expanded">
                      <div className="small-12 columns">
                        <div className={styles.tableFooter}>
                          <div className="row expanded">
                            <div className="small-9 columns text-right">
                              <div className={styles.tableItem}>
                                <p>Total SKS</p>
                              </div>
                            </div>
                            <div className="small-3 columns">
                              <div className={styles.tableItem}>
                                <p>{totalSKS}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="small-12 columns" style={{ display: this.props.localState.conflict.length > 0 ? 'block' : 'none' }}>
                        <div className={styles.tableConflict}>
                          <div className="row expanded">
                            <div className="small-12 columns">
                              <div className={styles.tableItem}>
                                <p>Ada Konflik Jadwal, Perbaiki!</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="small-12 columns">
                  <button className={styles.finishButton} onClick={this.showAgenda} >Tambah Agenda</button>
                </div>
                <div className="small-12 columns">
                  <button className={styles.finishButton} onClick={this.props.saveJadwal} disabled={((this.props.localState.conflict.length > 0)) || (totalSKS > 24) || (isEmpty(this.props.localState.picked))}>Simpan Jadwal</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  globalState: selectGlobal(),
  localState: selectBuildSchedule(),
});

function mapDispatchToProps(dispatch) {
  return {
    push: (url) => dispatch(push(url)),
    removePicked: (coursename) => dispatch(removeSelectedClass(coursename)),
    changeSelectedClass: (coursename, payload) => dispatch(changeSelectedClass(coursename, payload)),
    addSelectedClass: (coursename, payload) => dispatch(addSelectedClass(coursename, payload)),
    saveJadwal: () => dispatch(saveJadwal()),
    setLoginData: (majorId, token, userId) => dispatch(setLoginData(majorId, token, userId)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BuildSchedule);
