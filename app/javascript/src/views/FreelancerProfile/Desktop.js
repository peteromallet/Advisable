// Renders the desktop version of the freelancer profile
import React from "react";
import { Box } from "@advisable/donut";
import About from "./About";
import Reviews from "./Reviews";
import Projects from "./Projects";
import ProfileImage from "./ProfileImage";
import ProfileSkills from "./ProfileSkills";

function FreelancerProfileDesktop({ data }) {
  return (
    <Box maxWidth={1160} mx="auto" py="l" display="flex">
      <Box width={320} flexShrink={0}>
        <ProfileImage data={data} />
        <About data={data} />
        <ProfileSkills data={data} />
      </Box>
      <Box pl="80px" width="100%">
        <Box mb="l">
          <Projects data={data} />
        </Box>
        <Reviews data={data} />
      </Box>
    </Box>
  );
}

export default FreelancerProfileDesktop;
