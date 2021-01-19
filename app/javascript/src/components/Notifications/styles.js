import styled from "styled-components";
import { variant } from "styled-system";
import { theme } from "@advisable/donut";

const notificationType = variant({
  prop: "$variant",
  variants: {
    default: {
      background: theme.colors.neutral900,
    },
    error: {
      background: theme.colors.red600,
    },
  },
});

export const Container = styled.div`
  right: 0;
  left: 0;
  bottom: 0;
  margin: 0 auto;
  z-index: 100;
  position: fixed;
  max-width: 320px;

  @media (max-width: 500px) {
    width: 70%;
    margin-left: 12px;
  }
`;

export const NotificationCard = styled.div`
  ${notificationType};

  width: 100%;
  padding: 12px 16px;
  color: white;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  border-radius: 8px;
  box-shadow: 0 5px 10px -5px rgba(6, 24, 51, 0.15),
    0 0 50px 0 rgba(6, 24, 51, 0.15);

  &:last-child {
    margin-bottom: 20px;
  }
`;
