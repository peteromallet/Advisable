import React from "react";
import styled from "styled-components";

const flex = {
  default: "0 0 auto",
  fillEvenly: "1 0 0%"
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
  detault: "stretch"
};

const Flex = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: ${props => align[props.align || "default"]};
`;

const FlexItem = styled.div`
  min-width: 0;
  flex: ${props => flex[props.distribute || "default"]};
  margin-left: ${props => spacing[props.spacing] || 0};
  margin-right: ${props => spacing[props.spacing] || 0};

  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
`;

export default ({ children, ...props }) => (
  <Flex {...props}>
    {children.map((child, i) => {
      if (child === null) return null;
      return (
        <FlexItem key={i} className="item" {...props}>
          {child}
        </FlexItem>
      );
    })}
  </Flex>
);
