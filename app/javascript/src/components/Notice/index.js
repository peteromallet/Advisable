import React from "react";
import Icon from "../Icon";
import { Notice as Wrapper } from "./styles";

const Notice = ({ icon, children }) => {
  return (
    <Wrapper hasIcon={Boolean(icon)}>
      {icon && <Icon icon={icon} strokeWidth={2} height={18} />}
      {children}
    </Wrapper>
  );
};

export default Notice;
