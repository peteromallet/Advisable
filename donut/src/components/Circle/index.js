import React from "react";
import StyledCircle from "./styles";

const Circle = ({ children, size, ...props }) => {
  return (
    <StyledCircle width={size} height={size} {...props}>
      {children}
    </StyledCircle>
  );
};

Circle.defaultProps = {
  size: 60,
};

export default Circle;
