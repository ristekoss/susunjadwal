import React, { useContext } from "react";
import styled from "styled-components";

import { GlobalContext } from "contexts/GlobalContext";

function CourseClass({ course, courseClass }) {
  const {
    state: { schedules },
    dispatch
  } = useContext(GlobalContext);
  const isActive = schedules.find(
    schedule => schedule.name === courseClass.name
  );

  const handleChange = () => {
    const item = {
      ...courseClass,
      credit: course.credit,
      parentName: course.name,
      term: course.term
    };

    if (isActive) {
      dispatch({ type: "removeSchedule", payload: item });
    } else {
      dispatch({ type: "addSchedule", payload: item });
    }
  };

  const classSchedules = courseClass.schedule_items.map((item, idx) => (
    <span key={idx}>
      - {item.day}, {item.start}-{item.end}
    </span>
  ));
  const rooms = courseClass.schedule_items.map((item, idx) => (
    <span key={idx}>{item.room}</span>
  ));
  const lecturers = courseClass.lecturer.map((lecturer, idx) => (
    <span key={idx}>- {lecturer}</span>
  ));

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

function Course({ course }) {
  console.log(`render course ${course.name}`);
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
