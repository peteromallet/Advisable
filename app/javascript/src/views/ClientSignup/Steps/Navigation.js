import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Redirect, useLocation } from "react-router";
import { useNotifications } from "src/components/Notifications";
import STEPS from ".";
import useSteps from "src/hooks/useSteps";

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
  const location = useLocation();
  const [params, setParams] = useState();
  const notifications = useNotifications();

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
              state: { ...location.state },
            },
          };
        case "LAST_STEP":
          return {
            push: !!lastStep.push,
            to: { pathname: lastStep.path, state: { ...location.state } },
          };
        case "NEXT_STEP":
          return {
            push: !!nextStep.push,
            to: {
              pathname: nextStep.path,
              state: { applicationId, ...location.state },
            },
          };
        default:
          return null;
      }
    };

    const timer = setTimeout(() => {
      if (error) setParams(reduce("INITIAL_STEP"));
      if (existingAccount) {
        notifications.notify(
          "You already have an account with the provided email",
        );
        setParams(reduce("LOGIN_PAGE"));
      }
      if (emailNotAllowed) setParams(reduce("EMAIL_NOT_ALLOWED"));
      if (status && status !== "Application Started")
        setParams(reduce("LAST_STEP"));
      if (
        called &&
        (location.state?.applicationId || applicationId) &&
        location.state?.email
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
    applicationId,
    emailNotAllowed,
    existingAccount,
    notifications,
    location.state,
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
