import styled from "styled-components";

export const Card = styled.div`
  width: 90%;
  padding: 40px;
  max-width: 500px;
  margin: 50px auto;
  background: #ffffff;
  border-radius: 3px;
  position: relative;
  text-align: center;
  box-shadow: 0 4px 10px 0 rgba(208, 217, 233, 0.38);

  @media screen and (max-width: 600px) {
    padding: 25px;
  }
`;

export const Button = styled.button`
  border: none;
  outline: none;
  color: #173FCD;
  cursor: pointer;
  font-size: 14px;
  background: none;
  appearance: none;
`