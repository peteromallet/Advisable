import React from "react";
import { Box } from "@advisable/donut";
import PreviousProjects from "./PreviousProjects";
import Testimonials from "./Testimonials";
import AboutSection from "./AboutSection";
import useViewer from "src/hooks/useViewer";

function FreelancerProfileDesktop({ data }) {
  console.log("data", data);
  const { id: viewerId } = useViewer();
  const isOwner = viewerId === data.specialist.id;

  return (
    <Box maxWidth="960px" mx="auto">
      <AboutSection specialist={data.specialist} isOwner={isOwner} />
      <PreviousProjects data={data} isOwner={isOwner} />
      <Testimonials reviews={data.specialist.reviews} />
    </Box>
  );
}

export default FreelancerProfileDesktop;
