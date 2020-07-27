import React from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router";
import STEPS from ".";
import useSteps from "../useSteps";
import { useLocationState } from "../queries";

const Navigation = ({
  error,
  called,
  status,
  existingAccount,
  emailNotAllowed,
  email,
  applicationId,
}) => {
  const {
    RedirectToInitialStep,
    RedirectToNextStep,
    RedirectToLastStep,
  } = useSteps(STEPS);
  const locationState = useLocationState();
  if (error) return <RedirectToInitialStep />;
  if (existingAccount) return <Redirect push to="/login" />;
  if (emailNotAllowed)
    return <Redirect push to="/clients/signup/email-not-allowed" />;
  if (
    called &&
    (locationState?.applicationId || applicationId) &&
    (locationState?.email || email)
  ) {
    return (
      <RedirectToNextStep state={{ applicationId, email, ...locationState }} />
    );
  }
  if (status && status !== "STARTED")
    return <RedirectToLastStep state={{ ...locationState }} />;

  return null;
};

Navigation.propTypes = {
  error: PropTypes.object,
  called: PropTypes.bool,
  status: PropTypes.string,
  existingAccount: PropTypes.bool,
  emailNotAllowed: PropTypes.bool,
  applicationId: PropTypes.string,
  email: PropTypes.string,
};

export default Navigation;
