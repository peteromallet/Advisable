import React from "react";
import styled from "styled-components";
import { margin } from "styled-system";
import { StyledAvatar } from "@advisable/donut";

const MARGINS = {
  s: "-8px",
  m: "-16px",
  l: "-24px",
};

const StyledAvatarStack = styled.div`
  ${margin};

  display: flex;

  ${StyledAvatar} {
    margin-left: ${(p) => MARGINS[p.$size]};
    border: 4px solid white;

    &:first-child {
      margin-left: 0;
    }
  }
`;

export default function AvatarStack({
  size = "m",
  children,
  margin,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  marginX,
  marginY,
}) {
  return (
    <StyledAvatarStack
      $size={size}
      margin={margin}
      marginX={marginX}
      marginY={marginY}
      marginTop={marginTop}
      marginLeft={marginLeft}
      marginRight={marginRight}
      marginBottom={marginBottom}
    >
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, { size });
      })}
    </StyledAvatarStack>
  );
}
