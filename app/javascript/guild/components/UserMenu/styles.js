import styled, { css } from "styled-components";
import { Box, theme } from "@advisable/donut";
const { colors } = theme;

export const Dropdown = styled(Box)`
  right: 24px;
  z-index: 3;
  top: 68px;
  width: 200px;
  padding: 12px 0;
  background: white;
  position: absolute;
  border-radius: 4px;
  box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.5);
  transition: opacity 250ms cubic-bezier(0, 1, 0.4, 1),
    transform 250ms cubic-bezier(0.18, 1.25, 0.4, 1);

  opacity: ${(props) => (props.open ? "1" : "0")};
  pointer-events: ${(props) => (props.open ? "all" : "none")};
  transform: ${(props) => (props.open ? "scale(1)" : "scale(0.7)")};
`;

export const NavItem = styled(Box)`
  a {
    ${({ active }) =>
      active &&
      css`
        opacity: 0.5;
        &:hover {
          background: white !important;
          cursor: default;
        }
      `}

    color: ${colors.catalinaBlue100};
    display: block;
    font-size: 16px;
    font-weight: 500;
    padding: 12px 20px;
    text-decoration: none;

    &:hover {
      background: ${colors.ghostWhite};
    }
  }
`;
