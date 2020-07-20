import React, { useMemo, useCallback } from "react";
import { Route, useHistory, matchPath, useLocation } from "react-router-dom";

function useSteps(steps) {
  const history = useHistory();
  const location = useLocation();

  // STEPS search methods
  const currentStepIndex = useMemo(
    () =>
      steps.findIndex((step) =>
        matchPath(location.pathname, {
          path: step.path,
          exact: step.exact,
          strict: step.strict,
        }),
      ),
    [location, steps],
  );
  const nextStep = useCallback(() => steps[currentStepIndex + 1], [
    currentStepIndex,
    steps,
  ]);
  const prevStep = useCallback(() => steps[currentStepIndex - 1], [
    currentStepIndex,
    steps,
  ]);

  // Navigation methods
  const pushNextStepPath = useCallback(
    (props) => {
      const nextPath = nextStep()?.path;
      history.push(nextPath, props.state);
    },
    [history, nextStep],
  );
  const pushPrevStepPath = useCallback(
    (props) => {
      const prevPath = prevStep()?.path;
      history.push(prevPath, props?.state);
    },
    [history, prevStep],
  );
  const pushInitialStepPath = useCallback(
    (props) => history.push(steps[0].path, props?.state),
    [history, steps],
  );

  // Route components for React Router
  const routes = useMemo(
    () =>
      steps.map((step, index) => (
        <Route key={index} path={step.path} exact={step.exact}>
          <step.component
            pushNextStepPath={pushNextStepPath}
            pushPrevStepPath={pushPrevStepPath}
            pushInitialStepPath={pushInitialStepPath}
          />
        </Route>
      )),
    [pushInitialStepPath, pushNextStepPath, pushPrevStepPath, steps],
  );
  return {
    nextStep,
    prevStep,
    pushInitialStepPath,
    pushNextStepPath,
    pushPrevStepPath,
    routes,
    currentStepIndex,
  };
}

export default useSteps;
