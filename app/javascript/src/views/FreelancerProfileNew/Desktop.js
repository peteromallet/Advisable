import React from "react";
import { Box } from "@advisable/donut";
import PreviousProjects from "./PreviousProjects";
import NoProjects from "./NoProjects";
import Testimonials from "./Testimonials";
import AboutSection from "./AboutSection";
import useViewer from "src/hooks/useViewer";
// import QA from "./QA";

function FreelancerProfileDesktop({ data }) {
  const viewer = useViewer();
  const isOwner = viewer?.id === data.specialist.id;
  const hasReviews = data.specialist.reviews.length > 0;

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
      {data.specialist.profileProjects.length > 0 && (
        <PreviousProjects data={data} isOwner={isOwner} />
      )}
      {data.specialist.profileProjects.length === 0 && (
        <NoProjects data={data} isOwner={isOwner} />
      )}
      {hasReviews && <Testimonials reviews={data.specialist.reviews} />}
      {/* <QA questions={data.questions} answers={data.specialist.answers} /> */}
    </Box>
  );
}

export default FreelancerProfileDesktop;
