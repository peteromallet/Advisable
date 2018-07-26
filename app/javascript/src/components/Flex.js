import React from "react";
import styled from "styled-components";
import { withSpacing } from "src/components/Spacing";

const justifyContent = {
  equalSpacing: "space-between"
};

const spacing = {
  xs: "2px",
  s: "5px",
  m: "7px",
  l: "10px",
  xl: "15px"
};

const align = {
  center: "center",
  detault: "stretch",
  baseline: "baseline"
};

const FlexWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: ${props => align[props.align || "default"]};
  justify-content: ${props => justifyContent[props.distribute]};
`;

const flex = {
  default: "0 0 auto",
  fillEvenly: "1 0 0%",
  fill: "1 1 auto"
};

const FlexItem = withSpacing(styled.div`
  min-width: 0;
  flex: ${props => flex[props.distribute]};
`);

FlexItem.displayName = "FlexItem";

const Flex = ({ children, ...props }) => {
  return (
    <FlexWrapper {...props}>
      {React.Children.map(children, (child, i) => {
        // If the child is null then return null
        if (child === null) return null;
        // if the child is a FlexItem then return the child
        if (child.type.displayName === "FlexItem") {
          return React.cloneElement(child, props);
        }
        // For everything else wrap it with a FlexItem component
        return (
          <FlexItem key={i} className="item" {...props}>
            {child}
          </FlexItem>
        );
      })}
    </FlexWrapper>
  );
};

Flex.Item = FlexItem;

export default Flex;
