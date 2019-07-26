import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

import { getSchedules } from "services/api";
import { setLoading } from "redux/modules/appState";
import { makeAtLeastMs } from "utils/promise";
import Schedule from "containers/ViewSchedule/Schedule";
import clipboardImg from "./clipboard.svg";

function Jadwal({ history }) {
  const auth = useSelector(state => state.auth);
  const isMobile = useSelector(state => state.appState.isMobile);

  const dispatch = useDispatch();

  const [schedules, setSchedules] = useState();

  useEffect(() => {
    const fetchSchedules = async () => {
      dispatch(setLoading(true));
      const {
        data: { user_schedules }
      } = await makeAtLeastMs(getSchedules(auth.userId), 1000);
      setSchedules(user_schedules);
      dispatch(setLoading(false));
    };

    fetchSchedules();
  }, [dispatch, auth]);

  return (
    <div>
      <Helmet
        title="Jadwal"
        meta={[{ name: "description", content: "Description of Jadwal" }]}
      />
      <PageTitle mobile={isMobile}>Riwayat Jadwal</PageTitle>
      <CardContainer>
        {schedules &&
          schedules.map(schedule => (
            <Card onClick={() => history.push(`/jadwal/${schedule.id}`)}>
              <div className="header">
                <Link to={`/jadwal/${schedule.id}`}>
                  <h2>{schedule.name || "Undefined"}</h2>
                </Link>
                <div>
                  <ImageButton src={clipboardImg} />
                  <ImageButton src={clipboardImg} />
                </div>
              </div>
              <Schedule
                startHour={8}
                endHour={21}
                schedule={schedule}
                pxPerMinute={isMobile ? 0.3 : 0.7}
                width="100%"
                showRoom
                mobile={isMobile}
              />
            </Card>
          ))}
      </CardContainer>
    </div>
  );
}

const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin: ${({ mobile }) => (mobile ? "1rem" : "32px 48px 16px 48px")};
`;

const Card = styled.div`
  border: 0.05rem solid rgba(48, 128, 119, 0.5);
  border-radius: 4;
  cursor: pointer;

  .header {
    padding: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  ${props =>
    props.theme.mobile
      ? "margin: 1rem;"
      : css`
          width: 49%;
          &:nth-child(even) {
            margin-left: 2%;
          }
        `}
  margin-bottom: 32px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  flex-direction: ${props => (props.theme.mobile ? "column" : "row")};
  padding: ${props => (props.theme.mobile ? "1rem" : "0 48px")};
`;

const ImageButton = styled.button`
  background: url(${({ src }) => src}) no-repeat;
  cursor: pointer;
  height: 24px;
  width: 24px;
  border: none;

  & + & {
    margin-left: 8px;
  }
`;
export default Jadwal;
