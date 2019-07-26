import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

function Checkout({isMobile}) {
  //TODO: Implement conflict
  const conflict = true;
  //TODO: Account for agenda tambahan
  const schedules = useSelector(state => state.schedules);
  if (isMobile && schedules.length > 0) {
    const totalCredits = schedules.reduce((prev, { credit }) => prev + credit, 0);
    return (
      //TODO: onClick go to apa checkout page
      <CheckoutContainer conflict={conflict}>
        <div>
          <h2>{schedules.length} mata kuliah | {totalCredits} SKS</h2>
          {conflict ? <p>Tidak ada konflik jadwal.</p> : <p>Terdapat jadwal yang bentrok.</p>}
        </div>
        <div>
          {conflict ? <h2>Simpan</h2> : null}
        </div>
      </CheckoutContainer>
    );
  } else {
    return null;
  }
}

const CheckoutContainer = styled.div`
  background: ${props => props.conflict ? "#308077" : "#C74550"};
  color: #ffffff;
  position: fixed;
  justify-content: space-between;
  float: bottom;
  display: flex;
  flex-direction: row;
  height: auto;
  left: 1rem;
  width: calc(100% - 2rem);
  bottom: 1rem;
  align-items: center;
  border-radius: 8px;

  div {
    padding: 8px 16px;
  }

  h2 {
    margin-bottom: 0px;
    font-weight: 700;
    font-size: 16px;
  }

  p {
    margin-bottom: 0px;
    font-size: 16px;
  }
`;

export default Checkout;
