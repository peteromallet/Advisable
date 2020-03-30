import { rgba } from "polished";
import styled from "styled-components";
import { theme, StyledIcon } from "@advisable/donut";
import { NavLink } from "react-router-dom";
import arrow from "./arrow.svg";

export const NavMenu = styled.div`
  margin-top: 25px;
  padding-top: 25px;
  margin-bottom: 20px;
  border-top: 1px solid ${theme.colors.neutral200};

  @media screen and (max-width: 800px) {
    padding-top: 0;
    margin-top: 30px;
  }
`;

export const NavMenuItemCount = styled.div`
  top: 50%;
  right: 10px;
  height: 20px;
  color: #7882a3;
  padding: 0 15px;
  font-size: 12px;
  font-weight: 600;
  line-height: 20px;
  position: absolute;
  border-radius: 10px;
  transform: translateY(-50%);
  background: ${theme.colors.blue100};
`;

export const NavMenuItemIcon = styled.div`
  top: 50%;
  left: 15px;
  position: absolute;
  transform: translateY(-50%);
`;

export const NavMenuItem = styled(NavLink)`
  height: 40px;
  display: flex;
  color: #7882a3;
  font-size: 15px;
  font-weight: 500;
  margin-left: -15px;
  position: relative;
  border-radius: 20px;
  margin-bottom: 5px;
  align-items: center;
  text-decoration: none;
  padding: 0 15px 0 48px;
  transition: background-color 100ms;

  &:hover {
    color: ${theme.colors.neutral800};
    background: ${rgba(theme.colors.blue100, 0.5)};
  }

  &.active {
    color: ${theme.colors.blue900};
    background-color: ${theme.colors.blue100};

    ${StyledIcon} {
      color: ${theme.colors.blue700};
    }

    ${NavMenuItemCount} {
      background: white;
    }
  }

  @media screen and (max-width: 800px) {
    height: 60px;
    margin-left: 0;
    font-size: 16px;
    margin-bottom: 0;
    border-radius: 0;
    padding: 0 0 0 35px;
    background: transparent url(${arrow}) no-repeat center right;
    border-bottom: 1px solid #c6cde1;

    &:hover {
      background-color: transparent;
    }

    ${NavMenuItemIcon} {
      left: 0;
    }

    ${NavMenuItemCount} {
      right: 20px;
    }
  }
`;
