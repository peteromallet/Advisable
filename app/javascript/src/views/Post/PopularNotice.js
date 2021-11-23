import React from "react";
import { Bulb } from "@styled-icons/ionicons-solid/Bulb";
import pluralize from "src/utilities/pluralize";
import { Box, Text } from "@advisable/donut";
import useViewerAuthor from "@guild/hooks/useViewerAuthor";

export default function PopularNotice({ post, ...props }) {
  const { isAuthor } = useViewerAuthor(post);

  return (
    <Box display="flex" alignItems="center" justifyContent="center" {...props}>
      <Box
        padding="2px 16px"
        background="#fde7b2"
        borderRadius="8px 8px 0 0"
        display="flex"
        alignItems="center"
      >
        <Box as={Bulb} color="yellow800" size="14" />
        <Text
          fontSize="sm"
          marginLeft="2"
          lineHeight="l"
          color="yellow900"
          fontWeight="medium"
        >
          {isAuthor
            ? `${pluralize(
                post?.reactionsCount,
                "person",
                "people",
              )} found your post interesting`
            : "Many people found this post interesting"}
        </Text>
      </Box>
    </Box>
  );
}
