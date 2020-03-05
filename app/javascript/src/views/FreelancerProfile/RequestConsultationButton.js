import React from "react";
import { useLocation, Link } from "react-router-dom";
import { RoundedButton, Icon } from "@advisable/donut";

function RequestConsultationButton({ id, children, ...props }) {
  const location = useLocation();

  return (
    <RoundedButton
      size="l"
      as={Link}
      width="100%"
      to={{
        ...location,
        pathname: `/request_consultation/${id}`,
      }}
      prefix={<Icon icon="message-circle" />}
      {...props}
    >
      {children}
    </RoundedButton>
  );
}

export default RequestConsultationButton;
