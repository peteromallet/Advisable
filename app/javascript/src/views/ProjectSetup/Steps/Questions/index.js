import { Formik, Field } from "formik";
import { useMutation } from "@apollo/client";
import React, { Fragment, useEffect } from "react";
import Text from "src/components/Text";
import FormField from "src/components/FormField";
import { Button, Textarea } from "@advisable/donut";
import UPDATE_PROJECT from "../../updateProject.graphql";

export default function Questions({ project, match, history }) {
  const [mutate] = useMutation(UPDATE_PROJECT);
  const id = match.params.projectID;
  const goBack = () => history.push(`/project_setup/${id}/nice_to_have`);

  useEffect(() => {
    if (project.requiredCharacteristics.length === 0) {
      history.replace("must_have");
    }
  }, []);

  return (
    <Fragment>
      <Text marginBottom="m">
        We’ll ask all applicants to answer these questions to assess their
        suitability for this project. Please take the time to provide thoughtful
        questions for this very important step.
      </Text>
      <Text marginBottom="l">
        When listing questions, consider whether there is any info or material
        you’d like for potential candidates to share with you prior to an
        interview, or what questions might test their knowledge and approach in
        a suitable way.
      </Text>
      <Formik
        initialValues={{ questions: project.questions || [] }}
        onSubmit={async (values) => {
          const id = match.params.projectID;
          await mutate({
            variables: {
              input: { id, ...values },
            },
          });
          history.push(`/project_setup/${id}/terms`);
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <FormField
              as={Textarea}
              label="Question 1"
              name="questions[0]"
              marginBottom="l"
              placeholder="Question"
            />
            <FormField
              as={Textarea}
              label="Question 2"
              name="questions[1]"
              marginBottom="l"
              placeholder="Question"
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
