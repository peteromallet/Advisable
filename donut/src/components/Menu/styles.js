import { rgba } from "polished";
import styled from "styled-components";
import theme from "../../theme";
import { Menu as ReakitMenu } from "reakit/menu";

export const MenuList = styled(ReakitMenu)`
  padding: 8px;
  color: white;
  border: none;
  outline: none;
  max-width: 260px;
  user-select: none;
  border-radius: 12px;
  white-space: normal;
  font-family: poppins, sans-serif;
  background: ${theme.colors.blue[8]};
  box-shadow: 0px 4px 40px ${rgba(theme.colors.blue[8], 0.1)};
`;

export const MenuItemStyles = styled.button`
  margin: 0;
  width: 100%;
  color: white;
  border: none;
  outline: none;
  display: block;
  text-align: left;
  appearance: none;
  font-size: 14px;
  font-weight: 500;
  padding: 8px 12px;
  border-radius: 8px;
  background: transparent;
  font-family: poppins, sans-serif;
  transition: background-color 100ms;

  &:focus {
    background: ${theme.colors.blue[4]};
  }
`;
