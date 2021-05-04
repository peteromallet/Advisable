import styled from "styled-components";
import { Card, Box } from "@advisable/donut";

export const StyledLineClamp = styled(Box)`
  display: -webkit-box;
  -webkit-line-clamp: ${({ lines }) => lines || 2};
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const StyledEventCard = styled(Card)`
  cursor: pointer;
  transition: box-shadow 400ms;

  &:hover {
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1),
      0 12px 24px -12px rgba(0, 0, 0, 0.1);
  }
`;
