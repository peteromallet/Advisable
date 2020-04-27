import * as React from "react";
import { FooterAction as Wrapper } from "./styles";

const FooterAction = ({ css, icon, children }) => {
  return (
    <Wrapper css={css}>
      {icon}
      {children}
    </Wrapper>
  );
};

export default FooterAction;
