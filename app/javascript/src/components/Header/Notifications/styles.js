import styled from "styled-components";
import { Box, theme } from "@advisable/donut";

export const StyledNotificationsButton = styled.div`
  width: 32px;
  height: 32px;
  color: ${theme.colors.neutral500};
  display: flex;
  outline: none;
  border-radius: 16px;
  align-items: center;
  justify-content: center;

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
