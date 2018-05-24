import React from "react";
import { Hamburger, HamburgerLine } from "./styles";

export default ({ onClick }) => {
  return (
    <Hamburger onClick={onClick}>
      <HamburgerLine />
      <HamburgerLine />
      <HamburgerLine />
    </Hamburger>
  );
};
