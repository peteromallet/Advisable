import styled from "styled-components";
import { theme } from "@advisable/donut";

export const StyledTilesInputOption = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;

  align-items: center;
  border: none;
  padding: 12px 4px;
  min-height: 48px;
  outline: none;
  font-size: 14px;
  cursor: pointer;
  font-weight: 500;
  appearance: none;
  border-radius: 12px;
  color: ${theme.colors.neutral500};
  background: #eff0f3;
  box-shadow: inset 0px 0px 0px 0px ${theme.colors.blue[5]};

  &:hover {
    color: ${theme.colors.neutral[9]};
    // background: ${theme.colors.neutral[2]};
    box-shadow: inset 0px 0px 0px 2px ${theme.colors.neutral200};
  }

  &[data-selected="true"] {
    color: ${theme.colors.neutral900};
    transition: 0.3s box-shadow;
    box-shadow: inset 0px 0px 0px 2px ${theme.colors.blue900};
  }

  &[data-selected="true"] svg {
    color: ${theme.colors.blue900};
  }
`;
