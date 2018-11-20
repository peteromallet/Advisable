import React, { Fragment } from "react";
import { Mutation } from "react-apollo";
import { Redirect } from "react-router";
import { Formik } from "formik";
import Text from "src/components/Text";
import Button from "src/components/Button";
import ButtonGroup from "src/components/ButtonGroup";
import TextField from "src/components/TextField";
import validationSchema from "./validationSchema";
import UPDATE_PROJECT from "../../updateProject.graphql";

export default ({ project, match, history }) => {
  const id = match.params.projectID;
  const goBack = () => history.push(`/project_setup/${id}/goals`);

  if (project.goals.length === 0) {
    return <Redirect to="goals" />;
  }

  return (
    <Mutation mutation={UPDATE_PROJECT}>
      {mutate => (
        <Fragment>
          <Text marginBottom="l">
            Give a brief one sentence overview of what you want to get out of an
            engagement with a specialist.
          </Text>
          <Formik
            initialValues={{ specialistDescription: project.specialistDescription || '' }}
            validationSchema={validationSchema}
            onSubmit={async values => {
              const id = match.params.projectID;
              await mutate({
                variables: {
                  input: {
                    id,
                    ...values
                  }
                }
              })
              history.push(`/project_setup/${id}/must_have`);
            }}
          >
            {formik => (
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  multiline
                  autoFocus
                  autoHeight
                  name="specialistDescription"
                  value={formik.values.specialistDescription}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Specialist overview.."
                  marginBottom="xl"
                  error={
                    formik.submitCount > 0 && formik.errors.specialistOverview
                  }
                />
                <ButtonGroup>
                  <Button
                    type="button"
                    size="l"
                    styling="outlined"
                    onClick={goBack}
                  >
                    Back
                  </Button>
                  <Button type="submit" size="l" styling="primary" loading={formik.isSubmitting}>
                    Continue
                  </Button>
                </ButtonGroup>
              </form>
            )}
          </Formik>
        </Fragment>
      )}
    </Mutation>
  );
};
