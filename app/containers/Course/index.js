/**
*
* Course
*
*/

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { changeSelectedClass, addSelectedClass, removeSelectedClass } from 'containers/BuildSchedule/actions';
import selectBuildSchedule from 'containers/BuildSchedule/selectors';

import styles from './styles.css';

class Course extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    item: PropTypes.object,
    changeSelectedClass: PropTypes.func,
    addSelectedClass: PropTypes.func,
    removeSelectedClass: PropTypes.func,
    selected: PropTypes.object,
  }

  constructor(props) {
    super(props);
    this.handleOptionChange = this.handleOptionChange.bind(this);
  }

  handleOptionChange(changeEvent) {
    if (this.props.item.classes[changeEvent.target.value].name === this.props.selected[`${this.props.item.name}`]) {
      this.props.removeSelectedClass(this.props.item.name);
    } else {
      this.props.changeSelectedClass(this.props.item.name, `${this.props.item.classes[changeEvent.target.value].name}`);
      this.props.addSelectedClass(this.props.item.name, { "name": `${this.props.item.classes[changeEvent.target.value].name}`, "schedule_items": this.props.item.classes[changeEvent.target.value].schedule_items, "credit": this.props.item.credit });
    }

  }

  render() {
    const item = this.props.item;
    let classes = null;

    if (item.classes) {
      classes = item.classes.map((class_, index) => {
        const classesTimes = class_.schedule_items.map((classTime, classTimeIndex) => (
          <li key={`classtime-${classTimeIndex}`}>{classTime.day}, {classTime.start}-{classTime.end}</li>
        ));
        const classesRooms = class_.schedule_items.map((classRoom, classRoomIndex) => (
          <li key={`classroom-${classRoomIndex}`}>{classRoom.room}</li>
        ));
        const classesLecturers = class_.lecturer.map((classLecturer, classLecturerIndex) => (
          <li key={`classlecturer-${classLecturerIndex}`}>{classLecturer}</li>
        ));
        return (
          <div key={`classes-${index}`} className="small-12 columns">
            <div className="row expanded">
              <div className="small-1 columns">
                <div className={styles.tableItem}>
                  <input type="radio" value={index} checked={this.props.selected[`${this.props.item.name}`] === `${class_.name}`} onChange={this.handleOptionChange} />
                </div>
              </div>
              <div className="small-3 columns">
                <div className={styles.tableItem}>
                  <p>{class_.name}</p>
                </div>
              </div>
              <div className="small-3 columns">
                <div className={styles.tableItem}>
                  <ul className={styles.time}>
                    {classesTimes}
                  </ul>
                </div>
              </div>
              <div className="small-1 columns">
                <div className={styles.tableItem}>
                  <ul className={styles.rooms}>
                    {classesRooms}
                  </ul>
                </div>
              </div>
              <div className="small-4 columns">
                <div className={styles.tableItem}>
                  <ul className={styles.lecturer} >
                    {classesLecturers}
                  </ul>
                </div>
              </div>
            </div>
          </div>)
      });
    }

    return (
      <div className="small-12 columns">
        <div className={styles.course}>
          <h1 className={styles.courseTitle} >{item.name}<span>({item.sks} SKS, Term {item.term})</span></h1>
          <div className={styles.classes}>
            <div className="row expanded">
              <div className="small-12 columns">
                <div className={styles.tableHeader}>
                  <div className="row expanded">
                    <div className="small-1 columns">
                      <div className={styles.tableItem}>
                        <p>Pilih</p>
                      </div>
                    </div>
                    <div className="small-3 columns">
                      <div className={styles.tableItem}>
                        <p>Nama Kelas</p>
                      </div>
                    </div>
                    <div className="small-3 columns">
                      <div className={styles.tableItem}>
                        <p>Waktu</p>
                      </div>
                    </div>
                    <div className="small-1 columns">
                      <div className={styles.tableItem}>
                        <p>Ruang</p>
                      </div>
                    </div>
                    <div className="small-4 columns">
                      <div className={styles.tableItem}>
                        <p>Pengajar</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {classes}
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
    changeSelectedClass: (coursename, payload) => dispatch(changeSelectedClass(coursename, payload)),
    addSelectedClass: (coursename, payload) => dispatch(addSelectedClass(coursename, payload)),
    removeSelectedClass: (coursename) => dispatch(removeSelectedClass(coursename)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Course);
