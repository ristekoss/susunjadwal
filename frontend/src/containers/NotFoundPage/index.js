import React from "react";
import styled from "styled-components";

export default class NotFound extends React.Component {
  render() {
    return (
      <Container>
        <NotFoundTitle>Uh oh, sepertinya kamu tersesat :(</NotFoundTitle>
      </Container>
    );
  }
}

const NotFoundTitle = styled.div`
<<<<<<< HEAD
  font-size: 2rem;
  color: black;
=======
  color: white;
>>>>>>> 04437221180ed84ad14207a62496eadf3b2df143
  margin: 1rem;
  font-size: 2rem;
  font-weight: 700;
  color: ${(props) => props.theme.color.primaryPurple};
`;

const Container = styled.div`
  height: calc(100vh - 140px - 1rem);
  width: 100%;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
`;
