import React from "react";
import { Wrapper } from "./styles";
import { Text } from "@advisable/donut";
import Icon from "src/components/Icon";

export default ({ icon, heading, text }) => (
  <Wrapper>
    {icon && <Icon icon={icon} width={30} height={30} />}
    {heading && (
      <Text as="h3" size="l" weight="medium" mb="xs">
        {heading}
      </Text>
    )}
    <Text size="s" color="neutral.5" lineHeight="m">
      {text}
    </Text>
  </Wrapper>
);
