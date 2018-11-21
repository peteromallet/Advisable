import React, { Fragment } from "react";
import { Mutation } from "react-apollo";
import { Redirect } from "react-router";
import { Formik } from "formik";
import Text from "src/components/Text";
import Button from "src/components/Button";
import { Mobile } from "src/components/Breakpoint";
import ButtonGroup from "src/components/ButtonGroup";
import TextField from "src/components/TextField";
import validationSchema from "./validationSchema";
import UPDATE_PROJECT from "../../updateProject.graphql";

export default ({ project, match, history, position, opacity }) => {
  const id = match.params.projectID;
  const goBack = () => history.push(`/project_setup/${id}/company_overview`);

  if (!project.companyDescription) {
    return <Redirect to="company_overview" />;
  }

  return (
    <Mutation mutation={UPDATE_PROJECT}>
      {mutate => (
        <Fragment>
          <Text marginBottom="l">
            Give a brief one line overview of the project
          </Text>
          <Formik
            initialValues={{ description: project.description || ""}}
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

              history.push(`/project_setup/${id}/goals`);
            }}
          >
            {formik => (
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  multiline
                  autoHeight
                  autoFocus
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Project overview.."
                  marginBottom="xl"
                  error={
                    formik.submitCount > 0 && formik.errors.description
                  }
                />
                <Mobile>
                  {isMobile => (
                    <ButtonGroup fullWidth={isMobile}>
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
                  )}
                </Mobile>
              </form>
            )}
          </Formik>
        </Fragment>
      )}
    </Mutation>
  );
};
