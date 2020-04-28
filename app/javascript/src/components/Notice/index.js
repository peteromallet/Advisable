import React from "react";
import { Notice as Wrapper, NoticeIcon } from "./styles";

const Notice = ({ icon, children, ...props }) => {
  return (
    <Wrapper hasIcon={Boolean(icon)} {...props}>
      {icon && <NoticeIcon>{icon}</NoticeIcon>}
      {children}
    </Wrapper>
  );
};

export default Notice;
