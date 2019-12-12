import PropTypes from "prop-types";
import { findIndex } from "lodash";
import { useQuery, useMutation } from "react-apollo";
import { Modal, StyledModalWindowContainer } from "@advisable/donut";
import React, { useMemo, useState } from "react";
import {
  useLocation,
  Switch,
  Route,
  matchPath,
  useHistory,
} from "react-router-dom";
import { buildSteps } from "./steps";
import GET_DATA from "./getData";
import CREATE_PROJECT from "./createOffPlatformProject";
import useScrollRestore from "../../utilities/useScrollRestore";

const PreviousProjectForm = ({
  modal,
  specialist,
  mutationUpdate,
  pathPrefix,
  onSuccess,
}) => {
  const history = useHistory();
  const { pathname } = useLocation();
  const STEPS = useMemo(() => buildSteps(pathPrefix), []);
  const [createProject] = useMutation(CREATE_PROJECT, {
    update: mutationUpdate,
  });
  const currentIndex = findIndex(STEPS, step =>
    matchPath(pathname, { path: step.path })
  );

  const [values, setValues] = useState({});

  const { loading, data, error } = useQuery(GET_DATA);

  useScrollRestore(`${StyledModalWindowContainer}`, [pathname]);

  const next = async nextValues => {
    if (currentIndex === STEPS.length - 1) {
      await createProject({
        variables: {
          input: {
            specialist,
            ...values,
            ...nextValues,
          },
        },
      });

      if (onSuccess) onSuccess();
      modal.hide();
    } else {
      setValues({ ...values, ...nextValues });
      const nextPath = STEPS[currentIndex + 1];
      history.push(nextPath.path);
    }
  };

  const back = () => {
    const previous = STEPS[currentIndex - 1];
    history.push(previous.path);
  };

  return (
    <Modal
      width={650}
      padding="l"
      modal={modal}
      loading={loading}
      label="Add previous project"
    >
      <Switch>
        {STEPS.map(step => (
          <Route
            key={step.path}
            path={step.path}
            render={() => (
              <step.component
                next={next}
                back={back}
                data={data}
                values={values}
              />
            )}
          />
        ))}
      </Switch>
    </Modal>
  );
};

PreviousProjectForm.defaultProps = {
  mutationUpdate: () => {},
};

PreviousProjectForm.propTypes = {
  modal: PropTypes.object.isRequired,
};

export default PreviousProjectForm;
