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
        <div className="flex justify-between items-center px-5 mx-auto w-full lg:px-10 max-w-[1300px]">
          <div className="flex items-center">
            <a href="/">
              <Logo height={20} />
            </a>
            <NavigationLink to="https://advisable.com/testing/freelancers">
              Get Featured
            </NavigationLink>
            <NavigationLink to="https://advisable.com/testing/clients">
              Recruit Talent
            </NavigationLink>
            <NavigationLink to="https://advisable.com/testing/pricing">
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
