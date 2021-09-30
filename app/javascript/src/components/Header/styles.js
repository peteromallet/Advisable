import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";
import { theme, Box, Link } from "@advisable/donut";

export const StyledHeader = styled.header`
  top: 0;
  left: 0;
  z-index: 5;
  width: 100%;
  height: var(--header-height);
  display: flex;
  position: sticky;
  background: white;
  align-items: center;
  padding: 0 15px 0 25px;
  box-shadow: 0px 1px 4px ${theme.colors.blue800}20;
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
    color: ${theme.colors.neutral400};
    border: 1px solid ${theme.colors.neutral300};

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
  font-size: 16px;
  font-weight: 480;
  align-items: center;
  user-select: none;
  margin-left: 32px;
  position: relative;
  display: inline-flex;
  text-decoration: none;
  letter-spacing: -0.016em;
  height: var(--header-height);
  color: ${theme.colors.neutral700};

  span {
    padding: 2px 0;
    transition: color 200ms;
    background-size: 300% 100%;
    background-image: linear-gradient(
      135deg,
      ${theme.colors.blue700} 0%,
      ${theme.colors.cyan700} 33%,
      ${theme.colors.neutral700} 66%,
      ${theme.colors.neutral700} 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-position: 100% 0%;
    transition: background-position 400ms;
  }

  &:hover span,
  &.active span {
    background-position: 0% 0%;
  }

  @media (max-width: 800px) {
    height: auto;
    padding: 20px 0;
    line-height: 1;
    display: block;
    font-size: 17px;
    font-weight: 500;
    margin-left: 0px;
    color: ${theme.colors.neutral700};
    border-bottom: 1px solid ${theme.colors.neutral200};

    &:hover {
      color: ${theme.colors.neutral900};
    }

    &.active {
      color: ${theme.colors.blue500};
      border-bottom: 1px solid ${theme.colors.neutral200};
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

export const CurrentUserToggle = styled.div`
  cursor: pointer;
  display: flex;
  outline: none;
  align-items: center;
`;

export const Login = styled(Link)`
  color: white;
  cursor: pointer;
  border-radius: 6px;
  padding: 5px 10px;
  margin-left: auto;
  display: block;
  font-size: 15px;
  font-weight: 600;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
  }
`;

export const Logout = styled(Login)`
  font-weight: 500;
`;

export const StyledDropdown = styled(Box)`
  outline: none;
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 40px -12px ${theme.colors.neutral900}24,
    0 2px 8px ${theme.colors.neutral900}12;
`;

export const StyledDropdownLink = styled(Link)`
  display: block;
  font-size: 16px;
  font-weight: 450;
  padding: 8px 20px;
  color: ${theme.colors.neutral700};

  &:hover {
    color: ${theme.colors.neutral900};
    background: ${theme.colors.neutral100};
  }
`;
