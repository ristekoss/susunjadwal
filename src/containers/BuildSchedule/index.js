import React, { useContext, useEffect, useState } from "react";
import Helmet from "react-helmet";
import { getCourses } from "api";
import Header from "components/Header";
import Loading from "components/Loading";
import SelectedCourses from "containers/SelectedCourses";
import Course from "./Course";
import GlobalContext from "contexts/GlobalContext";

import "./styles.css";

function BuildSchedule({ history }) {
  const { auth } = useContext(GlobalContext);
  const [courses, setCourses] = useState(null);
  const [isLoading, setLoading] = useState(true);

  const fetchCourses = async majorId => {
    const { data } = await getCourses(majorId);
    setCourses(data.courses);
    setTimeout(() => setLoading(false), 1000);
  };

  useEffect(() => {
    const majorId = auth.majorId;
    fetchCourses(majorId);
  }, [auth]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="buildSchedule">
      <Helmet title="Buat Jadwal" />
      {/* <div
          className="agendaModule"
          style={{
            display: this.state.agendaModuleVisibility ? "block" : "none"
          }}
        >
          <div className="container">
            <div className="agendaModuleContainer">
              <div className="row expanded">
                <div className="small-12 columns">
                  <center style={{ fontWeight: 700 }}>TAMBAH AGENDA</center>
                </div>
                <div className="small-12 columns">
                  <input
                    type="text"
                    placeholder="Nama Agenda"
                    value={this.state.agendaModule.name}
                    onChange={evt =>
                      this.agendaChangeInput("name", evt.target.value)
                    }
                  />
                  <h3
                    style={{
                      display:
                        this.state.agendaModule.errMesage.name === ""
                          ? "none"
                          : "block"
                    }}
                  >
                    {this.state.agendaModule.errMesage.name}
                  </h3>
                </div>
                <div className="small-12 columns">
                  <select
                    value={this.state.agendaModule.schedule.day}
                    onChange={evt =>
                      this.agendaChangeInput(
                        ["schedule", "day"],
                        evt.target.value
                      )
                    }
                  >
                    <option value="Senin">Senin</option>
                    <option value="Selasa">Selasa</option>
                    <option value="Rabu">Rabu</option>
                    <option value="Kamis">Kamis</option>
                    <option value="Jumat">Jumat</option>
                    <option value="Sabtu">Sabtu</option>
                  </select>
                  <h3
                    style={{
                      display:
                        this.state.agendaModule.errMesage.schedule.day === ""
                          ? "none"
                          : "block"
                    }}
                  >
                    {this.state.agendaModule.errMesage.schedule.day}
                  </h3>
                </div>
                <div className="small-12 columns">
                  <input
                    type="text"
                    placeholder="Jam Mulai, format: HH.MM"
                    value={this.state.agendaModule.schedule.start}
                    onChange={evt =>
                      this.agendaChangeInput(
                        ["schedule", "start"],
                        evt.target.value
                      )
                    }
                  />
                  <h3
                    style={{
                      display:
                        this.state.agendaModule.errMesage.schedule.start === ""
                          ? "none"
                          : "block"
                    }}
                  >
                    {this.state.agendaModule.errMesage.schedule.start}
                  </h3>
                </div>
                <div className="small-12 columns">
                  <input
                    type="text"
                    placeholder="Jam Selesai, format: HH.MM"
                    value={this.state.agendaModule.schedule.end}
                    onChange={evt =>
                      this.agendaChangeInput(
                        ["schedule", "end"],
                        evt.target.value
                      )
                    }
                  />
                  <h3
                    style={{
                      display:
                        this.state.agendaModule.errMesage.schedule.end === ""
                          ? "none"
                          : "block"
                    }}
                  >
                    {this.state.agendaModule.errMesage.schedule.end}
                  </h3>
                </div>
                <div className="small-12 columns">
                  <input
                    type="text"
                    placeholder="Ruangan"
                    value={this.state.agendaModule.schedule.room}
                    onChange={evt =>
                      this.agendaChangeInput(
                        ["schedule", "room"],
                        evt.target.value
                      )
                    }
                  />
                  <h3
                    style={{
                      display:
                        this.state.agendaModule.errMesage.schedule.room === ""
                          ? "none"
                          : "block"
                    }}
                  >
                    {this.state.agendaModule.errMesage.schedule.room}
                  </h3>
                </div>
                <div className="small-12 columns text-right">
                  <button className="cancel" onClick={this.finishAddAgenda}>
                    BATAL
                  </button>
                  <button className="add" onClick={this.addAgenda}>
                    SIMPAN
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      <Header isFixed={true}>
        <button className="buttonLink" onClick={() => history.push("/logout")}>
          Logout
        </button>
        <button onClick={() => history.push("/susun")}>Buat Jadwal</button>
        <button className="buttonLink" onClick={() => history.push("/jadwal")}>
          Riwayat Jadwal
        </button>
      </Header>
      <div className="row expanded">
        <div className="small-12 medium-9 columns">
          <div className="scheduleList">
            <div className="pageTitle">
              <p>Buat Jadwal</p>
            </div>
            <div className="row expanded">
              {courses && courses.map(course => <Course course={course} />)}
            </div>
          </div>
        </div>
        <div className="small-12 medium-3 columns">
          <div className="pickedSchedule">
            <SelectedCourses />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuildSchedule;
