import * as React from "react";
import { Status as Wrapper } from "./styles";

const Status = ({ children, icon, styling }) => {
  return (
    <Wrapper styling={styling}>
      {icon && icon}
      {children}
    </Wrapper>
  );
};

export default Status;
