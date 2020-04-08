import React from "react";
import { Box, Text, Input } from "@advisable/donut";
import { Formik, Form, Field } from "formik";

export default function ClientDetails({ onSubmit }) {
  const initialValues = {
    specialist: "spe_a7f2BHhm2pCeCx9",
    clientName: "",
    industries: [],
    primaryIndustry: "",
    companyType: "",
    confidential: false,
  };

  return (
    <Box display="flex">
      <Box flexGrow={1}>
        <Formik onSubmit={onSubmit} initialValues={initialValues}>
          {(formik) => (
            <Form>
              <Text
                fontSize="28px"
                color="blue900"
                fontWeight="semibold"
                mb="xs"
              >
                Client Details
              </Text>
              <Text lineHeight="m" color="neutral700" mb="l">
                Previous projects are one of the most effective ways to validate
                your skills. Advisable uses them to decide what projects to
                invite you to.
              </Text>
              <button type="submit" disabled={formik.isSubmitting}>
                Continue
              </button>
            </Form>
          )}
        </Formik>
      </Box>
      <Box width={300} bg="green50" flexShrink={0}>
        This is the tooltip
      </Box>
    </Box>
  );
}
