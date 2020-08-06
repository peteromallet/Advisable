import React, { Fragment } from "react";
import { Formik, Field } from "formik";
import { Button, Textarea } from "@advisable/donut";
import { useMutation } from "@apollo/client";
import Text from "src/components/Text";
import validationSchema from "./validationSchema";
import UPDATE_PROJECT from "../../updateProject.graphql";

export default function CompanyOverview({ project, match, history }) {
  const [mutate] = useMutation(UPDATE_PROJECT);
  const id = match.params.projectID;
  const goBack = () => history.push(`/project_setup/${id}`);

  return (
    <Fragment>
      <Text marginBottom="l">
        Provide freelancers with a high-level overview of your company to
        provide them with context and allow them to tailor their pitch
        accordingly.
      </Text>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          companyDescription: project.companyDescription || "",
        }}
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
          history.push(`/project_setup/${id}/project_overview`);
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <Field
              minRows={4}
              autoFocus
              as={Textarea}
              marginBottom="xl"
              name="companyDescription"
              placeholder="Company overview.."
              error={formik.submitCount > 0 && formik.errors.companyDescription}
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
