import React from "react";
import { Formik, Form, Field } from "formik";
import { Paragraph } from "@advisable/donut";
import SubmitButton from "components/SubmitButton";
import AvailabilityDesktop from "components/AvailabilityInput";
import { useUpdateAvailability } from "./queries";

export default function UpdateAvailabilityForm({
  buttonLabel = "Update Availability",
  onUpdate,
}) {
  const [updateAvailability] = useUpdateAvailability();

  const initialValues = {
    availability: [],
  };

  const handleSubmit = React.useCallback(
    async (values, formik) => {
      const { errors } = await updateAvailability({
        variables: {
          availability: values.availability,
        },
      });

      if (errors) {
        formik.setStatus("Something went wrong");
      }

      if (onUpdate) onUpdate();
    },
    [onUpdate, updateAvailability],
  );

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {(formik) => (
        <Form>
          <Field
            name="availability"
            as={AvailabilityDesktop}
            onChange={(a) => formik.setFieldValue("availability", a)}
          />
          <Paragraph color="neutral600" fontSize="sm" marginTop="md">
            Note: This availability applies to any interviews you have on
            Advisable.
          </Paragraph>
          <SubmitButton marginTop="xl">{buttonLabel}</SubmitButton>
        </Form>
      )}
    </Formik>
  );
}
