import * as React from "react";
import { Steps as Wrapper } from "./styles";
import Step from "./Step";

const Steps = ({ children }) => {
  let count = 0;

  return (
    <Wrapper>
      {React.Children.map(children, child => {
        if (child === null) return null;
        count += 1;
        return React.cloneElement(child, { number: count });
      })}
    </Wrapper>
  );
};

Steps.Step = Step;

export default Steps;
