import React from "react";
import { ChatAlt } from "@styled-icons/heroicons-solid/ChatAlt";
import { Button, Link } from "@advisable/donut";
import useViewer from "src/hooks/useViewer";
import MessageButton from "src/views/FreelancerProfile/AboutSection/Info/MessageButton";

export default function MessageFreelancerButton({ specialist, ...props }) {
  const viewer = useViewer();

  if (viewer?.id === specialist.id) {
    return null;
  }

  if (viewer?.isSpecialist) {
    return <MessageButton specialist={specialist} {...props} />;
  }

  return (
    <Button
      as={Link}
      target="_blank"
      variant="gradient"
      to={`/request_consultation/${specialist.id}`}
      prefix={<ChatAlt />}
      {...props}
    >
      Message
    </Button>
  );
}
