import * as React from "react";
import Icon from "../Icon";
import { Status as Wrapper } from "./styles";

const Status = ({ children, icon, styling }) => {
  return (
    <Wrapper styling={styling}>
      {icon && <Icon height={14} strokeWidth={1.5} icon={icon} />}
      {children}
    </Wrapper>
  );
};

export default Status;
