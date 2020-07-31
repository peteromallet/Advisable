import React, { Fragment, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { Formik, Field } from "formik";
import Text from "src/components/Text";
import { Button, Textarea } from "@advisable/donut";
import validationSchema from "./validationSchema";
import UPDATE_PROJECT from "../../updateProject.graphql";

export default function SpecialistOverview({ project, match, history }) {
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
            <Field
              minRows={4}
              as={Textarea}
              marginBottom="xl"
              name="specialistDescription"
              placeholder="Specialist overview.."
              error={
                formik.submitCount > 0 && formik.errors.specialistDescription
              }
            />
            <Button
              mr="xs"
              type="button"
              size="l"
              variant="subtle"
              onClick={goBack}
            >
              Back
            </Button>
            <Button size="l" type="submit" loading={formik.isSubmitting}>
              Continue
            </Button>
          </form>
        )}
      </Formik>
    </Fragment>
  );
}
