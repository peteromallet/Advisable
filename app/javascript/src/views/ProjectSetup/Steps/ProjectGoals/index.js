import React, { Fragment, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Formik } from "formik";
import Text from "src/components/Text";
import Button from "src/components/Button";
import { Mobile } from "src/components/Breakpoint";
import ListInput from "src/components/ListInput";
import ButtonGroup from "src/components/ButtonGroup";
import validationSchema from "./validationSchema";
import UPDATE_PROJECT from "../../updateProject.graphql";

export default ({ project, match, history }) => {
  const [mutate] = useMutation(UPDATE_PROJECT);
  const id = match.params.projectID;
  const goBack = () => history.push(`/project_setup/${id}/project_overview`);

  useEffect(() => {
    if (!project.description) {
      history.replace("project_overview");
    }
  }, []);

  return (
    <Fragment>
      <Text marginBottom="l">
        Please list the high-level goals that you wish to achieve with this
        project.
      </Text>
      <Formik
        onSubmit={async (values) => {
          const id = match.params.projectID;
          await mutate({
            variables: {
              input: {
                id,
                ...values,
              },
            },
          });

          history.push(`/project_setup/${id}/specialist_overview`);
        }}
        initialValues={{ goals: project.goals }}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <ListInput
              name="goals"
              autoFocus
              marginBottom="xl"
              value={formik.values.goals}
              placeholder="+ Add a project goal"
              error={formik.submitCount > 0 && formik.errors.goals}
              onChange={(goals) => formik.setFieldValue("goals", goals)}
            />
            <Mobile>
              {(isMobile) => (
                <ButtonGroup fullWidth={isMobile}>
                  <Button
                    type="button"
                    size="l"
                    styling="outlined"
                    onClick={goBack}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    size="l"
                    styling="primary"
                    loading={formik.isSubmitting}
                  >
                    Continue
                  </Button>
                </ButtonGroup>
              )}
            </Mobile>
          </form>
        )}
      </Formik>
    </Fragment>
  );
};
