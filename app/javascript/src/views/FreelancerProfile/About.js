import { truncate } from "lodash";
import React, { useState } from "react";
import { Box, Text } from "@advisable/donut";

function ProfileAbout({ data }) {
  const specialist = data.specialist;
  const [expanded, setExpanded] = useState(false);

  return (
    <Box pt="xl">
      <Text fontSize="l" mb="xs" fontWeight="medium">
        About
      </Text>
      <Text fontSize="s" color="neutral.8" lineHeight="s" mb="s">
        {expanded
          ? specialist.bio
          : truncate(specialist.bio, {
              length: 270,
            })}
      </Text>
      <Box
        fontSize="s"
        color="blue.8"
        display="inline-block"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? "Hide" : "Read More"}
      </Box>
    </Box>
  );
}

export default ProfileAbout;
