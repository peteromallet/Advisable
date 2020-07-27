import React from "react";
import { matchPath, useLocation, useRouteMatch } from "react-router-dom";
import { motion, useSpring, useMotionValue, transform } from "framer-motion";
import {
  StyledNavigationMenuItem,
  StyledNavigationMenuLink,
  StyledNavigationProgress,
  StyledNavigationMenuItemStep,
  StyledNavigationMenuItemSteps,
  StyledNavigationMenuItemNumber,
} from "./styles";

function Check() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="8"
      fill="none"
      viewBox="0 0 10 8"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M9.799.243a.87.87 0 01-.016 1.131l-5.893 6.4a.66.66 0 01-.994 0L.217 4.865a.87.87 0 01-.015-1.131.662.662 0 011.01-.017l2.18 1.569L8.789.226a.662.662 0 011.01.017z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

function ProgressCircle({ steps }) {
  const location = useLocation();

  const currentStepIndex =
    steps.findIndex((step) =>
      matchPath(location.pathname, { path: step.to, exact: true }),
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
        return matchPath(location.pathname, { path: step.to, exact: true });
      });
    }
  };

  const rootMatched = matchPath(location.pathname, { path: to });
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
            <Check />
          </StyledNavigationMenuItemNumber>
        )}
      </StyledNavigationMenuLink>
      {steps.length > 0 && isActive && (
        <StyledNavigationMenuItemSteps>
          {steps.map((step) => (
            <StyledNavigationMenuItemStep to={step.to} key={step.label}>
              {step.label}
            </StyledNavigationMenuItemStep>
          ))}
        </StyledNavigationMenuItemSteps>
      )}
    </StyledNavigationMenuItem>
  );
}
