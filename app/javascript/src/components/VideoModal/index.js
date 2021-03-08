import React from "react";
import { Box, Button, Text } from "@advisable/donut";

const VideoModal = ({ heading, summary, url, buttonLabel, onDismiss }) => {
  return (
    <>
      <Box padding="l" css="text-align: center;">
        <Box paddingBottom="xs">
          <Text fontSize="lg" fontWeight="600">
            {heading}
          </Text>
        </Box>
        <Text fontSize="sm">{summary}</Text>
      </Box>
      <iframe
        width="100%"
        height="280"
        src={url}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      <Box padding="l" css="text-align: center;">
        <Button size="l" onClick={onDismiss}>
          {buttonLabel || "Okay"}
        </Button>
      </Box>
    </>
  );
};

export default VideoModal;
