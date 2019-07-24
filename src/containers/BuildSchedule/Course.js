import React, { useCallback, useMemo } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { addSchedule, removeSchedule } from "redux/modules/schedules";

const whyDidYouRender = require("@welldone-software/why-did-you-render");

whyDidYouRender(React);

function CourseClass({ course, courseClass }) {
  const key = `${course.name}-${courseClass.name}`;
  const isActive = useSelector(state => state.courses[key]);
  const dispatch = useDispatch();
  console.log(`render course ${course.name} ${courseClass}`);
  const handleChange = useCallback(() => {
    const item = {
      ...courseClass,
      credit: course.credit,
      parentName: course.name,
      term: course.term
    };

    if (isActive) {
      dispatch(removeSchedule(item));
    } else {
      dispatch(addSchedule(item));
    }
  }, [dispatch, course, courseClass, isActive]);

  const classSchedules = useMemo(
    () =>
      courseClass.schedule_items.map((item, idx) => (
        <span key={idx}>
          - {item.day}, {item.start}-{item.end}
        </span>
      )),
    [courseClass]
  );

  const rooms = useMemo(
    () =>
      courseClass.schedule_items.map((item, idx) => (
        <span key={idx}>{item.room}</span>
      )),
    [courseClass]
  );

  const lecturers = useMemo(
    () =>
      courseClass.lecturer.map((lecturer, idx) => (
        <span key={idx}>- {lecturer}</span>
      )),
    [courseClass]
  );

  return (
    <CourseClassContainer onClick={handleChange}>
      <CourseClassItem flex={1}>
        <Radio active={isActive} />
      </CourseClassItem>
      <CourseClassItem flex={3}>{courseClass.name}</CourseClassItem>
      <CourseClassItem flex={3}>{classSchedules}</CourseClassItem>
      <CourseClassItem flex={1}>{rooms}</CourseClassItem>
      <CourseClassItem flex={4}>{lecturers}</CourseClassItem>
    </CourseClassContainer>
  );
}

// CourseClass.whyDidYouRender = {
//   logOnDifferentValues: true,
//   customName: "EnhancedMenu"
// };

function Course({ course }) {
  return (
    <div>
      <CourseTitle>
        {course.name}
        <span>
          ({course.credit} SKS, Term {course.term})
        </span>
      </CourseTitle>
      <CourseContainer>
        <Header>
          <HeaderItem flex={1}>Pilih</HeaderItem>
          <HeaderItem flex={3}>Nama Kelas</HeaderItem>
          <HeaderItem flex={3}>Waktu</HeaderItem>
          <HeaderItem flex={1}>Ruang</HeaderItem>
          <HeaderItem flex={4}>Pengajar</HeaderItem>
        </Header>
        {course.classes.map(currentClass => (
          <CourseClass
            key={currentClass.name}
            course={course}
            courseClass={currentClass}
          />
        ))}
      </CourseContainer>
    </div>
  );
}

const CourseContainer = styled.div`
  border: 2px solid #308077;
  margin-bottom: 32px;
`;

const Header = styled.div`
  background-color: #308077;
  font-family: Proxima Nova;
  font-weight: 400;
  color: white;
  display: flex;
`;

const HeaderItem = styled.div`
  flex: ${({ flex }) => flex};
  font-size: 16px;
  padding: 12px;
`;

const CourseClassContainer = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;

  &:hover {
    background-color: rgba(48, 128, 119, 0.1);
  }
`;

const CourseClassItem = styled.div`
  flex: ${({ flex }) => flex};
  padding: 12px;
  display: flex;
  flex-direction: column;
`;

const CourseTitle = styled.h2`
  font-size: 1.5rem;
  color: #ce9d4d;
  font-weight: bold;

  span {
    margin-left: 0.5rem;
    font-size: 1rem;
    color: #222;
    font-weight: 400;
  }
`;

const Radio = styled.div`
  border: 2px solid #308077;
  height: 24px;
  width: 24px;

  &:before {
    content: "";
    display: block;
    background-color: ${({ active }) => (active ? "#308077" : "#0000")};
    margin: 4px;
    width: 12px;
    height: 12px;
  }
`;
export default Course;
