import React from "react";
import { Link } from "@advisable/donut";
import { useLocation } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Dropdown, NavItem } from "./styles";
import { LOGOUT } from "./mutations";

const UserMenu = ({ open }) => {
  const location = useLocation();
  const [logout] = useMutation(LOGOUT, { variables: { input: {} } });

  const handleLogout = async () => {
    await logout();
    window.location = "/login";
  };

  const isActiveRoute = (pathname) => location.pathname === pathname;

  return (
    <Dropdown display="flex" flexDirection="column" open={open}>
      <NavItem active={isActiveRoute("/feed")}>
        <Link to="/feed">Feed</Link>
      </NavItem>
      <NavItem>
        <a href="/">Advisable</a>
      </NavItem>
      <NavItem>
        <a href="#" onClick={handleLogout}>
          Logout
        </a>
      </NavItem>
    </Dropdown>
  );
};

export default UserMenu;
