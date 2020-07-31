import React, { Fragment, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Formik, Field } from "formik";
import Text from "src/components/Text";
import { Button, Textarea } from "@advisable/donut";
import validationSchema from "./validationSchema";
import UPDATE_PROJECT from "../../updateProject.graphql";

export default function ProjectOverview({ project, match, history }) {
  const [mutate] = useMutation(UPDATE_PROJECT);
  const id = match.params.projectID;
  const goBack = () => history.push(`/project_setup/${id}/company_overview`);

  useEffect(() => {
    if (!project.companyDescription) {
      history.replace("company_overview");
    }
  }, []);

  return (
    <Fragment>
      <Text marginBottom="l">
        Give a one line overview of the project to provide freelancers with
        context on what the project entails.
      </Text>
      <Formik
        initialValues={{ description: project.description || "" }}
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

          history.push(`/project_setup/${id}/goals`);
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <Field
              autoFocus
              minRows={4}
              as={Textarea}
              name="description"
              marginBottom="xl"
              placeholder="Project overview.."
              error={formik.submitCount > 0 && formik.errors.description}
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
