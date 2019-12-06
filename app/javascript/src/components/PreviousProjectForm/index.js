import PropTypes from "prop-types";
import { findIndex } from "lodash";
import React, { useMemo, useState, useEffect } from "react";
import { Modal } from "@advisable/donut";
import {
  useLocation,
  Switch,
  Route,
  Redirect,
  matchPath,
  useHistory,
} from "react-router-dom";
import { buildSteps } from "./steps";

const PreviousProjectForm = ({ modal }) => {
  const history = useHistory();
  const { pathname } = useLocation();
  const STEPS = useMemo(() => buildSteps(pathname), []);
  const currentIndex = findIndex(STEPS, step =>
    matchPath(pathname, { path: step.path })
  );

  const [values, setValues] = useState({});

  const next = values => {
    setValues(existing => ({ ...existing, ...values }));
    const nextPath = STEPS[currentIndex + 1];
    if (nextPath) {
      history.push(nextPath.path);
    }
  };

  const back = () => {
    const previous = STEPS[currentIndex - 1];
    if (previous) {
      history.push(previous.path);
    }
  };

  return (
    <Modal modal={modal} padding="l" width={650} label="Add previous project">
      <Switch>
        {STEPS.map(step => (
          <Route
            key={step.path}
            path={step.path}
            render={() => (
              <step.component values={values} next={next} back={back} />
            )}
          />
        ))}
      </Switch>
    </Modal>
  );
};

PreviousProjectForm.propTypes = {
  modal: PropTypes.object.isRequired,
};

export default PreviousProjectForm;
