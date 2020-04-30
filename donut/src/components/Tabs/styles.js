import { space } from "styled-system";
import styled from "styled-components";
import { Tab, TabList, TabPanel } from "reakit/Tab";
import theme from "../../theme";

export const StyledTab = styled(Tab)`
  padding: 0;
  z-index: 1;
  border: none;
  outline: none;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  appearance: none;
  margin-right: 28px;
  position: relative;
  margin-bottom: -2px;
  align-items: center;
  padding-bottom: 12px;
  display: inline-flex;
  background: transparent;
  color: ${theme.colors.neutral400};
  font-family: Poppins, sans-serif;

  &:hover {
    color: ${theme.colors.neutral700};
  }

  &[aria-selected="true"] {
    color: ${theme.colors.blue800};
    border-bottom: 2px solid ${theme.colors.blue500};
  }
`;

export const StyledTabList = styled(TabList)`
  ${space};
  border-bottom: 2px solid ${theme.colors.neutral100};
`;

export const StyledTabPanel = styled(TabPanel)`
  outline: none;
`;
