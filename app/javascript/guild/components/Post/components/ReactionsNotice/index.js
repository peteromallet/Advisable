import React from "react";
import pluralize from "src/utilities/pluralize";
import { Text, Notice } from "@advisable/donut";

export default function ReactionsNotice({ reactionsCount }) {
  const notice = `${pluralize(
    reactionsCount,
    "person has",
    "people have",
  )} marked your post as interesting`;

  return (
    <Notice padding="xs">
      <Text marginLeft="sm" fontSize="m" color="#8E8EA1">
        {notice}
      </Text>
    </Notice>
  );
}
