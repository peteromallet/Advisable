import React from "react";
import { Wrapper } from "./styles";
import Text from "src/components/Text";
import Icon from "src/components/Icon";
import Heading from "src/components/Heading";

export default ({ icon, heading, text }) => (
  <Wrapper>
    <Icon icon={icon} width={30} height={30} />
    {heading && <Heading>{heading}</Heading>}
    <Text>{text}</Text>
  </Wrapper>
);
