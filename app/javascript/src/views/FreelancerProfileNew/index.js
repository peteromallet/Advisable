import React from "react";
// Hooks
import useLogoURL from "src/components/ApplicationProvider/useLogoURL";
import { useParams } from "react-router-dom";
import useViewer from "src/hooks/useViewer";
import { useQuery } from "@apollo/client";
// Components
import NotFound, { isNotFound } from "../NotFound";
import PreviousProjects from "./PreviousProjects";
import Loading from "src/components/Loading";
import Testimonials from "./Testimonials";
import AboutSection from "./AboutSection";
import { Box } from "@advisable/donut";
import NoProjects from "./NoProjects";
// Queries
import { GET_PROFILE } from "./queries";

function FreelancerProfileNew() {
  useLogoURL("https://advisable.com");
  const params = useParams();
  const viewer = useViewer();
  const { loading, data, error } = useQuery(GET_PROFILE, {
    variables: {
      id: params.id,
    },
  });

  if (loading) return <Loading />;
  if (isNotFound(error)) return <NotFound />;

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
    </Box>
  );
}

export default FreelancerProfileNew;
