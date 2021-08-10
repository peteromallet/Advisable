import React from "react";
import { Box } from "@advisable/donut";
import Loading from "src/components/Loading";
import PassportAvatar from "src/components/PassportAvatar";
import NotFound, { isNotFound } from "src/views/NotFound";
import CoverPhoto from "./components/CoverPhoto";
import { useProfileData } from "./queries";

export default function FreelancerProfileNew() {
  const { loading, data, error } = useProfileData();
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
        size="xl"
        name={data.specialist.name}
        src={data.specialist.avatar}
      />
    </Box>
  );
}
