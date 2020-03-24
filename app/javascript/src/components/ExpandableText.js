import { truncate } from "lodash";
import React, { useState } from "react";
import { Box, Text } from "@advisable/donut";

function ExpandableText({
  showLabel = "Read More",
  hideLabel = "Hide",
  length = 280,
  children,
  ...props
}) {
  const [expanded, setExpanded] = useState(false);
  const truncated = truncate(children, { length });
  const expandable = truncated !== children;

  return (
    <>
      <Text mb="xs" {...props}>
        {expanded ? children : truncated}
      </Text>
      {expandable && (
        <Box
          fontSize="s"
          color="blue.7"
          display="inline-block"
          css="cursor: pointer;"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? hideLabel : showLabel}
        </Box>
      )}
    </>
  );
}

export default ExpandableText;
