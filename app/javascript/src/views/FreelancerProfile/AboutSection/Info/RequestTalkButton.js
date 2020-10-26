import React from "react";
import { Button } from "@advisable/donut";
import { useLocation, Link } from "react-router-dom";

function RequestTalkButton({ id, children, ...props }) {
  const location = useLocation();

  return (
    <Link to={{ ...location, pathname: `/request_consultation/${id}` }}>
      <Button {...props} size={["m", "m", "s", "m"]} mx="xxs">
        {children}
      </Button>
    </Link>
  );
}

export default RequestTalkButton;
