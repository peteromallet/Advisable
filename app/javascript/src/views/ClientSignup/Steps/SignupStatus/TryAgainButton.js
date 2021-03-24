import React from "react";
import { Button } from "@advisable/donut";
import {
  useResetClientApplication,
  useClientApplicationQuery,
} from "../../queries";
import steps from "../.";
import { useHistory } from "react-router";
import { useLocation } from "react-router";

export default function TryAgainButton(props) {
  const { loading } = useClientApplicationQuery();
  const history = useHistory();
  const location = useLocation();
  const [reset, resetStatus] = useResetClientApplication({
    id: location.state?.applicationId,
  });

  const handleClick = async () => {
    await reset();
    history.replace({ pathname: steps[1].path, state: location.state });
  };

  return (
    <Button
      variant="subtle"
      onClick={handleClick}
      {...props}
      loading={loading || resetStatus.loading}
    >
      Try Again
    </Button>
  );
}
