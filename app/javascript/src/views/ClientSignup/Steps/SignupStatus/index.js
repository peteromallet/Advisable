import React from "react";
import PropTypes from "prop-types";
import { useClientApplicationQuery } from "../../queries";
import Loading from "../../../../components/Loading";
import AcceptedStatus from "./AcceptedStatus";
import NotHiringStatus from "./NotHiringStatus";
import CheapStatus from "./CheapStatus";

function SignupStatus({ pushInitialStepPath }) {
  const { loading, error, data } = useClientApplicationQuery();

  if (error) pushInitialStepPath();
  if (loading) return <Loading />;
  const { status, rejectionReason } = data.clientApplication;

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
