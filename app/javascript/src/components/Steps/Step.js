import React from "react";
import { NavLink } from "react-router-dom";
import { Step as Wrapper, Number } from "./styles";

const Step = ({ number, exact, children, to, isComplete, isDisabled }) => {
  const Component = isDisabled ? "div" : NavLink;
  return (
    <Wrapper isDisabled={isDisabled} isComplete={isComplete}>
      <Component to={isDisabled ? null : to} exact={isDisabled ? null : exact}>
        <Number>{number}</Number>
        <span>{children}</span>
      </Component>
    </Wrapper>
  );
};

export default Step;
