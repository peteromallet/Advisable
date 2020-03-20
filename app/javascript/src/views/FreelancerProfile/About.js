import React from "react";
import { Box, Text } from "@advisable/donut";
import ExpandableText from "../../components/ExpandableText";

function ProfileAbout({ data }) {
  const specialist = data.specialist;

  return (
    <Box>
      <Text fontSize="l" mb="xs" fontWeight="medium">
        About
      </Text>
      <ExpandableText fontSize="s" color="neutral800" lineHeight="m">
        {specialist.bio}
      </ExpandableText>
    </Box>
  );
}

export default ProfileAbout;
