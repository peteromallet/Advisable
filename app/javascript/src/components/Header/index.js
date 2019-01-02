// Renders the primary header for the app
import React, { Fragment } from "react";
import { Header, Spacer, Logo } from "./styles";
import logo from "./logo.svg";
import CurrentUser from './CurrentUser';

export default () => {
  return (
    <Fragment>
      <Spacer />
      <Header>
        <Logo to="/">
          <img src={logo} alt="" />
        </Logo>
        <CurrentUser />
      </Header>
    </Fragment>
  );
};
