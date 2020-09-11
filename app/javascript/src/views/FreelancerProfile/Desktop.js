// Renders the desktop version of the freelancer profile
import React from "react";
import Sticky from "react-stickynode";
import { Box, useBreakpoint } from "@advisable/donut";
import About from "./About";
import Reviews from "./Reviews";
import Masonry from "components/Masonry";
import NoProjects from "./NoProjects";
import ProjectCard from "./ProjectCard";
import ProfileImage from "./ProfileImage";
import ProfileSkills from "./ProfileSkills";
import ProjectFilters from "./ProjectFilters";
import NoFilteredProjects from "./NoFilteredProjects";
import useFilteredProjects from "./useFilteredProjects";
import RequestConsultationButton from "./RequestConsultationButton";

function FreelancerProfileDesktop({ data }) {
  const id = data.specialist.id;
  const isLargeScreen = useBreakpoint("lUp");
  const projects = useFilteredProjects(data);
  const hasReviews = data.specialist.reviews.length > 0;

  return (
    <Box maxWidth={1250} px="m" mx="auto" py="l" display="flex">
      <Box width={320} flexShrink={0}>
        <Sticky enabled>
          <ProfileImage data={data} showReviews={hasReviews} />
          <RequestConsultationButton mt="l" mb="l" id={id}>
            Request Consultation
          </RequestConsultationButton>
          <About data={data} />
          <ProfileSkills data={data} />
        </Sticky>
      </Box>
      <Box pl="80px" width="100%">
        <Box mb="l">
          {data.specialist.profileProjects.length > 0 && (
            <>
              <ProjectFilters data={data} />
              {projects.length > 0 ? (
                <>
                  <Masonry columns={isLargeScreen ? 2 : 1}>
                    {projects.map((we) => (
                      <ProjectCard
                        key={we.id}
                        project={we}
                        specialistId={data.specialist.id}
                      />
                    ))}
                  </Masonry>
                </>
              ) : (
                <NoFilteredProjects data={data} />
              )}
            </>
          )}
          {data.specialist.profileProjects.length === 0 && (
            <NoProjects data={data} />
          )}
        </Box>
        {hasReviews && <Reviews data={data} />}
      </Box>
    </Box>
  );
}

export default FreelancerProfileDesktop;
