import styled from "styled-components";

const intentStyle = {
  primary: {
    backgroundColor: "#ce9d4d",
    color: "white"
  },
  secondary: {
    backgroundColor: "#0000",
    color: "#ce9d4d"
  }
};

const Button = styled.button`
  height: 32px;
  background-color: ${({ intent }) =>
    intentStyle[intent || "primary"].backgroundColor};
  border: 2px solid #ce9d4d;
  padding: 8px 16px;
  color: ${({ intent }) => intentStyle[intent || "primary"].color};
  font-weight: bold;

  &:hover {
    background-color: #ce9d4d;
    color: white;
  }

  width: ${({ width }) => (width ? `${width}px` : "100%")};
  text-transform: uppercase;
  transition: 0.25s background ease;
`;

export default Button;
