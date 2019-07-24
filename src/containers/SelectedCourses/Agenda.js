import React, { useState, useContext } from "react";
import styled from "styled-components";

import { GlobalContext } from "contexts/GlobalContext";
import Button from "components/Button";

function Agenda({ visible, onClose }) {
  const { dispatch } = useContext(GlobalContext);

  const [name, setName] = useState("");
  const [day, setDay] = useState("Senin");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [room, setRoom] = useState("");
  const [error, setError] = useState({});

  function addAgenda() {
    dispatch({
      type: "addSchedule",
      payload: {
        parentName: `__agenda-${name}`,
        name,
        credit: 0,
        schedule_items: [{ start, end, room, day }]
      }
    });
    onClose();
  }

  return (
    <Container visible={visible}>
      <FormContainer>
        <h1>Tambah Agenda</h1>
        <input
          type="text"
          placeholder="Nama Agenda"
          value={name}
          onChange={evt => setName(evt.target.value)}
        />
        <select value={day} onChange={evt => setDay(evt.target.value)}>
          <option value="Senin">Senin</option>
          <option value="Selasa">Selasa</option>
          <option value="Rabu">Rabu</option>
          <option value="Kamis">Kamis</option>
          <option value="Jumat">Jumat</option>
          <option value="Sabtu">Sabtu</option>
        </select>
        <input
          type="text"
          placeholder="Jam Mulai, format: HH.MM"
          value={start}
          onChange={evt => setStart(evt.target.value)}
          pattern="\d\d.\d\d"
        />
        <input
          type="text"
          placeholder="Jam Selesai, format: HH.MM"
          value={end}
          onChange={evt => setEnd(evt.target.value)}
        />
        <input
          type="text"
          placeholder="Ruangan"
          value={room}
          onChange={evt => setRoom(evt.target.value)}
        />
        <div>
          <Button width="100px" onClick={onClose} intent="secondary">
            BATAL
          </Button>
          <Button width="100px" onClick={addAgenda}>
            SIMPAN
          </Button>
        </div>
      </FormContainer>
    </Container>
  );
}

export default Agenda;

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 1001;
  background: rgba(0, 0, 0, 0.5);
  display: ${({ visible }) => (visible ? "block" : "none")};
`;

const FormContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 600px;
  max-height: 100%;
  background: #fff;
  padding: 2rem;

  display: flex;
  align-items: center;
  flex-direction: column;

  color: black;

  h1 {
    font-size: 16px;
    color: black;
    font-weight: bold;
    text-transform: uppercase;
  }

  div {
    display: flex;
    justify-content: flex-end;
    width: 100%;

    button + button {
      margin-left: 16px;
    }
  }

  input,
  select {
    background-color: white;
    width: 100%;
    padding: 8px 16px;
    border: none;
    border-bottom: 2px solid #ce9d4d;
    height: 40px;
    margin-bottom: 16px;
  }
`;
