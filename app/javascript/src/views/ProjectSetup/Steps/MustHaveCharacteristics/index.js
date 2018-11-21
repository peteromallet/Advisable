import React, { Fragment } from "react";
import { Mutation } from "react-apollo";
import { Redirect } from "react-router";
import { Formik } from "formik";
import Text from "src/components/Text";
import Button from "src/components/Button";
import ListInput from "src/components/ListInput";
import { Mobile } from "src/components/Breakpoint";
import ButtonGroup from "src/components/ButtonGroup";
import validationSchema from "./validationSchema";
import UPDATE_PROJECT from "../../updateProject.graphql";

export default ({ project, match, history }) => {
  const id = match.params.projectID;
  const goBack = () => history.push(`/project_setup/${id}/specialist_overview`);

  if (!project.specialistDescription) {
    return <Redirect to="specialist_overview" />;
  }

  return (
    <Mutation mutation={UPDATE_PROJECT}>
      {mutate => (
        <Fragment>
          <Text marginBottom="l">
            These are characteristics that is necessary that your specialist
            has.
          </Text>
          <Formik
            initialValues={{
              requiredCharacteristics: project.requiredCharacteristics
            }}
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
              });
              history.push(`/project_setup/${id}/nice_to_have`);
            }}
          >
            {formik => (
              <form onSubmit={formik.handleSubmit}>
                <ListInput
                  marginBottom="xl"
                  name="requiredCharacteristics"
                  value={formik.values.requiredCharacteristics}
                  placeholder="+ Add a characteristic"
                  error={
                    formik.submitCount > 0 &&
                    formik.errors.requiredCharacteristics
                  }
                  onChange={characteristics =>
                    formik.setFieldValue(
                      "requiredCharacteristics",
                      characteristics
                    )
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
      )}
    </Mutation>
  );
};
