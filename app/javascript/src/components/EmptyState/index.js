import React from "react";
import { Wrapper } from "./styles";
import { Text } from "@advisable/donut";

export default ({ heading, text }) => (
  <Wrapper>
    {heading && (
      <Text as="h3" size="m" fontWeight="semibold" mb="xs">
        {heading}
      </Text>
    )}
    <Text size="s" color="neutral700" lineHeight="m">
      {text}
    </Text>
  </Wrapper>
);
