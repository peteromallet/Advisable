import React, { Fragment, useEffect } from "react";
import { Mutation } from "react-apollo";
import { Formik } from "formik";
import Button from "src/components/Button";
import { Mobile } from "src/components/Breakpoint";
import ButtonGroup from "src/components/ButtonGroup";
import validationSchema from "./validationSchema";
import UPDATE_PROJECT from "../../updateProject.graphql";
import Terms from "./Terms";

export default ({ project, match, history }) => {
  const id = match.params.projectID;
  const goBack = () => history.push(`/project_setup/${id}/questions`);

  useEffect(() => {
    if (project.questions.length === 0) {
      history.replace("questions");
    }
  }, []);

  const isLastStep = project.depositOwed === 0;
  const hasDeposit = project.depositOwed > 0;

  return (
    <Mutation mutation={UPDATE_PROJECT}>
      {mutate => (
        <Fragment>
          <Formik
            initialValues={{ acceptedTerms: project.acceptedTerms }}
            validationSchema={validationSchema}
            onSubmit={async values => {
              const id = match.params.projectID;
              await mutate({
                variables: {
                  input: { id, ...values },
                },
              });

              if (isLastStep) {
                history.push(`/project_setup/${id}/confirm`);
              } else {
                history.push(`/project_setup/${id}/deposit`);
              }
            }}
          >
            {formik => (
              <form onSubmit={formik.handleSubmit}>
                <Terms project={project} formik={formik} />
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
                        {isLastStep ? "Complete" : "Continue"}
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
