import React, { Fragment, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Formik } from "formik";
import Text from "src/components/Text";
import Button from "src/components/Button";
import { Mobile } from "src/components/Breakpoint";
import ButtonGroup from "src/components/ButtonGroup";
import TextField from "src/components/TextField";
import validationSchema from "./validationSchema";
import UPDATE_PROJECT from "../../updateProject.graphql";

export default ({ project, match, history }) => {
  const [mutate] = useMutation(UPDATE_PROJECT);
  const id = match.params.projectID;
  const goBack = () => history.push(`/project_setup/${id}/company_overview`);

  useEffect(() => {
    if (!project.companyDescription) {
      history.replace("company_overview");
    }
  }, []);

  return (
    <Fragment>
      <Text marginBottom="l">
        Give a one line overview of the project to provide freelancers with
        context on what the project entails.
      </Text>
      <Formik
        initialValues={{ description: project.description || "" }}
        validationSchema={validationSchema}
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

          history.push(`/project_setup/${id}/goals`);
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <TextField
              multiline
              autoHeight
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Project overview.."
              marginBottom="xl"
              error={formik.submitCount > 0 && formik.errors.description}
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
