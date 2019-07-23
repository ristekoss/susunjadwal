import React, { useContext, useEffect, useState, useCallback } from "react";
import Helmet from "react-helmet";
import { getCourses } from "api";
import Header from "components/Header";
import SelectedCourses from "containers/SelectedCourses";
import Course from "./Course";
import GlobalContext from "contexts/GlobalContext";

import "./styles.css";

function BuildSchedule({ history }) {
  const { auth, setLoading } = useContext(GlobalContext);
  const [courses, setCourses] = useState(null);

  const fetchCourses = useCallback(
    async majorId => {
      setLoading(true);
      const { data } = await getCourses(majorId);
      setCourses(data.courses);
      setTimeout(() => setLoading(false), 1000);
    },
    [setLoading]
  );

  useEffect(() => {
    const majorId = auth.majorId;
    fetchCourses(majorId);
  }, [auth, fetchCourses]);

  return (
    <div className="buildSchedule">
      <Helmet title="Buat Jadwal" />
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
              {courses &&
                courses.map(course => (
                  <Course key={course.name} course={course} />
                ))}
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
