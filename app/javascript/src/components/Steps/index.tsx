import * as React from "react";
import { Steps as Wrapper } from "./styles";
import Step from "./Step"

const Steps = ({ children }) => {
  return (
    <Wrapper>{children}</Wrapper>
  )
}

Steps.Step = Step

export default Steps;
