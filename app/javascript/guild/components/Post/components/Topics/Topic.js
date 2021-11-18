import React from "react";
import { Text } from "@advisable/donut";

const Topic = ({ topic }) => {
  return (
    <Text
      fontSize="m"
      lineHeight="24px"
      py={0.5}
      fontWeight="medium"
      color="neutral400"
      mr={2}
    >
      #{topic.slug}
    </Text>
  );
};

export default Topic;
