import React from "react";
import useViewer from "src/hooks/useViewer";
import AnonymousNavigation from "./AnonymousNavigation";
import ClientNavigation from "./ClientNavigation";
import FreelancerNavigation from "./FreelancerNavigation";

export default function Navigation(props) {
  const viewer = useViewer();

  if (viewer?.isClient && viewer.isAccepted) {
    return <ClientNavigation {...props} />;
  }

  if (viewer?.isSpecialist && viewer.isAccepted) {
    return <FreelancerNavigation {...props} />;
  }

  return <AnonymousNavigation {...props} />;
}
