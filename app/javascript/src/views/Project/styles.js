import { rgba } from "polished";
import styled from "styled-components";
import { StyledCard, theme } from "@advisable/donut";

export const Card = styled(StyledCard)`
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0px 4px 12px -4px ${rgba(theme.colors.neutral900, 0.04)},
    0px 4px 20px -4px ${rgba(theme.colors.neutral900, 0.08)};
`;
