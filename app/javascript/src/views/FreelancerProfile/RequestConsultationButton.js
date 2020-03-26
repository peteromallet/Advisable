import React from "react";
import { useLocation, Link } from "react-router-dom";
import { RoundedButton, Icon } from "@advisable/donut";

function RequestConsultationButton({ id, children, ...props }) {
  const location = useLocation();

  return (
    <Link to={{ ...location, pathname: `/request_consultation/${id}`}}>

    <RoundedButton
      size="l"
      width="100%"
      prefix={<Icon icon="message-circle" />}
      {...props}
    >
      {children}
    </RoundedButton>
    </Link>
  );
}

export default RequestConsultationButton;
