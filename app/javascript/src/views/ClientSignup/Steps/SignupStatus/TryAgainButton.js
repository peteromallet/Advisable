import React from "react";
import { Button } from "@advisable/donut";
import { useResetClientApplication } from "../../queries";
import steps from "../.";
import { useHistory } from "react-router";
import { useLocation } from "react-router";

export default function TryAgainButton(props) {
  const history = useHistory();
  const location = useLocation();
  const [reset] = useResetClientApplication({
    id: location.state.applicationId,
    firstName: location.state.firstName,
    lastName: location.state.lastName,
  });

  const handleClick = async () => {
    reset();

    history.replace({ pathname: steps[1].path, state: location.state });
  };

  return (
    <Button variant="subtle" onClick={handleClick} {...props}>
      Try Again
    </Button>
  );
}
