import React from "react";
import { Button } from "@advisable/donut";
import { useLocation, Link } from "react-router-dom";

function GetInTouchButton({ id, children, ...props }) {
  const location = useLocation();

  return (
    <Link to={{ ...location, pathname: `/request_consultation/${id}` }}>
      <Button {...props}>{children}</Button>
    </Link>
  );
}

export default GetInTouchButton;
