import React from "react";
import { StyledStack, StyledStackItem } from "./styles";

export default function Stack({ spacing, divider, children, ...props }) {
  return (
    <StyledStack {...props}>
      {React.Children.map(children, (c) => {
        if (c === null) return null;
        return (
          <StyledStackItem spacing={spacing} divider={divider}>
            {React.cloneElement(c)}
          </StyledStackItem>
        );
      })}
    </StyledStack>
  );
}
