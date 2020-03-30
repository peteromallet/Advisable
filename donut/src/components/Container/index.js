import React from "react";
import { StyledContainer } from "./styles";

export default function Container({ children, ...props }) {
  return (
    <StyledContainer
      mx="auto"
      maxWidth="1240px"
      px={["s", "m", "l"]}
      {...props}
    >
      {children}
    </StyledContainer>
  );
}
