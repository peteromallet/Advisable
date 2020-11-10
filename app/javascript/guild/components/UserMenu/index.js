import React from "react";
import { Link } from "@advisable/donut";
import { useLocation } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Dropdown, NavItem } from "./styles";
import { LOGOUT } from "./mutations";

const UserMenu = ({ open, onToggle }) => {
  const location = useLocation();
  const [logout] = useMutation(LOGOUT, { variables: { input: {} } });

  const handleLogout = async () => {
    await logout();
    window.location = "/login";
  };

  const isActiveRoute = (pathname) => location.pathname === pathname;

  return (
    <Dropdown display="flex" flexDirection="column" open={open}>
      <NavItem onClick={onToggle} active={isActiveRoute("/feed")}>
        <Link to="/feed">Feed</Link>
      </NavItem>
      <NavItem onClick={onToggle} active={isActiveRoute("/your-posts")}>
        <Link to="/your-posts">Your Posts</Link>
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
