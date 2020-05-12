import React from "react";
import { Linkedin } from "@styled-icons/fa-brands";
import styled from "styled-components";

const StyledLoginWithLinkedin = styled.button`
  color: white;
  height: 50px;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 0 24px;
  font-size: 17px;
  appearance: none;
  font-weight: 600;
  align-items: center;
  background: #2a67bc;
  border-radius: 25px;
  display: inline-flex;

  svg {
    margin-right: 10px;
  }

  &:hover {
    background: #4291d0;
  }
`;

function OmniauthLogin() {
  const csrf = document
    .querySelector("meta[name=csrf-token]")
    .getAttribute("content");

  return (
    <form action="/auth/linkedin" method="POST">
      <input type="hidden" name="authenticity_token" value={csrf} />
      <StyledLoginWithLinkedin>
        <Linkedin size={24} />
        Login with Linkedin
      </StyledLoginWithLinkedin>
    </form>
  );
}

export default OmniauthLogin;
