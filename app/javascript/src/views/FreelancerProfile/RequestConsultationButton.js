import React from "react";
import { Button } from "@advisable/donut";
import { useLocation, Link } from "react-router-dom";
import { MessageCircle } from "@styled-icons/feather";

function RequestConsultationButton({ id, children, ...props }) {
  const location = useLocation();

  return (
    <Link to={{ ...location, pathname: `/request_consultation/${id}` }}>
      <Button size="l" width="100%" prefix={<MessageCircle />} {...props}>
        {children}
      </Button>
    </Link>
  );
}

export default RequestConsultationButton;
