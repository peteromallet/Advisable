import * as React from "react";
import { Modal, Text, Box } from "@advisable/donut";
import CopyURL from "../../components/CopyURL";

const ShareModal = ({ url, modal }) => {
  return (
    <Modal modal={modal} label="Share project" padding="l">
      <Text
        as="h4"
        mb="xs"
        pr="40px"
        color="blue900"
        fontSize="24px"
        lineHeight="26px"
        fontWeight="medium"
        letterSpacing="-0.02em"
      >
        Do you know anyone that would suit this project?
      </Text>
      <Box marginBottom="l">
        <Text color="neutral800" lineHeight="20px">
          Share your unique referral link with anyone you know who you think
          would be well suited for this position
        </Text>
      </Box>
      <CopyURL>{url}</CopyURL>
    </Modal>
  );
};

export default ShareModal;
