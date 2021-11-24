import * as React from "react";
import { Text, Box } from "@advisable/donut";
import CopyURL from "@advisable-main/components/CopyURL";

const ShareModal = ({ externalUrl }) => {
  return (
    <>
      <Text
        as="h4"
        mb="xs"
        pr="40px"
        color="blue900"
        fontSize="3xl"
        lineHeight="26px"
        fontWeight="medium"
        letterSpacing="-0.02em"
      >
        {
          "Do you know another freelancer that you'd want to share this Post with?"
        }
      </Text>
      <Box marginBottom="l" maxWidth="500px">
        <Text color="neutral800" lineHeight="20px">
          Share this post with a freelancer who is not in the Guild by sending
          them the link below.
        </Text>
      </Box>
      <CopyURL>{externalUrl}</CopyURL>
    </>
  );
};

export default ShareModal;
