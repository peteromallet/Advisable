import React from "react";
import { Box, Text } from "@advisable/donut";
import useViewer from "@advisable-main/hooks/useViewer";
import CopyLink from "./components/CopyLink";

const Referral = () => {
  const viewer = useViewer();
  const link = encodeURI(
    `https://discover.advisable.com/guild?ref=${viewer.id}`,
  );

  return (
    <Box backgroundColor="#E8E8F3" borderRadius="12px" padding={4}>
      <Text lineHeight="1.1" fontWeight="medium" color="blue900" mb={1}>
        Know someone brilliant that should be a member of the Guild?
      </Text>
      <Text
        lineHeight="1.2"
        color="neutral700"
        fontWeight="regular"
        fontSize="xs"
        mb={4}
      >
        Share this link with them and we’ll be in touch!
      </Text>
      <CopyLink link={link} />
    </Box>
  );
};

export default Referral;
