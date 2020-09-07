import React from "react";
import { Formik, Form } from "formik";
import ActionBarModal from "./ActionBarModal";
import FormField from "components/FormField";
import TilesInput from "components/TilesInput";
import SubmitButton from "components/SubmitButton";
import { Text, Stack } from "@advisable/donut";
import { useUpdateProject } from "./queries";

export default function UpdateProjectLocationModal({ dialog, project }) {
  const [updateProject] = useUpdateProject();

  const location = project.user.location;

  const initialValues = {
    locationImportance: project.locationImportance,
  };

  const handleSubmit = async (values) => {
    await updateProject({
      variables: {
        input: {
          id: project.id,
          ...values,
        },
      },
    });

    dialog.hide();
  };

  return (
    <ActionBarModal width={700} dialog={dialog}>
      <Text
        fontSize="3xl"
        marginBottom="xl"
        fontWeight="medium"
        letterSpacing="-0.02em"
      >
        Location
      </Text>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {(formik) => (
          <Form>
            <Stack spacing="xl" marginBottom="xl">
              <FormField
                as={TilesInput}
                name="locationImportance"
                label={`How important is it that they are in ${location}?`}
                description="The broader the location, the more likely we'll have the perfect
                  match for your project."
                onChange={(n) => formik.setFieldValue("locationImportance", n)}
                options={[
                  { label: "Not Important", value: 0 },
                  { label: "Not Sure", value: 1 },
                  { label: "Important", value: 2 },
                ]}
              />
            </Stack>
            <SubmitButton>Save Changes</SubmitButton>
          </Form>
        )}
      </Formik>
    </ActionBarModal>
  );
}
