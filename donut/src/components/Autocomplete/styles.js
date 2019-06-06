import { rgba } from "polished";
import styled, { css } from "styled-components";
import Text from "../Text/styles";
import colors from "../../colors";

export const Autocomplete = styled.div`
  position: relative;
`;

export const Label = styled(Text)`
  display: block;
  margin-bottom: 8px;
`;

export const Input = styled.input`
  width: 100%;
  height: 38px;
  border: none;
  outline: none;
  font-size: 16px;
  padding: 0 12px;
  border-radius: 8px;
  background: rgba(29, 39, 75, 0.06);
`;

export const Menu = styled.div`
  left: 0;
  width: 100%;
  z-index: 20;
  background: white;
  border-radius: 4px;
  position: absolute;
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
  font-size: 14px;
  font-weight: 500;
  padding: 6px 12px;
  color: ${colors.neutral.N7};

  ${props => props.selected && selectedItemStyles};
  ${props => props.highlighted && highlightedItemStyles};
`;

export default Autocomplete;
