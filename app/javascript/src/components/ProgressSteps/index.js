import React from "react";
import { findIndex } from "lodash";
import { NavLink, matchPath, useLocation } from "react-router-dom";
import { StyledProgressSteps, StyledProgressStepsStep } from "./styles";

const ProgressSteps = ({ steps }) => {
  const location = useLocation();
  const currentIndex = findIndex(steps, step => {
    return matchPath(location.pathname, {
      path: step.url,
    });
  });

  const isComplete = index => index < currentIndex;
  const isActive = index => index === currentIndex;
  const isDisabled = index => index > currentIndex;

  const handleClick = index => e => {
    if (isDisabled(index)) {
      e.preventDefault();
    }
  };

  return (
    <StyledProgressSteps>
      {steps.map((step, index) => {
        if (!step.label) return null;
        return (
          <StyledProgressStepsStep
            key={step.url}
            isActive={isActive(index)}
            isDisabled={isDisabled(index)}
            isComplete={isComplete(index)}
          >
            <NavLink
              to={{
                ...location,
                pathname: step.url,
              }}
              onClick={handleClick(index)}
              aria-current="step"
            >
              {step.label}
            </NavLink>
          </StyledProgressStepsStep>
        );
      })}
    </StyledProgressSteps>
  );
};

export default ProgressSteps;
