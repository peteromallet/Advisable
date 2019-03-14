import * as React from "react";
import Icon from "../../../components/Icon";
import { FooterAction as Wrapper } from "./styles";

const FooterAction = ({ css, icon, children }) => {
  return (
    <Wrapper css={css}>
      {icon && <Icon icon={icon} />}
      {children}
    </Wrapper>
  );
};

export default FooterAction;
