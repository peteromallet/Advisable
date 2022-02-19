import React from "react";
import { Box, Card, Heading, Label } from "@advisable/donut";
import { Form, Formik } from "formik";
import FormField from "src/components/FormField";
import SubmitButton from "src/components/SubmitButton";
import TimezoneSelect from "src/components/TimeZoneSelect";
import { DateTime } from "luxon";
import { useAccountDetails, useUpdateAccount } from "./queries";
import { Loading } from "src/components";
import { useNotifications } from "src/components/Notifications";

export default function AccountSettings() {
  const notifications = useNotifications();
  const [updateAccount] = useUpdateAccount();
  const { loading, data } = useAccountDetails();
  if (loading) return <Loading />;

  const currentAccount = data.currentAccount;
  const initalTimezone = currentAccount.timezone || DateTime.local().zoneName;

  const initialValues = {
    firstName: currentAccount.firstName,
    lastName: currentAccount.lastName,
    email: currentAccount.email,
    timezone: {
      value: initalTimezone,
      label: initalTimezone,
    },
  };

  const handleSubmit = async (values) => {
    const response = await updateAccount({
      variables: {
        input: {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          timezone: values.timezone.value,
        },
      },
    });

    if (response.errors) {
      notifications.error("Something went wrong, please try again.");
    } else {
      notifications.notify("Your account has been updated");
    }
  };

  return (
    <Card padding={10} borderRadius="12px">
      <Heading marginBottom={8}>Account Settings</Heading>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {(formik) => (
          <Form>
            <Box
              display="flex"
              marginBottom={5}
              style={{ gap: "24px" }}
              flexDirection={{ _: "column", m: "row" }}
            >
              <Box flex="1">
                <Label marginBottom={2}>First name</Label>
                <FormField name="firstName" />
              </Box>
              <Box flex="1">
                <Label marginBottom={2}>Last name</Label>
                <FormField name="lastName" />
              </Box>
            </Box>
            <Label marginBottom={2}>Email</Label>
            <FormField name="email" marginBottom={5} />
            <Label marginBottom={2}>Timezone</Label>
            <FormField
              as={TimezoneSelect}
              name="timezone"
              marginBottom={8}
              onChange={(tz) => formik.setFieldValue("timezone", tz)}
            />
            <SubmitButton size="l" variant="gradient">
              Save changes
            </SubmitButton>
          </Form>
        )}
      </Formik>
    </Card>
  );
}
