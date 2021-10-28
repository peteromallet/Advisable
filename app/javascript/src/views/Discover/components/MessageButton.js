import React from "react";
import useViewer from "src/hooks/useViewer";
import MessageButton from "src/views/FreelancerProfile/components/MessageButton";
import ConnectButton from "src/components/ConnectButton";

export default function MessageFreelancerButton({ specialist, ...props }) {
  const viewer = useViewer();

  if (viewer?.id === specialist.id) {
    return null;
  }

  if (viewer?.isSpecialist) {
    return <MessageButton specialist={specialist} {...props} />;
  }

  return <ConnectButton specialist={specialist} marginRight={2} />;
}
