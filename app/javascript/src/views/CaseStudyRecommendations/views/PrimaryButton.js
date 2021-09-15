import React from "react";
import { Button, Link } from "@advisable/donut";
import useViewer from "src/hooks/useViewer";
import MessageButton from "src/views/FreelancerProfile/AboutSection/Info/MessageButton";

export default function PrimaryButton({ specialist }) {
  const viewer = useViewer();

  if (viewer?.id === specialist.id) {
    return null;
  }

  if (viewer?.isSpecialist) {
    return <MessageButton specialist={specialist} />;
  }

  return (
    <Button
      as={Link}
      variant="gradient"
      target="_blank"
      size={{ _: "l", l: "md" }}
      width={{ _: "100%", md: null }}
      to={`/request_consultation/${specialist.id}`}
    >
      Work Together
    </Button>
  );
}
