import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { useTranslation } from "react-i18next";
import { Box, Text, Button } from "@advisable/donut";
import TextField from "../../../components/TextField";

const SaveSearchForm = ({ onSubmit }) => {
  const { t } = useTranslation();

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Please enter your email address"),
  });

  return (
    <>
      <Text
        fontSize="xxl"
        fontWeight="semibold"
        letterSpacing="-0.03rem"
        color="neutral.9"
        mb="xs"
      >
        Save your search
      </Text>
      <Text fontSize="s" color="neutral.7" lineHeight="s" mb="l">
        Great! We think we’ll have the perfect person for this project. Enter
        your email to save your details so far.
      </Text>
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {formik => (
          <Form>
            <Box mb="l">
              <TextField
                autoFocus
                name="email"
                label="Email Address"
                onBlur={formik.handleBlur}
                placeholder="Email Address"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.submitCount > 0 && formik.errors.email}
              />
            </Box>
            {formik.status && (
              <Text color="red.6" fontSize="s" mb="m">
                {t(formik.status)}
              </Text>
            )}
            <Button
              appearance="primary"
              intent="success"
              iconRight="arrow-right"
              loading={formik.isSubmitting}
            >
              Continue
            </Button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SaveSearchForm;
