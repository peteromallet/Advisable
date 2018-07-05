import posed from 'react-pose';
import styled from "styled-components";

export const Container = styled.div`
  top: 0;
  right: 0;
  z-index: 2;
  width: 350px;
  padding: 20px;
  position: fixed;
`;

const NotificationPose = posed.div({
  initial: {
    x: 100,
    y: 0,
    opacity: 0,
  },
  enter: {
    x: 0,
    y: 0,
    opacity: 1
  },
  exit: {
    x: 0,
    y: -20,
    opacity: 0,
  },
})

export const NotificationWrapper = styled(NotificationPose)`
  margin-bottom: 15px;
`

export const NotificationCard = styled.div`
  width: 100%;
  padding: 15px;
  border-radius: 2px;
  background: white;
  box-shadow: 0 5px 10px -5px rgba(6, 24, 51, 0.15),
    0 0 50px 0 rgba(6, 24, 51, 0.15);
`;
