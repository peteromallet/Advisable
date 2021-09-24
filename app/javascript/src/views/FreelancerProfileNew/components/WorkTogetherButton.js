import React from "react";
import { Button } from "@advisable/donut";
import { useLocation, Link } from "react-router-dom";

function WorkTogetherButton({ id, children }) {
  const location = useLocation();

  return (
    <Link to={{ ...location, pathname: `/request_consultation/${id}` }}>
      <Button
        variant="dark"
        width={["100%", "auto"]}
        size={["m", "m", "l"]}
        mb={[4, 0, 0, 6]}
      >
        {children}
      </Button>
    </Link>
  );
}

export default WorkTogetherButton;
