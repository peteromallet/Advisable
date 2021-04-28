import React, { useMemo, useCallback } from "react";
import { matchPath } from "react-router-dom";
import Route from "src/components/Route";
import usePathnameQueue from "src/utilities/usePathnameQueue";
import { findIndex } from "lodash-es";

function useSteps(steps) {
  const [currentPathname, previousPathname] = usePathnameQueue(2);
  const activeSteps = useMemo(() => steps.filter((step) => !step.passive), [
    steps,
  ]);

  // STEPS search methods
  const matchStepPath = useCallback(
    (pathname) => (step) =>
      matchPath(pathname, {
        path: step.path,
        exact: step.exact,
        strict: step.strict,
      }),
    [],
  );

  // Indexes
  const prevPathMatchedIndex = findIndex(
    steps,
    matchStepPath(previousPathname),
  );
  const currentStepIndex = findIndex(steps, matchStepPath(currentPathname));
  const currentActiveStepIndex = findIndex(
    activeSteps,
    matchStepPath(currentPathname),
  );

  // Use forwards value to determine the direction of a movement between steps
  const forwards = prevPathMatchedIndex <= currentStepIndex;

  // Number of steps
  const numberOfSteps = steps.length;
  const numberOfActiveSteps = activeSteps.length;

  const nextStep = useMemo(() => steps[currentStepIndex + 1] || steps[0], [
    currentStepIndex,
    steps,
  ]);
  const prevStep = useMemo(() => steps[currentStepIndex - 1], [
    currentStepIndex,
    steps,
  ]);

  const initialStep = useMemo(() => steps[0], [steps]);
  const lastStep = useMemo(() => steps[activeSteps.length - 1], [
    activeSteps.length,
    steps,
  ]);

  // Route components for React Router
  const routes = useMemo(
    () =>
      steps.map((step, index) => (
        <Route key={`step-${index}`} path={step.path} exact={step.exact}>
          {step.component ? (
            <step.component
              nextStep={nextStep}
              prevStep={prevStep}
              forwards={forwards}
            />
          ) : (
            <React.Fragment />
          )}
        </Route>
      )),
    [forwards, nextStep, prevStep, steps],
  );

  return {
    routes,
    forwards,
    nextStep,
    prevStep,
    lastStep,
    initialStep,
    numberOfSteps,
    numberOfActiveSteps,
    currentStepIndex,
    currentActiveStepIndex,
  };
}

export default useSteps;
