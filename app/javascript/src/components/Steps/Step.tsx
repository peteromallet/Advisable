import * as React from "react";
import { NavLink } from "react-router-dom";
import { Step as Wrapper, Number } from "./styles";

interface Props {
  number: number;
  children: React.ReactNode;
  to?: {
    pathname: string;
    state?: object;
  };
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
  isDisabled,
}: Props) => {
  return (
    <Wrapper
      to={to}
      isDisabled={isDisabled}
      isComplete={isComplete}
      as={isDisabled ? "div" : NavLink}
      exact={isDisabled ? null : exact}
    >
      <Number>{number}</Number>
      <span>{children}</span>
    </Wrapper>
  );
};

export default Step;
