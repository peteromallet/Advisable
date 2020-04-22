import React from "react";
import Text from "../Text";
import Modal from "../Modal";
import { Button } from "@advisable/donut";
import Spacing from "../Spacing/Padding";

const VideoModal = ({
  isOpen,
  heading,
  summary,
  url,
  buttonLabel,
  onDismiss,
}) => {
  return (
    <Modal isOpen={isOpen}>
      <Spacing size="l" css="text-align: center;">
        <Spacing bottom="xs">
          <Text size="l" weight="bold">
            {heading}
          </Text>
        </Spacing>
        <Text size="s">{summary}</Text>
      </Spacing>
      <iframe
        width="100%"
        height="280"
        src={url}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      <Spacing size="l" css="text-align: center;">
        <Button size="l" onClick={onDismiss}>
          {buttonLabel || "Okay"}
        </Button>
      </Spacing>
    </Modal>
  );
};

export default VideoModal;
