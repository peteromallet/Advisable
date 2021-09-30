import styled from "styled-components";
import { Box, theme } from "@advisable/donut";

export const StyledNotificationsButton = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  outline: none;
  position: relative;
  border-radius: 16px;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.neutral600};

  &:hover {
    color: ${theme.colors.neutral900};
    background: ${theme.colors.neutral100};
  }
`;

export const NotificationItem = styled(Box)`
  display: flex;
  min-width: 0;
  width: 100%;
  flex-wrap: wrap;
  align-items: center;
`;

export const StyledNotificationBadge = styled.div`
  top: 0px;
  right: 0px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  position: absolute;
  border: 2px solid white;
  background: ${theme.colors.red400};
`;
