import styled from "styled-components";
import { Link, NavLink } from "react-router-dom";

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
  background: #173fcd;
  align-items: center;
  padding: 0 15px 0 25px;
  box-shadow: 0px 2px 3px rgba(0, 25, 116, 0.14);
`;

export const Logo = styled(Link)``;

export const Nav = styled.nav`
`

export const NavItem = styled(NavLink)`
  height: 58px;
  color: #AABDFF;
  font-size: 14px;
  font-weight: 600;
  line-height: 58px;
  user-select: none;
  margin-left: 28px;
  display: inline-block;
  text-decoration: none;

  &:hover {
    color: white;
  }

  &.active {
    color: white;
    border-bottom: 2px solid white;
  }
`

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
    color: #6797e5;
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

  opacity: ${props => props.open ? "1" : "0"};
  pointer-events: ${props => props.open ? "all" : "none"};
  transform: ${props => props.open ? "scale(1)" : "scale(0.7)"};

  a {
    color: #4D5880;
    display: block;
    font-size: 14px;
    font-weight: 500;
    padding: 10px 20px;
    text-decoration: none;

    &:hover {
      background-color: #F4F5FB;
    }
  }
`;
