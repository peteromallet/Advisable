import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Button, Icon } from "@advisable/donut";

function RequestConsultationButton({ id, children, ...props }) {
  const location = useLocation();

  return (
    <Link to={{ ...location, pathname: `/request_consultation/${id}` }}>
      <Button
        size="l"
        width="100%"
        prefix={<Icon icon="message-circle" />}
        {...props}
      >
        {children}
      </Button>
    </Link>
  );
}

export default RequestConsultationButton;
