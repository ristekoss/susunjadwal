import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { addSchedule, removeSchedule } from "redux/modules/schedules";

function CourseClass({ course, courseClass }) {
  const key = `${course.name}-${courseClass.name}`;
  const isActive = useSelector(state => state.courses[key]);
  const dispatch = useDispatch();

  const handleChange = () => {
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

export default CourseClass;
