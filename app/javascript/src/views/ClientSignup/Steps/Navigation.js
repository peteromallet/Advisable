import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router";
import STEPS from ".";
import useSteps from "../useSteps";
import { useLocationState } from "../queries";

const Navigation = ({
  error,
  delay,
  called,
  status,
  existingAccount,
  emailNotAllowed,
  applicationId,
}) => {
  const { nextStep, lastStep, initialStep } = useSteps(STEPS);
  const locationState = useLocationState();
  const [params, setParams] = useState();

  useEffect(() => {
    const reduce = (action) => {
      switch (action) {
        case "INITIAL_STEP":
          return {
            push: !!initialStep.push,
            to: { pathname: initialStep.path },
          };
        case "LOGIN_PAGE":
          return { to: { pathname: "/login" } };
        case "EMAIL_NOT_ALLOWED":
          return {
            push: true,
            to: {
              pathname: "/clients/signup/email-not-allowed",
              state: { ...locationState },
            },
          };
        case "LAST_STEP":
          return {
            push: !!lastStep.push,
            to: { pathname: lastStep.path, state: { ...locationState } },
          };
        case "NEXT_STEP":
          return {
            push: !!nextStep.push,
            to: {
              pathname: nextStep.path,
              state: { applicationId, ...locationState },
            },
          };
        default:
          return null;
      }
    };

    const timer = setTimeout(() => {
      if (error) setParams(reduce("INITIAL_STEP"));
      if (existingAccount) setParams(reduce("LOGIN_PAGE"));
      if (emailNotAllowed) setParams(reduce("EMAIL_NOT_ALLOWED"));
      if (status && status !== "STARTED") setParams(reduce("LAST_STEP"));
      if (
        called &&
        (locationState?.applicationId || applicationId) &&
        locationState?.email
      )
        setParams(reduce("NEXT_STEP"));
    }, delay || 0);

    return () => clearTimeout(timer);
  }, [
    delay,
    error,
    status,
    called,
    nextStep,
    lastStep,
    initialStep,
    locationState,
    applicationId,
    emailNotAllowed,
    existingAccount,
  ]);

  if (params) return <Redirect {...params} />;
  return null;
};

Navigation.propTypes = {
  error: PropTypes.object,
  delay: PropTypes.number,
  called: PropTypes.bool,
  status: PropTypes.string,
  existingAccount: PropTypes.bool,
  emailNotAllowed: PropTypes.bool,
  applicationId: PropTypes.string,
};

export default Navigation;
