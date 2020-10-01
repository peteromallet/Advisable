import React from "react";
import { Box } from "@advisable/donut";
import PreviousProjects from "./PreviousProjects";
import Testimonials from "./Testimonials";
import AboutSection from "./AboutSection";
import useViewer from "src/hooks/useViewer";
import QA from "./QA";

function FreelancerProfileDesktop({ data }) {
  const viewer = useViewer();
  const isOwner = viewer?.id === data.specialist.id;
  console.log("viewer", viewer);
  console.log("is owner", isOwner);

  return (
    <Box maxWidth="960px" mx="auto">
      <AboutSection
        specialist={data.specialist}
        isOwner={isOwner}
        viewer={viewer}
      />
      <PreviousProjects data={data} isOwner={isOwner} />
      <Testimonials reviews={data.specialist.reviews} />
      <QA questions={data.questions} answers={data.specialist.answers} />
    </Box>
  );
}

export default FreelancerProfileDesktop;
