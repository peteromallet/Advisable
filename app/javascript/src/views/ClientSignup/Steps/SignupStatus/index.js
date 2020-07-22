import React from "react";
import PropTypes from "prop-types";
import { useClientApplicationQuery } from "../../queries";
import Loading from "../../../../components/Loading";
import AcceptedStatus from "./AcceptedStatus";
import NotHiringStatus from "./NotHiringStatus";
import CheapStatus from "./CheapStatus";

function SignupStatus({ RedirectToInitialStep, RedirectToNextStep }) {
  const { loading, error, data } = useClientApplicationQuery();

  if (loading) return <Loading />;
  if (error) return <RedirectToInitialStep />;
  const {
    status,
    rejectionReason,
    firstName,
    lastName,
  } = data.clientApplication;

  if (status === "ACCEPTED") {
    return <AcceptedStatus />;
  } else if (rejectionReason === "NOT_HIRING") {
    return <NotHiringStatus />;
  } else {
    return <CheapStatus />;
  }
}

SignupStatus.propTypes = {
  pushInitialStepPath: PropTypes.func,
};

export default SignupStatus;
