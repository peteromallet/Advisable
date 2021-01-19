import React from "react";
import PreviousProjects from "../PreviousProjects";
import Testimonials from "../Testimonials";
import NoProjects from "../NoProjects";
import CallToActionBox from "../CallToActionBox";
import useViewer from "src/hooks/useViewer";

export default function MainProfile({ isOwner, data }) {
  const viewer = useViewer();
  const viewerIsGuild = viewer?.guild || false;
  const reviews = data.specialist.reviews.filter((r) => r.comment);
  const hasReviews = reviews.length > 0;

  return (
    <>
      {data.specialist.previousProjects.nodes.length > 0 && (
        <PreviousProjects data={data} isOwner={isOwner} />
      )}
      {data.specialist.previousProjects.nodes.length === 0 && (
        <NoProjects data={data} isOwner={isOwner} />
      )}
      {hasReviews && <Testimonials reviews={reviews} />}
      {!isOwner && !viewerIsGuild && (
        <CallToActionBox specialist={data.specialist} />
      )}
    </>
  );
}
