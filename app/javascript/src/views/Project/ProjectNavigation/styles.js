import { rgba } from "polished";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import arrow from './arrow.svg';

export const ProjectTitle = styled.h3`
  color: #00071f;
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 2px;
  letter-spacing: -0.03em;

  @media screen and (max-width: 800px) {
    font-size: 22px;
  }
`;

export const TotalApplicants = styled.span`
  color: #565f80;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.03em;
`;

export const NavMenu = styled.div`
  margin-top: 25px;
  padding-top: 25px;
  margin-bottom: 20px;
  border-top: 1px solid #C6CDE1;

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
  background: ${rgba("#1E2C60", 0.06)};
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
  border-radius: 8px;
  margin-bottom: 5px;
  align-items: center;
  text-decoration: none;
  padding: 0 15px 0 45px;

  &:hover {
    color: #404966;
    background-color: ${rgba("#DADEEE", 0.5)};
  }

  &.active {
    color: #173fcd;
    background-color: #dadeee;

    ${NavMenuItemCount} {
      background: ${rgba("#1E2C60", 0.1)};
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
    border-bottom: 1px solid #C6CDE1;

    &:hover { background-color: transparent }

    ${NavMenuItemIcon} {
      left: 0;
    }

    ${NavMenuItemCount} {
      right: 20px;
    }
  }
`;
