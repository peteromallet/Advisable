import React from "react";
import { Formik, Form } from "formik";
import { useMutation } from "@apollo/client";
import { Text, Button } from "@advisable/donut";
import FormField from "components/FormField";
import validationSchema from "./validationSchema";
import REQUEST_PASSWORD_RESET from "./requestPasswordReset.graphql";

function RequestResetForm({ onSubmit }) {
  const [requestReset] = useMutation(REQUEST_PASSWORD_RESET);

  const handleSubmit = async (values, formikBag) => {
    const response = await requestReset({
      variables: {
        input: values,
      },
    });

    formikBag.setSubmitting(false);
    onSubmit(response);
  };

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{ email: "" }}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form>
          <Text
            as="h3"
            mb="l"
            fontSize="28px"
            color="blue900"
            fontWeight="medium"
            letterSpacing="-0.03em"
          >
            Forgot your password?
          </Text>
          <FormField
            marginBottom="l"
            label="Email Address"
            name="email"
            placeholder="Email Address"
          />

          <Button
            size="l"
            type="submit"
            css="width: 100%;"
            loading={formik.isSubmitting}
          >
            Send password reset
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default RequestResetForm;
