import React from "react";
import { Formik } from "formik";
import { Box } from "@advisable/donut";
import FormField from "components/FormField";
import SubmitButton from "components/SubmitButton";
import { useNotifications } from "components/Notifications";
import validationSchema from "./validationSchema";
import { useUpdatePassword } from "./queries";

export default function ChangePasswordForm() {
  const notifications = useNotifications();
  const [updatePassword] = useUpdatePassword();

  const initialValues = {
    currentPassword: "",
    password: "",
    passwordConfirmation: "",
  };

  const handleSubmit = async (values) => {
    const { errors } = await updatePassword({
      variables: {
        input: values,
      },
    });

    if (errors) {
      notifications.notify("Something went wrong, please try again", {
        variant: "error",
      });
    } else {
      notifications.notify("Your password has been updated");
    }
  };

  return (
    <Formik
      validateOnMount
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      <Box maxWidth="400px">
        <FormField
          type="password"
          marginBottom={6}
          name="currentPassword"
          label="Current password"
        />
        <FormField
          type="password"
          name="password"
          label="New password"
          marginBottom={6}
        />
        <FormField
          type="password"
          label="Confirm password"
          name="passwordConfirmation"
          marginBottom={8}
        />
        <SubmitButton size="l" disableUntilValid>
          Update password
        </SubmitButton>
      </Box>
    </Formik>
  );
}
