import React, { useLayoutEffect } from "react";
import { Map } from "@styled-icons/heroicons-outline/Map";
import { Button, Box, Text, useTheme } from "@advisable/donut";
import Loading from "src/components/Loading";
import PassportAvatar from "src/components/PassportAvatar";
import NotFound, { isNotFound } from "src/views/NotFound";
import CoverPhoto from "./components/CoverPhoto";
import { useProfileData } from "./queries";

export default function FreelancerProfileNew() {
  const { loading, data, error } = useProfileData();
  const theme = useTheme();

  // Set background color to white
  useLayoutEffect(() => {
    theme.updateTheme({ background: "white" });
    return () => theme.updateTheme({ background: "default" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loading />;
  if (isNotFound(error)) return <NotFound />;

  return (
    <Box
      pb="2xl"
      mx={["12px", "32px", "32px", "auto"]}
      maxWidth={{ _: "100%", l: "1080px" }}
    >
      <CoverPhoto />
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
        {data.specialist.bio}
      </Text>
      <Button variant="gradient" size="l">
        Work together
      </Button>
    </Box>
  );
}
