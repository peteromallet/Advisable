import { Formik } from "formik";
import { Mutation } from "react-apollo";
import React, { Fragment, useEffect } from "react";
import Text from "src/components/Text";
import Button from "src/components/Button";
import TextField from "src/components/TextField";
import InputError from "src/components/InputError";
import { Mobile } from "src/components/Breakpoint";
import ButtonGroup from "src/components/ButtonGroup";
import validationSchema from "./validationSchema";
import UPDATE_PROJECT from "../../updateProject.graphql";

export default ({ project, match, history }) => {
  const id = match.params.projectID;
  const goBack = () => history.push(`/project_setup/${id}/nice_to_have`);

  useEffect(() => {
    if (project.requiredCharacteristics.length === 0) {
      history.replace("must_have");
    }
  }, []);

  return (
    <Mutation mutation={UPDATE_PROJECT}>
      {mutate => (
        <Fragment>
          <Text marginBottom="m">
            We’ll ask all applicants to answer these questions to assess their
            suitability for this project. Please take the time to provide
            thoughtful questions for this very important step.
          </Text>
          <Text marginBottom="l">
            When listing questions, consider whether there is any info or
            material you’d like for potential candidates to share with you prior
            to an interview, or what questions might test their knowledge and
            approach in a suitable way.
          </Text>
          <Formik
            initialValues={{ questions: project.questions || [] }}
            validationSchema={validationSchema}
            onSubmit={async values => {
              const id = match.params.projectID;
              await mutate({
                variables: {
                  input: { id, ...values },
                },
              });
              history.push(`/project_setup/${id}/terms`);
            }}
          >
            {formik => (
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  multiline
                  label="Question 1"
                  name="questions[0]"
                  marginBottom="l"
                  value={formik.values.questions[0]}
                  placeholder="Question"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                <TextField
                  multiline
                  label="Question 2"
                  name="questions[1]"
                  marginBottom="l"
                  value={formik.values.questions[1]}
                  placeholder="Question"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.submitCount > 0 && formik.errors.questions && (
                  <InputError marginBottom="l">
                    {formik.errors.questions}
                  </InputError>
                )}
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
