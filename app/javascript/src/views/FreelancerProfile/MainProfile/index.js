import React from "react";
import PreviousProjects from "../PreviousProjects";
import Testimonials from "../Testimonials";
import NoProjects from "../NoProjects";
import CallToActionBox from "../CallToActionBox";

export default function MainProfile({ isOwner, data }) {
  const reviews = data.specialist.reviews.filter((r) => r.comment);
  const hasReviews = reviews.length > 0;

  return (
    <>
      {data.specialist.profileProjects.length > 0 && (
        <PreviousProjects data={data} isOwner={isOwner} />
      )}
      {data.specialist.profileProjects.length === 0 && (
        <NoProjects data={data} isOwner={isOwner} />
      )}
      {hasReviews && <Testimonials reviews={reviews} />}
      {!isOwner && <CallToActionBox specialist={data.specialist} />}
    </>
  );
}
