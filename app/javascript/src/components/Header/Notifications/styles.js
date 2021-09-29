import styled from "styled-components";
import { Box } from "@advisable/donut";

export const StyledNotificationsButton = styled.div`
  width: 32px;
  height: 32px;
  color: white;
  display: flex;
  border-radius: 12px;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
`;

export const NotificationItem = styled(Box)`
  display: flex;
  min-width: 0;
  width: 100%;
  flex-wrap: wrap;
  align-items: center;
`;
