import React from "react";
import { DateTime } from "luxon";
import { Formik, Form, Field } from "formik";
import { World } from "@styled-icons/ionicons-outline";
import { Box, Paragraph, Text } from "@advisable/donut";
import SubmitButton from "components/SubmitButton";
import { useNotifications } from "components/Notifications";
import AvailabilityDesktop from "components/AvailabilityInput";
import TimeZoneSelect from "components/TimeZoneSelect";
import { useUpdateAvailability } from "./queries";

export default function UpdateAvailabilityForm({
  interview,
  buttonLabel = "Update Availability",
  onUpdate,
}) {
  const notifications = useNotifications();
  const [updateAvailability] = useUpdateAvailability();
  const [timezone, setTimezone] = React.useState(
    DateTime.local().zoneName || interview.timeZone || "UTC",
  );

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
          <TimeZoneSelect
            value={timezone}
            marginBottom="xl"
            onChange={setTimezone}
          />
          <Field
            name="availability"
            timezone={timezone}
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
