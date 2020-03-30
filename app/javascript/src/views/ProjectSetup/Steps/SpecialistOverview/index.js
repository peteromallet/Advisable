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
  const goBack = () => history.push(`/project_setup/${id}/goals`);

  useEffect(() => {
    if (project.goals.length === 0) {
      history.replace("goals");
    }
  }, []);

  return (
    <Fragment>
      <Text marginBottom="l">
        Please give a one-line description of the freelancer you’re looking for.
      </Text>
      <Formik
        initialValues={{
          specialistDescription: project.specialistDescription || "",
        }}
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
          history.push(`/project_setup/${id}/must_have`);
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <TextField
              multiline
              autoHeight
              name="specialistDescription"
              value={formik.values.specialistDescription}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Specialist overview.."
              marginBottom="xl"
              error={
                formik.submitCount > 0 && formik.errors.specialistDescription
              }
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
