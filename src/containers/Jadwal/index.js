import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

import { getSchedules } from "services/api";
import { setLoading } from "redux/modules/appState";
import { makeAtLeastMs } from "utils/promise";

import Button from "components/Button";
import clipboardImg from "./clipboard.svg";
import deleteImg from "./baseline-delete-24px.png";

function Jadwal() {
  const auth = useSelector(state => state.auth);
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
      <PageTitle>Riwayat Jadwal</PageTitle>
      <Header>
        <div>Nama</div>
        <div>Tanggal Dibuat</div>
        <div>Aksi</div>
      </Header>
      {schedules &&
        schedules.map(schedule => (
          <Item>
            <div>
              <Link to={`/jadwal/${schedule.id}`}>
                {schedule.name || "Untitled Schedule"}
              </Link>
            </div>
            <div>{schedule.created_at}</div>
            <div>
              <Button>Salin</Button>
              <Button>Hapus</Button>
            </div>
          </Item>
        ))}
    </div>
  );
}

const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 32px 48px 16px 48px;
`;

const ItemStyle = css`
  padding: 0 48px;

  div {
    font-size: 16px;
    padding: 12px 0;

    &:nth-child(1) {
      flex: 5;
    }

    &:nth-child(2) {
      flex: 4;
    }

    &:nth-child(3) {
      flex: 3;
    }
  }
`;

const Header = styled.div`
  background-color: #308077;
  font-family: Proxima Nova;
  font-weight: 400;
  color: white;
  display: flex;

  ${ItemStyle}
`;

const Item = styled.div`
  border-bottom: 0.05rem solid rgba(48, 128, 119, 0.5);
  display: flex;
  flex-shrink: 0;
  ${ItemStyle}
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
