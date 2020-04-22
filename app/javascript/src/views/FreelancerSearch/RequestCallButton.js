import React from "react";
import { Button, Icon } from "@advisable/donut";
import useViewer from "../../hooks/useViewer";
import calendly from "../../utilities/calendly";

const RequestCallButton = ({ children, ...props }) => {
  const viewer = useViewer();

  const handleSubmit = () => {
    calendly(
      "https://calendly.com/advisable-marketing/advisable-briefing-call-app/12-19-2018",
      {
        full_name: viewer.name,
        email: viewer.email,
      },
    );
  };

  return (
    <Button
      variant="secondary"
      prefix={<Icon icon="phone" />}
      {...props}
      onClick={handleSubmit}
    >
      {children}
    </Button>
  );
};

export default RequestCallButton;
