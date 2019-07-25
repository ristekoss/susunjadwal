import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import Helmet from "react-helmet";

import { getCourses } from "services/api";
import Header from "containers/Header";
import SelectedCourses from "containers/SelectedCourses";
import { setLoading } from "redux/modules/appState";
import { setCourses as reduxSetCourses } from "redux/modules/courses";

import Course from "./Course";

function BuildSchedule({ history }) {
  const auth = useSelector(state => state.auth);
  const isMobile = useSelector(state => state.appState.isMobile);
  const dispatch = useDispatch();

  const [courses, setCourses] = useState(null);

  const fetchCourses = useCallback(
    async majorId => {
      dispatch(setLoading(true));
      const { data } = await getCourses(majorId);
      setCourses(data.courses);
      dispatch(reduxSetCourses(data.courses));
      setTimeout(() => dispatch(setLoading(false)), 1000);
    },
    [dispatch]
  );

  useEffect(() => {
    const majorId = auth.majorId;
    fetchCourses(majorId);
  }, [auth, fetchCourses]);

  return (
    <div>
      <Helmet title="Buat Jadwal" />
      <Container>
        <CoursePickerContainer isMobile={isMobile}>
          <h1>Buat Jadwal</h1>
          {courses &&
            courses.map((course, idx) => (
              <Course key={`${course.name}-${idx}`} course={course} />
            ))}
        </CoursePickerContainer>
        {!isMobile && (
          <SelectedCoursesContainer>
            <SelectedCourses />
          </SelectedCoursesContainer>
        )}
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
  padding: ${({ isMobile }) => (isMobile ? "1rem" : "32px 48px")};
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
