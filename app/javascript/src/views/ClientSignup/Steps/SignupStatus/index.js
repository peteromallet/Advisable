import React from "react";
import { Redirect } from "react-router";
import { useClientApplicationQuery } from "../../queries";
import Loading from "src/components/Loading";
import AcceptedStatus from "./AcceptedStatus/index";
import NotHiringStatus from "./NotHiringStatus";
import CheapStatus from "./CheapStatus";

function SignupStatus() {
  const { loading, error, data } = useClientApplicationQuery();

  if (loading) return <Loading />;
  if (error) return <Redirect to="/client/signup" />;

  const {
    status,
    rejectionReason,
    firstName,
    lastName,
  } = data.clientApplication;

  if (status === "Application Accepted") {
    return <AcceptedStatus firstName={firstName} lastName={lastName} />;
  } else if (rejectionReason === "NOT_HIRING") {
    return <NotHiringStatus />;
  } else {
    return <CheapStatus />;
  }
}

export default SignupStatus;
