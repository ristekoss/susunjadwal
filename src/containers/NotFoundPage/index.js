import React from "react";
import styled from "styled-components";

export default class NotFound extends React.Component {
  render() {
    return (
      <Container>
        <h1>Uh oh, it seems that you followed a wrong link :(</h1>
      </Container>
    );
  }
}

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
