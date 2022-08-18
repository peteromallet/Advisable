import React from "react";
import { StyledHeader, StyledHeaderSpacer } from "./styles";
import NavigationLink from "./NavigationLink";
import Logo from "../Logo";
import Button from "../Button";
import { Link } from "react-router-dom";

export default function PublicHeader() {
  return (
    <>
      <StyledHeader>
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center">
            <a href="/">
              <Logo height={20} />
            </a>
            <NavigationLink to="https://more.advisable.com/freelancers">
              Hiring
            </NavigationLink>
            <NavigationLink to="https://more.advisable.com/freelancers">
              For freelancers
            </NavigationLink>
            <NavigationLink to="https://more.advisable.com/pricing">
              Pricing
            </NavigationLink>
          </div>
          <div className="flex gap-3 items-center">
            <Link to="/login">
              <Button variant="outlined">Login</Button>
            </Link>
            <Link to="/clients/join">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </StyledHeader>
      <StyledHeaderSpacer />
    </>
  );
}
