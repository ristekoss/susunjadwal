import React from "react";
import styled, { css } from "styled-components";

const DAYS = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

const pad = val => {
  return `0${val}`.substr(-2);
};

function Schedule({
  startHour,
  endHour,
  schedule,
  pxPerMinute,
  width,
  showLabel,
  showHeader,
  mobile
}) {
  const rowToDisplay = minute => {
    const hour = Math.floor(minute / 60) + startHour;
    return `${pad(hour)}.${pad(minute % 60)}`;
  };

  const displayToRinute = display => {
    var [hour, minute] = display.split(".").map(part => parseInt(part, 10));
    return (hour - startHour + 2) * 60 + minute;
  };

  const dayToColumn = day => DAYS.indexOf(day) + 1 + (showLabel ? 1 : 0);

  const TIME_MARKERS = Array(endHour - startHour + 1)
    .fill()
    .map((_, idx) => rowToDisplay(idx * 60));

  const renderHeader = () => (
    <React.Fragment>
      {showLabel && (
        <Header mobile={mobile}>
          <span>Jam</span>
        </Header>
      )}
      {DAYS.map(day => (
        <Header mobile={mobile}>
          <span>{day}</span>
        </Header>
      ))}
    </React.Fragment>
  );

  return (
    <Container pxPerMinute={pxPerMinute} width={width} showLabel={showLabel}>
      {showHeader && renderHeader()}
      {TIME_MARKERS.map((_, idx) => (
        <TimeMarker row={idx} showLabel={showLabel} />
      ))}
      {showLabel &&
        TIME_MARKERS.map((marker, idx) => (
          <TimeLabel row={idx} mobile={mobile}>
            {marker}
          </TimeLabel>
        ))}
      {schedule &&
        schedule.schedule_items.map(({ day, start, end, room, name }) => (
          <ScheduleItem
            start={displayToRinute(start)}
            end={displayToRinute(end)}
            day={dayToColumn(day)}
            mobile={mobile}
          >
            {!mobile && (
              <div className="header">
                <span>
                  {start} - {end}
                </span>
                <span>{room}</span>
              </div>
            )}
            <div className="content">
              <span>{name}</span>
              {mobile && <span>{room}</span>}
            </div>
          </ScheduleItem>
        ))}
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: ${({ showLabel }) => (showLabel ? "auto" : "")} repeat(
      6,
      calc(${({ showLabel }) => (showLabel ? "90%" : "100%")} / 6)
    );
  grid-template-rows: repeat(930, ${({ pxPerMinute }) => pxPerMinute}px);
  width: ${({ width }) => width};
`;

const TimeLabel = styled.div`
  place-self: center;
  grid-area: ${({ row }) => (row + 1) * 60 + 30} / 1 /
    ${({ row }) => (row + 2) * 60 + 30} / 1;

  font-size: ${mobile => (mobile ? "12px" : "14px")};
`;

const TimeMarker = styled.div`
  grid-area: ${({ row }) => (row + 1) * 60} /
    ${({ showLabel }) => (showLabel ? "2" : "1")} /
    ${({ row }) => (row + 2) * 60 + 1} /
    ${({ showLabel }) => (showLabel ? "8" : "7")};
  border: 1px solid rgba(48, 128, 119, 0.2);
  border-left: none;
  border-top: none;
  z-index: 0;
  padding-left: 30px;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #308077;
  color: white;
  flex-direction: row;
  grid-row: 1 / 60;
  z-index: 2;

  font-size: ${mobile => (mobile ? "12px" : "14px")};
`;

const ScheduleItem = styled.div`
  z-index: 1;
  width: 95%
  background-color: #308077;
  color: white;
  grid-area: ${({ start }) => start} /
    ${({ day }) => day} / ${({ end }) => end} /
    ${({ day }) => day + 1};

  .header {
    padding: 0 4px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    border-bottom: 1px solid #fff;
 }

  .content {
    padding: 2px 4px;
    font-weight: ${({ mobile }) => (mobile ? "bold" : "bold")};
    ${({ mobile }) => css`
      display: flex;
      flex-direction: column;

      span {
        &:last-child {
          font-weight: 400;
        }
      }
    `}

    font-size: ${({ mobile }) => (mobile ? "10px" : "14px")};
  }
`;

export default Schedule;
