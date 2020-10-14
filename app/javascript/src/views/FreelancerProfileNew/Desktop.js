import React from "react";
import { Box } from "@advisable/donut";
import PreviousProjects from "./PreviousProjects";
import Testimonials from "./Testimonials";
import AboutSection from "./AboutSection";
import useViewer from "src/hooks/useViewer";
// import QA from "./QA";

function FreelancerProfileDesktop({ data }) {
  const viewer = useViewer();
  const isOwner = viewer?.id === data.specialist.id;

  return (
    <Box
      maxWidth={["100%", "100%", "100%", "960px"]}
      mx={["12px", "32px", "32px", "auto"]}
      mb="64px"
    >
      <AboutSection
        specialist={data.specialist}
        isOwner={isOwner}
        viewer={viewer}
      />
      <PreviousProjects data={data} isOwner={isOwner} />
      <Testimonials reviews={data.specialist.reviews} />
      {/* <QA questions={data.questions} answers={data.specialist.answers} /> */}
    </Box>
  );
}

export default FreelancerProfileDesktop;
