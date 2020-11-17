import * as React from "react";
import { Modal, Text, Box } from "@advisable/donut";
import CopyURL from "@advisable-main/components/CopyURL";

const ShareModal = ({ externalUrl, modal }) => {
  return (
    <Modal modal={modal} label="Share Guild Post" padding="l">
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
        {
          "Do you know another freelancer that you'd want to share this Post with?"
        }
      </Text>
      <Box marginBottom="l">
        <Text color="neutral800" lineHeight="20px">
          Share this Guild Post link
        </Text>
      </Box>
      <CopyURL>{externalUrl}</CopyURL>
    </Modal>
  );
};

export default ShareModal;
