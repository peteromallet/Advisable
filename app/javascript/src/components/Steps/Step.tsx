import * as React from "react";
import { NavLink } from "react-router-dom";
import { Step as Wrapper, Number } from "./styles";

interface Props {
  number: number;
  children: React.ReactNode;
  to?: string;
  exact?: boolean;
  isDisabled?: boolean;
  isComplete?: boolean;
}

const Step = ({
  number,
  exact,
  children,
  to,
  isComplete,
  isDisabled
}: Props) => {
  const Component = isDisabled ? "div" : NavLink;

  return (
    <Wrapper isDisabled={isDisabled} isComplete={isComplete}>
      <Component to={to} exact={isDisabled ? null : exact}>
        <Number>{number}</Number>
        <span>{children}</span>
      </Component>
    </Wrapper>
  );
};

export default Step;
