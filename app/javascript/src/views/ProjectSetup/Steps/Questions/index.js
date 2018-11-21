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
  const goBack = () => history.push(`/project_setup/${id}/nice_to_have`);

  if (project.requiredCharacteristics.length === 0) {
    return <Redirect to="must_have" />;
  }

  return (
    <Mutation mutation={UPDATE_PROJECT}>
      {mutate => (
        <Fragment>
          <Text marginBottom="l">
            We'll get the specialist to answer these question in order to assess
            their suitability for this project.
          </Text>
          <Formik
            initialValues={{ questions: project.questions }}
            validationSchema={validationSchema}
            onSubmit={async values => {
              const id = match.params.projectID;
              await mutate({
                variables: {
                  input: { id, ...values }
                }
              });
              history.push(`/project_setup/${id}/terms`);
            }}
          >
            {formik => (
              <form onSubmit={formik.handleSubmit}>
                <ListInput
                  name="questions"
                  marginBottom="xl"
                  value={formik.values.questions}
                  placeholder="+ Add a question"
                  error={formik.submitCount > 0 && formik.errors.questions}
                  onChange={questions =>
                    formik.setFieldValue("questions", questions)
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
