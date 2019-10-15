import { rgba } from "polished";
import styled from "styled-components";
import { Card, Text, theme } from "@advisable/donut";

export const StyledRangeTitle = styled(Text.Styled)`
  color: ${theme.colors.neutral[9]};
  transition: color 200ms;
`;

export const StyledRange = styled(Card.Styled)`
  display: flex;
  padding: 12px;
  cursor: pointer;
  margin-bottom: 12px;
  border-radius: 12px;
  align-items: center;
  transition: transform 300ms, box-shadow 200ms;

  &:hover {
    z-index: 3;
    transform: scale(1.01) translateY(-1px);
    box-shadow: 0 10px 30px -10px ${rgba(theme.colors.neutral[8], 0.2)};

    ${StyledRangeTitle} {
      color: ${theme.colors.blue[5]};
    }
  }
`;

export const StyledRangeIcon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  margin-right: 12px;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  background: ${theme.colors.neutral[1]};
`;
