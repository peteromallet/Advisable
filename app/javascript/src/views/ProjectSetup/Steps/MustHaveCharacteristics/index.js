import React, { Fragment, useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Formik } from "formik";
import { RoundedButton } from "@advisable/donut";
import Text from "src/components/Text";
import ListInput from "src/components/ListInput";
import validationSchema from "./validationSchema";
import UPDATE_PROJECT from "../../updateProject.graphql";

export default ({ project, match, history }) => {
  const [mutate] = useMutation(UPDATE_PROJECT);
  const id = match.params.projectID;
  const goBack = () => history.push(`/project_setup/${id}/specialist_overview`);

  useEffect(() => {
    if (!project.specialistDescription) {
      history.replace("specialist_overview");
    }
  }, []);

  return (
    <Fragment>
      <Text marginBottom="l">
        Please list the skills and experience required by candidates for this
        project.
      </Text>
      <Formik
        initialValues={{
          requiredCharacteristics: project.requiredCharacteristics,
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
          history.push(`/project_setup/${id}/nice_to_have`);
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <ListInput
              marginBottom="xl"
              name="requiredCharacteristics"
              value={formik.values.requiredCharacteristics}
              placeholder="+ Add a characteristic"
              error={
                formik.submitCount > 0 && formik.errors.requiredCharacteristics
              }
              onChange={(characteristics) =>
                formik.setFieldValue("requiredCharacteristics", characteristics)
              }
            />
            <RoundedButton
              mr="xs"
              type="button"
              size="l"
              variant="subtle"
              onClick={goBack}
            >
              Back
            </RoundedButton>
            <RoundedButton size="l" type="submit" loading={formik.isSubmitting}>
              Continue
            </RoundedButton>
          </form>
        )}
      </Formik>
    </Fragment>
  );
};
