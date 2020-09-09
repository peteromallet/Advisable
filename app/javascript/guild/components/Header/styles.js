import styled, { css } from "styled-components";
import { theme } from "@advisable/donut";

export const NavIcon = styled.div`
  position: relative;
  ${({ unread }) =>
    unread &&
    css`
      &:after {
        content: "";
        position: absolute;
        background: ${theme.colors.froly100};
        border-radius: 50%;
        right: -2px;
        padding: 6px;
      }
    `}

  ${({ open }) =>
    open &&
    css`
      svg {
        fill: ${theme.colors.purpleBlue} !important;
      }
    `}
  
  svg {
    width: 28px;
    height: 28px;
    fill: white;
  }
  &:hover,
  &:active {
    cursor: pointer;
    svg {
      fill: ${theme.colors.purpleBlue};
    }
  }
`;

export const Mask = styled.div`
  background: rgba(0, 0, 0, 0.7);
  cursor: pointer;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 58px;
  transition: visibility 0s, opacity 0.3s linear;
  z-index: 1;
  ${({ open }) => css`
    opacity: ${open ? 1 : 0};
    visibility: ${open ? "visible" : "hidden"};
  `}
`;
