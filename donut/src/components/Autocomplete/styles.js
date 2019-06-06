import { rgba } from "polished";
import styled, { css } from "styled-components";
import Text from "../Text/styles";
import colors from "../../colors";
import breakpoints from "../../breakpoints";

export const Label = styled(Text)`
  display: block;
  margin-bottom: 8px;
`;

export const Autocomplete = styled.div`
  position: relative;
`;

export const Input = styled.input`
  width: 100%;
  height: 38px;
  border: none;
  outline: none;
  font-size: 16px;
  padding: 0 12px;
  font-weight: 500;
  border-radius: 8px;
  background: rgba(29, 39, 75, 0.06);
`;

export const Menu = styled.div`
  width: 100%;
  background: white;
  border-radius: 4px;
  max-height: 200px;
  overflow-y: scroll;
  top: calc(100% + 8px);
  box-shadow: 0 2px 8px ${rgba(colors.neutral.N8, 0.1)},
    0 16px 60px ${rgba(colors.neutral.N8, 0.15)};
`;

const highlightedItemStyles = css`
  color: ${colors.neutral.N9};
  background: ${colors.neutral.N1};
`;

const selectedItemStyles = css`
  color: ${colors.blue.N5};
`;

export const MenuItem = styled.div`
  font-size: 15px;
  font-weight: 500;
  padding: 0 12px;
  height: 38px;
  display: flex;
  cursor: pointer;
  align-items: center;
  color: ${colors.neutral.N7};

  ${props => props.selected && selectedItemStyles};
  ${props => props.highlighted && highlightedItemStyles};
`;

export const MobileContainer = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  background: white;
`;

export const MobileContainerTop = styled.div`
  height: 50px;
  display: flex;
  padding: 0 4px;
  align-items: center;
  box-shadow: 0 2px 4px ${rgba(colors.neutral.N9, 0.1)};
`;

export const MobileContainerBack = styled.button`
  width: 38px;
  height: 38px;
  border: none;
  flex-grow: 0;
  outline: none;
  flex-shrink: 0;
  margin-right: 8px;
  appearance: none;
`;

export const MobileContainerSearch = styled.div`
  flex-grow: 1;
`;

export default Autocomplete;
