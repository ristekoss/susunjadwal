import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import Helmet from "react-helmet";

import { getCourses } from "services/api";
import Header from "components/Header";
import SelectedCourses from "containers/SelectedCourses";
import { setLoading } from "redux/modules/loading";

import Course from "./Course";

function BuildSchedule({ history }) {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const [courses, setCourses] = useState(null);

  const fetchCourses = useCallback(
    async majorId => {
      dispatch(setLoading(true));
      const { data } = await getCourses(majorId);
      setCourses(data.courses);
      setTimeout(() => dispatch(setLoading(false)), 1000);
    },
    [dispatch]
  );

  useEffect(() => {
    const majorId = auth.majorId;
    fetchCourses(majorId);
  }, [auth, fetchCourses]);

  console.log("render");
  return (
    <div>
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
      <Container>
        <CoursePickerContainer>
          <h1>Buat Jadwal</h1>
          {courses &&
            courses.map((course, idx) => (
              <Course key={`${course.name}-${idx}`} course={course} />
            ))}
        </CoursePickerContainer>
        <SelectedCoursesContainer>
          <SelectedCourses />
        </SelectedCoursesContainer>
      </Container>
    </div>
  );
}

export default BuildSchedule;

const Container = styled.div`
  padding-top: 64px;
  display: flex;
`;
const CoursePickerContainer = styled.div`
  padding: 32px 48px;
  flex: 9;

  h1 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 16px;
  }
`;

const SelectedCoursesContainer = styled.div`
  flex: 3;
  padding: 48px 32px;
  background-color: #222222;
`;
