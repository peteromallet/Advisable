import Text from "../Text";
import { Box, Button } from "@advisable/donut";

const VideoModal = ({ heading, summary, url, buttonLabel, onDismiss }) => {
  return (
    <>
      <Box padding="l" css="text-align: center;">
        <Box paddingBottom="xs">
          <Text size="l" weight="bold">
            {heading}
          </Text>
        </Box>
        <Text size="s">{summary}</Text>
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
