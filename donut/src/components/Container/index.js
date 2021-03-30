import React from "react";
import { StyledContainer } from "./styles";

export default function Container({ children, ...props }) {
  return (
    <StyledContainer mx="auto" maxWidth="1280px" px={[3, 4, 6, 8]} {...props}>
      {children}
    </StyledContainer>
  );
}
