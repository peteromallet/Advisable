import React from "react";
import { StyledContainer } from "./styles";

export default function Container({ children, ...props }) {
  return (
    <StyledContainer
      mx="auto"
      maxWidth="1280px"
      px={["s", "m", "l", "xl"]}
      {...props}
    >
      {children}
    </StyledContainer>
  );
}
