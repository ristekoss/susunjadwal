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

import { changeSelectedClass } from './actions';

export class BuildSchedule extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    courses: PropTypes.array,
    dispatch: PropTypes.func,
    tryFunc: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.tryFunc = this.tryFunc.bind(this);
  }

  tryFunc() {
    this.props.tryFunc();
  }

  render() {
    let scheduleListItems = null;

    if(!isEmpty(this.props.courses)) {
      scheduleListItems = (<List items={this.props.courses} component={Course} />);
    }

    return (
      <div className={styles.buildSchedule}>
        <Helmet
          title="BuildSchedule"
          meta={[
            { name: 'description', content: 'Description of BuildSchedule' },
          ]}
        />
        <Header />
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
                            <div className="small-4 columns">
                              <div className={styles.tableItem}>
                                <p>Waktu</p>
                              </div>
                            </div>
                            <div className="small-2 columns">
                              <div className={styles.tableItem}>
                                <p>SKS</p>
                              </div>
                            </div>
                            <div className="small-2 columns text-right">
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
                <div className="small-12 columns">
                  <div className={styles.pickedScheduleList}>
                    <div className="row expanded">
                      <div className="small-12 columns">
                        <div className={styles.tableFooter}>
                          <div className="row expanded">
                            <div className="small-8 columns text-right">
                              <div className={styles.tableItem}>
                                <p>Total SKS</p>
                              </div>
                            </div>
                            <div className="small-4 columns">
                              <div className={styles.tableItem}>
                                <p>21</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="small-12 columns">
                  <button className={styles.finishButton} onClick={this.tryFunc} >Simpan Jadwal</button>
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
    tryFunc: () => dispatch(changeSelectedClass("Basis Dota","pleb")),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BuildSchedule);
