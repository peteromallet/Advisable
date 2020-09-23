import React from "react";
import { Formik, Form, Field } from "formik";
import { Paragraph } from "@advisable/donut";
import SubmitButton from "components/SubmitButton";
import { useNotifications } from "components/Notifications";
import AvailabilityDesktop from "components/AvailabilityInput";
import { useUpdateAvailability } from "./queries";

export default function UpdateAvailabilityForm({
  interview,
  buttonLabel = "Update Availability",
  onUpdate,
}) {
  const notifications = useNotifications();
  const [updateAvailability] = useUpdateAvailability();

  const initialValues = {
    availability: interview.user.availability,
  };

  const handleSubmit = React.useCallback(
    async (values) => {
      const { errors } = await updateAvailability({
        variables: {
          input: {
            id: interview.user.id,
            availability: values.availability,
          },
        },
      });

      if (errors) {
        notifications.notify("Failed to update availability, please try again");
      } else {
        if (onUpdate) {
          await onUpdate();
        }
      }
    },
    [notifications, interview, onUpdate, updateAvailability],
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
