import React from "react";
import { Formik, Form, Field } from "formik";
import { useMutation } from "react-apollo";
import { Box, Text, Label, Input, RoundedButton } from "@advisable/donut";
import validationSchema from "./validationSchema";
import REQUEST_PASSWORD_RESET from "./requestPasswordReset.graphql";

function RequestResetForm({ onSubmit }) {
  const [requestReset] = useMutation(REQUEST_PASSWORD_RESET);

  const handleSubmit = async (values, formikBag) => {
    const { data } = await requestReset({
      variables: {
        input: values,
      },
    });

    formikBag.setSubmitting(false);
    onSubmit(data);
  };

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{ email: "" }}
      onSubmit={handleSubmit}
    >
      {formik => (
        <Form>
          <Text
            mb="l"
            as="h3"
            color="blue.9"
            fontSize="xxl"
            textAlign="center"
            fontWeight="semibold"
            letterSpacing="-0.03em"
          >
            Forgot your password?
          </Text>
          <Label htmlFor="email" mb="xs">
            Email Address
          </Label>
          <Box mb="l">
            <Field
              id="email"
              as={Input}
              name="email"
              placeholder="Email Address"
            />
            {formik.touched.email && formik.errors.email && (
              <Text fontSize="s" color="red.6" mt="xs">
                {formik.errors.email}
              </Text>
            )}
          </Box>
          <RoundedButton
            size="l"
            type="submit"
            css="width: 100%;"
            loading={formik.isSubmitting}
          >
            Send password reset
          </RoundedButton>
        </Form>
      )}
    </Formik>
  );
}

export default RequestResetForm;
