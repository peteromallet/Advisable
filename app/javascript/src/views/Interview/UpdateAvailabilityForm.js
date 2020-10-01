import React from "react";
import { DateTime } from "luxon";
import { Formik, Form, Field } from "formik";
import { Paragraph, Availability, useBreakpoint } from "@advisable/donut";
import SubmitButton from "components/SubmitButton";
import Loading from "components/Loading";
import { useNotifications } from "components/Notifications";
import AvailabilityDesktop from "components/AvailabilityInput";
import TimeZoneSelect from "components/TimeZoneSelect";
import { useUpdateAvailability, useAvailability } from "./queries";

export default function UpdateAvailabilityFormContainer(props) {
  const { data, loading, error } = useAvailability();

  if (error) {
    return <>Something went wrong, please try to reload the page</>;
  }

  if (loading) {
    return <Loading />;
  }

  return <UpdateAvailabilityForm {...props} data={data} />;
}

function UpdateAvailabilityForm({
  data,
  buttonLabel = "Update Availability",
  onUpdate,
}) {
  const isDesktop = useBreakpoint("mUp");
  const notifications = useNotifications();
  const [updateAvailability] = useUpdateAvailability();
  const [timezone, setTimezone] = React.useState(
    DateTime.local().zoneName || "UTC",
  );

  const initialValues = {
    availability: data.viewer.availability,
  };

  const handleSubmit = React.useCallback(
    async (values) => {
      const { errors } = await updateAvailability({
        variables: {
          input: {
            id: data.viewer.id,
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
    [notifications, data, onUpdate, updateAvailability],
  );

  const events = React.useMemo(() => {
    return data.viewer.interviews.map((interview) => ({
      time: interview.startsAt,
      label: `Interview with ${interview.specialist.firstName}`,
    }));
  }, [data]);

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {(formik) => (
        <Form>
          <TimeZoneSelect
            value={timezone}
            marginBottom="lg"
            onChange={setTimezone}
          />
          <Field
            events={events}
            name="availability"
            timezone={timezone}
            as={isDesktop ? AvailabilityDesktop : Availability}
            onChange={(a) => formik.setFieldValue("availability", a)}
          />
          <Paragraph color="neutral700" fontSize="sm" marginTop="md">
            Note: This availability applies to any interviews you have on
            Advisable.
          </Paragraph>
          <SubmitButton marginTop="xl">{buttonLabel}</SubmitButton>
        </Form>
      )}
    </Formik>
  );
}
