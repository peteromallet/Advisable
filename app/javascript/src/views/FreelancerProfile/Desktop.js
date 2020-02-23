// Renders the desktop version of the freelancer profile
import React from "react";
import { Box } from "@advisable/donut";
import About from "./About";
import ProfileImage from "./ProfileImage";
import ProfileSkills from "./ProfileSkills";

function FreelancerProfileDesktop({ data }) {
  return (
    <Box maxWidth={1200} mx="auto" py="l" display="flex">
      <Box width={320} flexShrink={0}>
        <ProfileImage data={data} />
        <About data={data} />
        <ProfileSkills data={data} />
      </Box>
      <Box pl="xxl">Profile</Box>
    </Box>
  );
}

export default FreelancerProfileDesktop;
