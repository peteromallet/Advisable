import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";
import colors from "../../colors";
import { theme } from "@advisable/donut";

export const Spacer = styled.div`
  width: 100%;
  height: 58px;
`;

export const Header = styled.header`
  top: 0;
  left: 0;
  z-index: 5;
  width: 100%;
  height: 58px;
  display: flex;
  position: fixed;
  background: ${theme.colors.blue600};
  align-items: center;
  padding: 0 15px 0 25px;
  box-shadow: 0px 2px 3px rgba(0, 25, 116, 0.14);
`;

export const Logo = styled.a`
  @media (max-width: 800px) {
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%, -50%);
  }
`;

export const Hamburger = styled.button`
  display: none;

  @media screen and (max-width: 800px) {
    top: 20px;
    left: 16px;
    padding: 0;
    width: 20px;
    border: none;
    opacity: 0.8;
    outline: none;
    display: block;
    appearance: none;
    position: absolute;
    background: transparent;

    &:active {
      opacity: 1;
    }

    div {
      width: 100%;
      height: 2px;
      background: white;
      border-radius: 1px;
      margin-bottom: 5px;
    }
  }
`;

export const CloseNav = styled.button`
  display: none;
  appearance: none;
  background: white;

  @media (max-width: 800px) {
    width: 40px;
    height: 40px;
    display: block;
    position: relative;
    border-radius: 50%;
    margin-bottom: 20px;
    color: ${colors.neutral.s4};
    border: 1px solid ${colors.neutral.s3};

    svg {
      top: 50%;
      left: 50%;
      position: absolute;
      transform: translate(-50%, -50%);
    }
  }
`;

export const Nav = styled.nav`
  @media (max-width: 800px) {
    width: 100%;
    height: 100vh;
    background: white;
    padding: 20px 20px 20px 20px;
    box-shadow: 0 0 50px rgb(0, 0, 0, 0.15);
    transform: translate(-100%, 0);
    transition: transform 300ms;
  }
`;

export const NavContainer = styled.div`
  @media (max-width: 800px) {
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    position: fixed;
    background: rgba(0, 0, 0, 0.4);
    transition: opacity 300ms;

    visibility: hidden;
    opacity: 0;

    ${(props) =>
      props.isOpen &&
      css`
        opacity: 1;
        visibility: visible;

        ${Nav} {
          transform: translate(0, 0);
        }
      `}
  }
`;

export const NavItem = styled(NavLink)`
  height: 58px;
  color: #aabdff;
  font-size: 15px;
  font-weight: 400;
  align-items: center;
  user-select: none;
  margin-left: 28px;
  position: relative;
  display: inline-flex;
  text-decoration: none;

  &:hover {
    color: white;
  }

  &.active {
    color: white;
    border-bottom: 2px solid white;
  }

  @media (max-width: 800px) {
    height: auto;
    padding: 20px 0;
    line-height: 1;
    display: block;
    font-size: 17px;
    font-weight: 500;
    margin-left: 0px;
    color: ${colors.neutral.s7};
    border-bottom: 1px solid ${colors.neutral.s2};

    &:hover {
      color: ${colors.neutral.s9};
    }

    &.active {
      color: ${colors.blue.base};
      border-bottom: 1px solid ${colors.neutral.s2};
    }
  }
`;

export const Badge = styled.div`
  color: white;
  height: 18px;
  padding: 0 6px;
  font-size: 12px;
  font-weight: 600;
  margin-right: 8px;
  border-radius: 4px;
  background: #ff4672;
  align-items: center;
  display: inline-flex;
`;

export const CurrentUserWrapper = styled.div`
  right: 25px;
  outline: none;
  position: absolute;
`;

export const CurrentUserToggle = styled.div`
  color: white;
  cursor: pointer;
  border-radius: 6px;
  padding: 5px 30px 5px 10px;

  strong {
    display: block;
    font-size: 15px;
    font-weight: 600;
  }

  span {
    color: ${theme.colors.blue200};
    font-size: 13px;
  }

  &::after {
    top: 50%;
    content: "";
    width: 0px;
    height: 0px;
    right: 10px;
    position: absolute;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid rgba(255, 255, 255, 0.2);
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    &::after {
      border-top-color: rgba(255, 255, 255, 0.3);
    }
  }
`;

export const CurrentUserDropdown = styled.div`
  right: 0;
  top: 45px;
  width: 200px;
  padding: 8px 0;
  background: white;
  position: absolute;
  border-radius: 8px;
  box-shadow: 0px 10px 30px rgba(14, 29, 78, 0.1);
  transform-origin: 80% 0;
  transition: opacity 250ms cubic-bezier(0, 1, 0.4, 1),
    transform 250ms cubic-bezier(0.18, 1.25, 0.4, 1);

  opacity: ${(props) => (props.open ? "1" : "0")};
  pointer-events: ${(props) => (props.open ? "all" : "none")};
  transform: ${(props) => (props.open ? "scale(1)" : "scale(0.7)")};

  a {
    color: #4d5880;
    display: block;
    font-size: 14px;
    font-weight: 500;
    padding: 10px 20px;
    text-decoration: none;

    &:hover {
      background-color: #f4f5fb;
    }
  }
`;
