import { truncate } from "lodash";
import React, { useState } from "react";
import { Box, Text } from "@advisable/donut";

function ProfileAbout({ data }) {
  const specialist = data.specialist;
  const [expanded, setExpanded] = useState(false);
  const truncated = truncate(specialist.bio, { length: 270 });
  const expandable = truncated !== specialist.bio;

  return (
    <Box>
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
      {expandable && (
        <Box
          fontSize="s"
          color="blue.7"
          display="inline-block"
          css="cursor: pointer;"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Hide" : "Read More"}
        </Box>
      )}
    </Box>
  );
}

export default ProfileAbout;
