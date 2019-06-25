// A simple component for building layouts using CSS flexbox.
import React from "react";
import { Flex as Wrapper, FlexItem } from "./styles";

const Flex = ({ children, ...rest }) => {
  const items = React.Children.map(children, (child, i) => {
    if (child === null) return null;
    if (child.type.displayName === "FlexItem") {
      return React.cloneElement(child, rest);
    }

    return (
      <FlexItem key={i} {...rest}>
        {child}
      </FlexItem>
    );
  });
  return <Wrapper {...rest}>{items}</Wrapper>;
};

Flex.defaultProps = {
  direction: "horizontal",
};

Flex.Item = FlexItem;
export default Flex;
