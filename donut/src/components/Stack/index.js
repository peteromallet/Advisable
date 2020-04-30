import React from "react";
import { StyledStack, StyledStackItem } from "./styles";

export default function Stack({ spacing, divider, children, ...props }) {
  const items = React.Children.toArray(children);

  return (
    <StyledStack {...props}>
      {items.map((child, i) => {
        if (child === null) return null;
        return (
          <StyledStackItem key={i} spacing={spacing} divider={divider}>
            {React.cloneElement(child, { number: i + 1 })}
          </StyledStackItem>
        );
      })}
    </StyledStack>
  );
}
