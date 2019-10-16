import React from "react";
import {
  StyledSideScroller,
  StyledSideScrollerInner,
  StyledSideScrollerItem,
} from "./styles";

const SideScroller = ({ children }) => {
  return (
    <StyledSideScroller>
      <StyledSideScrollerInner>
        {React.Children.map(children, (child, i) => (
          <StyledSideScrollerItem key={i}>
            {React.cloneElement(child)}
          </StyledSideScrollerItem>
        ))}
      </StyledSideScrollerInner>
    </StyledSideScroller>
  );
};

export default SideScroller;
