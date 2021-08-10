import React, { useLayoutEffect } from "react";
import { Box, Text, useTheme } from "@advisable/donut";
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
      />
      <Text
        fontSize="5xl"
        fontWeight="600"
        color="neutral900"
        lineHeights="4xl"
        letterSpacing="-0.03rem"
      >
        {data.specialist.name}
      </Text>
    </Box>
  );
}
