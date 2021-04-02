import React from "react";
import { useHistory, useLocation } from "react-router";
import { Button } from "@advisable/donut";
import {
  useResetClientApplication,
  useClientApplicationQuery,
} from "../../queries";

export default function TryAgainButton(props) {
  const { loading } = useClientApplicationQuery();
  const history = useHistory();
  const location = useLocation();
  const [reset, resetStatus] = useResetClientApplication({
    id: location.state?.applicationId,
  });

  const handleClick = async () => {
    await reset();
    history.replace({
      pathname: "/clients/signup/about_your_company",
      state: { ...location.state },
    });
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
