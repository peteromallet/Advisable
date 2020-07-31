import React, { Fragment, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { Formik } from "formik";
import { Button } from "@advisable/donut";
import Text from "src/components/Text";
import BulletPointInput from "components/BulletPointInput";
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
            <BulletPointInput
              name="goals"
              autoFocus
              marginBottom="xl"
              value={formik.values.goals}
              placeholder="+ Add a project goal"
              error={formik.submitCount > 0 && formik.errors.goals}
              onChange={(goals) => formik.setFieldValue("goals", goals)}
            />
            <Button
              mr="xs"
              type="button"
              size="l"
              variant="subtle"
              onClick={goBack}
            >
              Back
            </Button>
            <Button size="l" type="submit" loading={formik.isSubmitting}>
              Continue
            </Button>
          </form>
        )}
      </Formik>
    </Fragment>
  );
};
