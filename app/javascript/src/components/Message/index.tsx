import * as React from "react";
import Icon from "../../components/Icon";
import { Message as Wrapper, Title } from "./styles";

export default ({ title, children }) => (
  <Wrapper>
    <Title>
      <Icon icon="message-circle" height={18} strokeWidth={2} />
      {title}
    </Title>
    {children}
  </Wrapper>
);
