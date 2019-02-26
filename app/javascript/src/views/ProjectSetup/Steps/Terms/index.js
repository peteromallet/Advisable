import React, { Fragment, useEffect } from "react";
import { Mutation } from "react-apollo";
import { Formik } from "formik";
import Text from "src/components/Text";
import Link from "src/components/Link";
import Button from "src/components/Button";
import Checkbox from "src/components/Checkbox";
import { Mobile } from "src/components/Breakpoint";
import ButtonGroup from "src/components/ButtonGroup";
import validationSchema from "./validationSchema";
import UPDATE_PROJECT from "../../updateProject.graphql";

export default ({ project, match, history }) => {
  const id = match.params.projectID;
  const goBack = () => history.push(`/project_setup/${id}/questions`);

  useEffect(() => {
    if (project.questions.length === 0) {
      history.replace("questions");
    }
  }, []);

  const isLastStep = project.depositOwed === 0;

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
                  input: { id, ...values }
                }
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
                <Text size="s" weight="bold" colour="dark" marginBottom="xs">
                  Freelancer payment
                </Text>
                <Text size="s" marginBottom="l">
                  Advisable earns fees from our freelancers for finding them
                  projects. If you hire one of Advisable’s freelancers, all
                  payment must be made via our platform.
                </Text>

                <Text size="s" weight="bold" colour="dark" marginBottom="xs">
                  Refundable deposit
                </Text>
                <Text size="s" marginBottom="l">
                  To start the recruitment process, we charge a $500 deposit
                  that is 100% refundable should you decide not to hire a
                  freelancer, or credited against their first payment if you do
                  hire one. This is not a fee: we charge a deposit as we need to
                  know you’re serious prior to commencing our highly customized
                  and time intensive matching process.
                </Text>

                <Text size="s" weight="bold" colour="dark" marginBottom="xs">
                  Engage with the process
                </Text>
                <Text size="s" marginBottom="xl">
                  Our freelancers are in high-demand. In submitting this brief,
                  you commit to engaging with the recruitment process in a
                  professional manner and adhering to the{" "}
                  <Link
                    href="https://advisable.com/professional-standards/#clients"
                    target="_blank"
                  >
                    Client Professional Standards
                  </Link>
                  . This means providing prompt feedback to Advisable and our
                  freelancers at every stage of the recruitment process.
                  Penalties of up to $200 are in force should you disengage with
                  the process without notifying Advisable.
                </Text>

                <Checkbox
                  marginBottom="xl"
                  name="acceptedTerms"
                  label="I accept these terms"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.acceptedTerms}
                  error={formik.errors.acceptedTerms}
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
