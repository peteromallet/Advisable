import styled from "styled-components";

export const Container = styled.div`
  right: 0;
  bottom: 0;
  z-index: 100;
  position: fixed;
  max-width: 350px;

  @media (max-width: 500px) {
    width: 100%;
  }
`;

export const NotificationCard = styled.div`
  width: 320px;
  padding: 20px;
  color: white;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  margin-right: 20px;
  border-radius: 4px;
  background: #00104b;
  box-shadow: 0 5px 10px -5px rgba(6, 24, 51, 0.15),
    0 0 50px 0 rgba(6, 24, 51, 0.15);

  &:last-child {
    margin-bottom: 20px;
  }
`;
