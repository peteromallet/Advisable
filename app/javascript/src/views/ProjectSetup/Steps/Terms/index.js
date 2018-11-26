import React, { Fragment, useEffect } from "react";
import { Mutation } from "react-apollo";
import { Formik } from "formik";
import Text from "src/components/Text";
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
      history.replace("questions")
    }
  }, [])

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
                  Responsibility for performance
                </Text>
                <Text size="s" marginBottom="l">
                  Advisable.com will identify and vet freelance specialists to
                  match the above Project Brief on behalf of Your Company. Your
                  Company will then be responsible for interviewing and
                  assessing the suitability of these candidates. Your Company is
                  responsible for making any hiring decisions and Advisable.com
                  will accept no responsibility for the performance of hired
                  specialists
                </Text>

                <Text size="s" weight="bold" colour="dark" marginBottom="xs">
                  Service fees
                </Text>
                <Text size="s" marginBottom="l">
                  If a specialist is hired by your Company on a freelance basis,
                  Advisable.com will charge this specialist a service fee. Your
                  Company will ensure Advisable.com is made aware of all
                  transactions between your Company and this specialist in order
                  for Advisable.com to accurately calculate and collect it’s fee
                </Text>

                <Text size="s" weight="bold" colour="dark" marginBottom="xs">
                  Specialist payment
                </Text>
                <Text size="s" marginBottom="l">
                  Your Company will ensure that all payments between your
                  Company and a specialist are made via Advisable.com. Payment
                  terms will be agreed directly between your Company and
                  Advisable.com
                </Text>

                <Text size="s" weight="bold" colour="dark" marginBottom="xs">
                  Other project terms
                </Text>
                <Text size="s" marginBottom="l">
                  All further agreements (i.e. on project pricing and
                  deliverables) will be made directly between your Company and a
                  specialist
                </Text>

                <Text size="s" weight="bold" colour="dark" marginBottom="xs">
                  Full-time hire
                </Text>
                <Text size="s" marginBottom="xl">
                  If a specialist is subsequently hired by your Company in a
                  full-time capacity, your Company agrees to pay Advisable.com a
                  one-off recruitment fee of 10% of the year 1 salary upon
                  commencement of this full-time employment
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
