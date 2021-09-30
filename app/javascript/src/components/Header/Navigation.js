import React from "react";
import useViewer from "src/hooks/useViewer";
import AnonymousNavigation from "./AnonymousNavigation";
import ClientNavigation from "./ClientNavigation";
import FreelancerNavigation from "./FreelancerNavigation";

export default function Navigation() {
  const viewer = useViewer();

  if (viewer?.isClient && viewer.isAccepted) {
    return <ClientNavigation />;
  }

  if (viewer?.isSpecialist && viewer.isAccepted) {
    return <FreelancerNavigation />;
  }

  return <AnonymousNavigation />;
}
