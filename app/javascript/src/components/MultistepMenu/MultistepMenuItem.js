import React from "react";
import { matchPath, useLocation, NavLink } from "react-router-dom";
import { motion, transform } from "framer-motion";
import { LockClosed } from "@styled-icons/ionicons-solid/LockClosed";
import {
  StyledNavigationMenuItem,
  StyledNavigationMenuLink,
  StyledNavigationProgress,
  StyledNavigationMenuItemStep,
  StyledNavigationMenuItemSteps,
  StyledNavigationMenuItemNumber,
} from "./styles";
import CheckIcon from "src/components/CheckIcon";

function ProgressCircle({ steps }) {
  const location = useLocation();

  const currentStepIndex =
    steps.findIndex((step) =>
      matchPath({ path: step.to, end: true }, location.pathname),
    ) || 0;

  const range = transform(
    currentStepIndex,
    [0, steps.length - 1],
    [0.25, 0.75],
  );

  return (
    <svg
      style={{ width: 24, height: 24, position: "absolute" }}
      viewBox="0 0 24 24"
    >
      <StyledNavigationProgress
        as={motion.path}
        fill="none"
        strokeWidth="2"
        strokeDasharray="0 1"
        d="M 0, 11 a 11, 11 0 1,0 22,0 a 11, 11 0 1,0 -22,0"
        transition={{ duration: 0.3 }}
        style={{
          rotate: 90,
          translateX: 1,
          translateY: 1,
          scaleX: -1, // Reverse direction of line animation
        }}
        initial={{
          pathLength: range,
        }}
        animate={{
          pathLength: range,
        }}
      />
    </svg>
  );
}

export default function MultistepMenuItem({
  to,
  steps = [],
  children,
  isComplete,
  isDisabled,
  exact,
}) {
  const location = useLocation();

  const handleClick = (e) => {
    if (isDisabled) {
      e.preventDefault();
    }
  };

  const checkIsActive = (match, location) => {
    if (match) return true;
    if (steps.length > 0) {
      return steps.some((step) => {
        return matchPath({ path: step.to, exact: true }, location.pathname);
      });
    }
  };

  const rootMatched = matchPath({ path: to }, location.pathname);
  const isActive = checkIsActive(rootMatched, location);

  return (
    <StyledNavigationMenuItem isComplete={isComplete} isDisabled={isDisabled}>
      <StyledNavigationMenuLink
        to={to}
        exact={exact}
        isActive={checkIsActive}
        onClick={handleClick}
      >
        {children}
        {isComplete !== undefined && (
          <StyledNavigationMenuItemNumber>
            {steps.length > 0 && <ProgressCircle steps={steps} />}
            {isComplete ? <CheckIcon /> : null}
            {!isComplete && !isDisabled ? <CheckIcon /> : null}
            {isDisabled ? <LockClosed width={14} /> : null}
          </StyledNavigationMenuItemNumber>
        )}
      </StyledNavigationMenuLink>
      {steps.length > 0 && isActive && (
        <StyledNavigationMenuItemSteps>
          {steps.map((step) => (
            <StyledNavigationMenuItemStep
              as={!step.isDisabled ? NavLink : null}
              $isDisabled={step.isDisabled}
              to={step.to}
              key={step.label}
            >
              {step.label}
            </StyledNavigationMenuItemStep>
          ))}
        </StyledNavigationMenuItemSteps>
      )}
    </StyledNavigationMenuItem>
  );
}
