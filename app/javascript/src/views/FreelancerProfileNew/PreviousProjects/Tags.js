import React from "react";
import { Text, Box } from "@advisable/donut";

function Tags({ section, switchTagSelection, ...props }) {
  const tagsList = Object.keys(section)
    .sort((a, b) => section[b].number - section[a].number)
    .map((tagKey, index) => {
      const { selected } = section[tagKey];
      return (
        <Box
          key={`${tagKey}-${index}`}
          display="flex"
          p="s"
          borderRadius="8px"
          borderWidth={1}
          bg={selected ? "blue100" : "none"}
          borderStyle="solid"
          borderColor="blue500"
          css={`
            user-select: none;
            cursor: pointer;
          `}
          m="6px"
          onClick={() => switchTagSelection({ tag: tagKey })}
          {...props}
        >
          <Text color="blue500" fontSize="xs">
            {tagKey}
          </Text>
          <Text ml="s" color="blue500" fontSize="xs">
            {section[tagKey].number}
          </Text>
        </Box>
      );
    });
  return <>{tagsList}</>;
}

export default Tags;
