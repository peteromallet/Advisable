import React from "react";
import { Text } from "@advisable/donut";
import { GuildBox } from "@guild/styles";

const NoResults = ({ message = "No Results" }) => (
  <GuildBox
    background="white"
    spaceChildrenVertical={16}
    flexCenterBoth
    p="3xl"
  >
    <Text
      fontSize="xl"
      fontWeight="medium"
      letterSpacing="-0.01em"
      color="catalinaBlue100"
    >
      {message}
    </Text>
  </GuildBox>
);

export default NoResults;
