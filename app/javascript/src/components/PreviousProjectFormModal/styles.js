import { rgba } from "polished";
import styled from "styled-components";
import { theme } from "@advisable/donut";

export const StyledDialog = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 20;
  position: fixed;
  background: white;
  padding-top: 60px;
`;

export const StyledPreviousProjectFormHeader = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  position: absolute;
  box-shadow: 0 2px 6px ${rgba(theme.colors.neutral800, 0.2)};
`;
