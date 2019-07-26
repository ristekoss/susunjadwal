import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { getSchedule } from "services/api";
import { makeAtLeastMs } from "utils/promise";
import editIcon from "./baseline-edit-24px.png";
import { setLoading } from "redux/modules/appState";

const BASE_HOUR = 8; // 08:00 AM
const DAYS = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

const pad = val => {
  return `0${val}`.substr(-2);
};

const minuteToDisplay = minute => {
  const hour = Math.floor(minute / 60) + BASE_HOUR;
  return `${pad(hour)}.${pad(minute % 60)}`;
};

const displayToMinute = display => {
  var [hour, minute] = display.split(".").map(part => parseInt(part, 10));
  return (hour - BASE_HOUR) * 60 + minute + 30;
};

const dayToGridColumn = day => DAYS.indexOf(day) + 2;

const TIME_MARKERS = Array(27)
  .fill()
  .map((_, idx) => minuteToDisplay(idx * 30)); // 0800 - 2100;

function ViewSchedule({ match }) {
  const dispatch = useDispatch();
  const [schedule, setSchedule] = useState(null);

  useEffect(() => {
    async function fetchSchedule() {
      dispatch(setLoading(true));
      const {
        data: { user_schedule }
      } = await makeAtLeastMs(getSchedule(match.params.scheduleId), 1000);
      setSchedule(user_schedule);
      dispatch(setLoading(false));
    }
    fetchSchedule();
  }, [match, dispatch]);

  return (
    <div>
      <Helmet
        title="Jadwal"
        meta={[{ name: "description", content: "Description of Jadwal" }]}
      />
      <Header>
        <div>Jam</div>
        {DAYS.map(day => (
          <div>{day}</div>
        ))}
      </Header>
      <Container>
        {TIME_MARKERS.map((marker, idx) => (
          <TimeMarker row={idx} />
        ))}
        {TIME_MARKERS.map((marker, idx) => (
          <TimeLabel row={idx}>{marker}</TimeLabel>
        ))}
        {schedule &&
          schedule.schedule_items.map(({ day, start, end, room, name }) => (
            <Schedule start={start} end={end} day={day}>
              <div>
                {start} - {end}
              </div>
              <div>
                <span>{name}</span>
                <span>{room}</span>
              </div>
            </Schedule>
          ))}
      </Container>
    </div>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: auto repeat(6, calc(90% / 6));
  grid-template-rows: repeat(1680, 1.2px);
  // height: 2016px;
  width: 100%;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  height: 40px;
  background-color: #308077;
  color: white;
  flex-direction: row;

  div {
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(100% / 6);
    &:first-child {
      width: 120px;
    }
  }

  div + div {
    margin-left: 4px;
  }
`;
const TimeLabel = styled.div`
  place-self: center;
  grid-area: ${({ row }) => row * 30 + 15} / 1 /
    ${({ row }) => (row + 1) * 30 + 15} / 1;
`;

const TimeMarker = styled.div`
  grid-area: ${({ row }) => row * 30 + 1} / 1 /
    ${({ row }) => (row + 1) * 30 + 1} / 8;
  border-bottom: 1px solid rgba(48, 128, 119, 0.2);
  z-index: 0;
  padding-left: 30px;
`;

const Schedule = styled.div`
  z-index: 1;
  width: 100%;
  background-color: #308077;
  color: white;
  grid-area: ${({ start }) => displayToMinute(start)} /
    ${({ day }) => dayToGridColumn(day)} / ${({ end }) => displayToMinute(end)} /
    ${({ day }) => dayToGridColumn(day) + 1};

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
