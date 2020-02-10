import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { useTranslation } from "react-i18next";
import { Box, Text, RoundedButton, Icon } from "@advisable/donut";
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
        as="h2"
        mb="xs"
        color="blue.8"
        fontSize="xxl"
        lineHeight="28px"
        fontWeight="semibold"
        letterSpacing="-0.035em"
      >
        Save your search
      </Text>
      <Text fontSize="m" color="neutral.8" lineHeight="s" mb="l">
        Great! We think we’ll have the perfect person for this project. Enter
        your email to save your details so far.
      </Text>
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnBlur={false}
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
            <RoundedButton
              loading={formik.isSubmitting}
              suffix={<Icon icon="arrow-right" />}
            >
              Continue
            </RoundedButton>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SaveSearchForm;
