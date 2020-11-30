import React from "react";
import StyledCircle from "./styles";

const Circle = React.forwardRef(function Circle(
  { children, size, ...props },
  ref,
) {
  return (
    <StyledCircle ref={ref} width={size} height={size} {...props}>
      {children}
    </StyledCircle>
  );
});

Circle.defaultProps = {
  size: 60,
};

export default Circle;
