import styled from "styled-components";

export const Card = styled.div`
  padding: 50px;
  border-radius: 10px;
  background: #ffffff;
  text-align: center;
  box-shadow: 0 15px 40px -15px rgba(55, 69, 120, 0.2);

  @media screen and (max-width: 500px) {
    padding: 30px;
  }
`;
