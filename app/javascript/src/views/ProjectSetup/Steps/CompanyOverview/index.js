import React, { Fragment } from "react";
import { Mutation } from "react-apollo";
import { Formik } from "formik";
import Text from "src/components/Text";
import { Mobile } from "src/components/Breakpoint";
import Button from "src/components/Button";
import ButtonGroup from "src/components/ButtonGroup";
import TextField from "src/components/TextField";
import validationSchema from "./validationSchema";
import UPDATE_PROJECT from "../../updateProject.graphql";

export default ({ project, match, history }) => {
  return (
    <Mutation mutation={UPDATE_PROJECT}>
      {mutate => (
        <Fragment>
          <Text marginBottom="l">
            Feel free to remove any identifying information if you'd rather the
            consultant doesn't know who you are.
          </Text>
          <Formik
            validationSchema={validationSchema}
            initialValues={{ companyDescription: project.companyDescription || ""}}
            onSubmit={async values => {
              const id = match.params.projectID;
              await mutate({
                variables: {
                  input: {
                    id,
                    ...values,
                  }
                }
              })
              history.push(`/project_setup/${id}/project_overview`);
            }}
          >
            {formik => (
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  autoFocus
                  multiline
                  autoHeight
                  name="companyDescription"
                  value={formik.values.companyDescription}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Company overview.."
                  marginBottom="xl"
                  error={
                    formik.submitCount > 0 && formik.errors.companyDescription
                  }
                />
                <Mobile>
                  {isMobile => (
                    <ButtonGroup fullWidth={isMobile}>
                      <Button type="submit" size="l" loading={formik.isSubmitting} styling="primary">
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
