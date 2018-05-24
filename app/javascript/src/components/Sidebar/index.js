import React from "react";
import { Route } from "react-router-dom";
import logo from "./logo.svg";
import { Sidebar, Logo } from "./styles";
import Navigation from 'src/components/Navigation'

export default ({ toggleDrawer, drawerOpen }) => {
  return (
    <Sidebar>
      <Logo src={logo} />
      <Navigation />
    </Sidebar>
  );
};
