/*
 *
 * JadwalSpesifik
 *
 */

import React from "react";
import Helmet from "react-helmet";
import styled from "styled-components";

import "./styles.css";
import editIcon from "./baseline-edit-24px.png";

const BASE_HOUR = 8; // 08:00 AM

const pad = val => {
  return `0${val}`.substr(-2);
};

const minuteToDisplay = minute => {
  const hour = Math.floor(minute / 60) + BASE_HOUR;
  return `${pad(hour)}.${pad(minute % 60)}`;
};

const displayToMinute = display => {
  var [hour, minute] = display.split(".").map(part => parseInt(part, 10));
  return hour * 60 + minute - BASE_HOUR * 60;
};

const TIME_MARKERS = Array(27)
  .fill()
  .map((_, idx) => minuteToDisplay(idx * 30)); // 0800 - 2100;

function ViewSchedule() {
  return (
    <div>
      <Helmet
        title="Jadwal"
        meta={[{ name: "description", content: "Description of Jadwal" }]}
      />
      test
      <Container>
        {TIME_MARKERS.map((marker, idx) => (
          <TimeMarker row={idx}>{marker}</TimeMarker>
        ))}
        <Schedule>
          <div>12:00 - 13:00</div>
          <div>
            <span>Aljabar Linear</span>
            <span>2.2302</span>
          </div>
        </Schedule>
      </Container>
    </div>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 120px repeat(6, calc(100% / 6));
  grid-template-rows: repeat(1890, 1px);
  height: 1890px;
  width: 100%;
`;

const TimeMarker = styled.div`
  grid-area: ${({ row }) => row * 30 + row * 5 + 1} / 1 /
    ${({ row }) => (row + 1) * 30 + row * 5 + 1} / 7;
  border-bottom: 1px solid rgba(48, 128, 119, 0.2);
  z-index: 0;
  padding-left: 30px;
`;

const Schedule = styled.div`
  z-index: 1;
  width: 100%;
  background-color: #308077;
  color: white;
  grid-area: 1 / 2 / 120 / 2;
  div {
    padding: 4px;
    &:first-child {
      font-size: 12px;
      border-bottom: 0.1rem solid #fff;
    }

    &:last-child {
      display: flex;
      flex-direction: column;

      span:first-child {
        font-size: 16px;
        font-weight: bold;
      }
      span:last-child {
        font-size: 12px;
        margin-top: -6px;
      }
    }
  }
`;
export default ViewSchedule;
