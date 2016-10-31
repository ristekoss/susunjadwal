/*
 *
 * BuildSchedule
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { isEmpty } from 'lodash';
import selectBuildSchedule from './selectors';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles.css';

import Header from 'components/Header';
import List from 'components/List';
import Course from 'containers/Course';

import { changeSelectedClass, removeSelectedClass } from './actions';

export class BuildSchedule extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    courses: PropTypes.array,
    picked: PropTypes.object,
    dispatch: PropTypes.func,
    removePicked: PropTypes.func,
  };

  render() {
    let scheduleListItems = null;
    let pickedItems = [];
    let totalSKS = 0

    if(!isEmpty(this.props.courses)) {
      scheduleListItems = (<List items={this.props.courses} component={Course} />);
    }

    if(!isEmpty(this.props.picked)) {
      for(let [key, value] of Object.entries(this.props.picked)) {
        const classesTimes = value.schedule.map((item, index) => (
            <li key={`classtime-${index}`}>{item.day}, {item.start}-{item.end}</li>
          ));
        const entry = (
            <div key={`pickedcourse-${key}`} className="small-12 columns">
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
                  <button className={styles.removeButton} onClick={() => this.props.removePicked(key)}>X</button>
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
        <Header isFixed={true} />
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
                    </div>
                  </div>
                </div>

                <div className="small-12 columns">
                  <button className={styles.finishButton}>Tambah Agenda</button>
                </div>

                <div className="small-12 columns">
                  <button className={styles.finishButton}>Simpan Jadwal</button>
                </div>

                <div className="small-12 columns">
                  <button className={styles.finishButton}>Lihat Jadwal</button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = selectBuildSchedule();

function mapDispatchToProps(dispatch) {
  return {
    removePicked: (coursename) => dispatch(removeSelectedClass(coursename)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BuildSchedule);
