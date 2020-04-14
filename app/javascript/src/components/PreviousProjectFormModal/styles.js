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

export const StyledDialogContent = styled.div`
  height: 100%;
  overflow-y: scroll;
`;

export const StyledPreviousProjectFormHeader = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  display: flex;
  padding: 0 20px;
  position: absolute;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 6px ${rgba(theme.colors.neutral800, 0.2)};
`;

export const StyledClosePreviousProjectFormButton = styled.button`
  border: none;
  cursor: pointer;
  font-size: 16px;
  appearance: none;
  background: transparent;
  color: ${theme.colors.blue600};
  font-family: "Poppins", sans-serif;

  &:hover {
    color: ${theme.colors.blue700};
  }
`;
