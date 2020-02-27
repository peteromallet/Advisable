// Renders the desktop version of the freelancer profile
import React from "react";
import { Box } from "@advisable/donut";
import About from "./About";
import Reviews from "./Reviews";
import Masonry from "./Masonry";
import ProjectCard from "./ProjectCard";
import ProfileImage from "./ProfileImage";
import ProfileSkills from "./ProfileSkills";
import ProjectFilters from "./ProjectFilters";
import Sticky from "../../components/Sticky";

function FreelancerProfileDesktop({ data, projects }) {
  return (
    <Box maxWidth={1200} mx="auto" py="l" display="flex">
      <Box width={320} flexShrink={0}>
        <Sticky>
          <ProfileImage data={data} />
          <About data={data} />
          <ProfileSkills data={data} />
        </Sticky>
      </Box>
      <Box pl="80px" width="100%">
        <Box mb="l">
          <ProjectFilters data={data} />
          <Masonry>
            {projects.map(we => (
              <ProjectCard key={we.id} project={we} />
            ))}
          </Masonry>
        </Box>
        <Reviews data={data} />
      </Box>
    </Box>
  );
}

export default FreelancerProfileDesktop;
