import React from 'react';
import logo from "./logo.svg";
import Hamburger from './Hamburger';
import { Header, Logo } from './styles';

export default ({ onOpenNavigation, drawerOpen }) => {
  return (
    <Header drawerOpen={drawerOpen}>
      <Hamburger onClick={onOpenNavigation} />
      <Logo src={logo} />
    </Header>
  )
}
