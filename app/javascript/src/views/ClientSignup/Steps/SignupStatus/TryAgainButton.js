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
  const { data, loading } = useClientApplicationQuery();
  const history = useHistory();
  const location = useLocation();
  const [reset] = useResetClientApplication({
    id: location.state?.applicationId,
    firstName: location.state?.firstName,
    lastName: location.state?.lastName,
    companyName: data?.clientApplication?.companyName,
    companyType: data?.clientApplication?.companyType,
    industry: data?.clientApplication?.industry,
  });

  const handleClick = async () => {
    reset();
    history.replace({ pathname: steps[1].path, state: location.state });
  };

  return (
    <Button variant="subtle" onClick={handleClick} {...props} loading={loading}>
      Try Again
    </Button>
  );
}
