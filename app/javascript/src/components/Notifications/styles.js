import posed from "react-pose";
import styled from "styled-components";

export const Container = styled.div`
  top: 0;
  right: 0;
  z-index: 10;
  width: 350px;
  padding: 20px;
  position: fixed;

  @media (max-width: 500px) {
    width: 100%;
  }
`;

const NotificationPose = posed.div({
  initial: {
    x: 100,
    y: 0,
    opacity: 0
  },
  enter: {
    x: 0,
    y: 0,
    opacity: 1
  },
  exit: {
    x: 0,
    y: -20,
    opacity: 0
  }
});

export const NotificationWrapper = styled(NotificationPose)`
  margin-bottom: 15px;
`;

export const NotificationCard = styled.div`
  width: 100%;
  padding: 20px;
  color: white;
  font-size: 15px;
  font-weight: 500;
  border-radius: 4px;
  background: #173fcd;
  box-shadow: 0 5px 10px -5px rgba(6, 24, 51, 0.15),
    0 0 50px 0 rgba(6, 24, 51, 0.15);
`;
