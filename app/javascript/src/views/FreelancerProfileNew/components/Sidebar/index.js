import React from "react";
import { Map } from "@styled-icons/heroicons-outline/Map";
import { Button, Box, Text } from "@advisable/donut";
import PassportAvatar from "src/components/PassportAvatar";

export default function Sidebar({ data }) {
  const bio = data.specialist.bio.slice(0, 140);

  return (
    <Box position="relative" top="-156px">
      <Box position="sticky" top="108px" width="280px" mr={8} ml={7}>
        <PassportAvatar
          size="2xl"
          name={data.specialist.name}
          src={data.specialist.avatar}
          marginBottom={4}
        />
        <Text
          fontSize="5xl"
          fontWeight="semibold"
          color="neutral900"
          lineHeight="4xl"
          letterSpacing="-0.03rem"
          marginBottom={1.5}
        >
          {data.specialist.name}
        </Text>
        <Box display="flex" color="neutral400" alignItems="center" mb={4}>
          <Map height="20px" width="20px" color="neutral500" />
          <Text
            fontSize="17px"
            fontWeight="medium"
            color="neutral400"
            lineHeight="l"
            marginLeft={1}
          >
            {data.specialist.location}
          </Text>
        </Box>
        <Text fontSize="l" lineHeight="l" color="neutral700" mb={7}>
          {bio}
        </Text>
        <Button variant="gradient" size="l">
          Work together
        </Button>
      </Box>
    </Box>
  );
}
