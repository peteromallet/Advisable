import React from "react";
import * as Yup from "yup";
import { useLocation } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { Icon, Box, Text, RoundedButton } from "@advisable/donut";
import TextField from "../../components/TextField";

const validationSchema = Yup.object({
  firstName: Yup.string().required("Please enter your first name"),
  lastName: Yup.string().required("Please enter your last name"),
  email: Yup.string()
    .required("Please enter your email")
    .email(),
  company: Yup.string().required("Please enter your company name"),
});

const CompanyInformation = ({ data, nextStep }) => {
  const location = useLocation();

  const initialValues = {
    firstName: location.state?.firstName || "",
    lastName: location.state?.lastName || "",
    email: location.state?.email || "",
    company: location.state?.company || "",
  };

  const handleSubmit = async values => {
    nextStep({
      state: {
        ...location.state,
        ...values,
      },
    });
  };

  return (
    <>
      <Text fontSize="s" fontWeight="medium" mb="xs" color="neutral.5">
        Step 2
      </Text>
      <Text
        mb="xs"
        as="h2"
        fontSize="xxl"
        color="blue.8"
        fontWeight="semibold"
        letterSpacing="-0.025em"
      >
        Company Information
      </Text>
      <Text color="neutral.8" lineHeight="s" mb="l">
        This is some sub text to support the required action for this step. For
        aesthetic reasons it should span more than one line.
      </Text>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {formik => (
          <Form>
            <Box mb="m" display="flex">
              <Box mr="xxs" width="100%">
                <Field
                  name="firstName"
                  as={TextField}
                  label="First Name"
                  placeholder="First Name "
                  error={
                    formik.touched.firstName ? formik.errors.firstName : null
                  }
                />
              </Box>
              <Box ml="xxs" width="100%">
                <Field
                  name="lastName"
                  as={TextField}
                  label="Last Name"
                  placeholder="Last Name"
                  error={
                    formik.touched.lastName ? formik.errors.lastName : null
                  }
                />
              </Box>
            </Box>
            <Box mb="m">
              <Field
                name="email"
                as={TextField}
                label="Email Address"
                placeholder="Email Address"
                error={formik.touched.email ? formik.errors.email : null}
              />
            </Box>
            <Box mb="xl">
              <Field
                name="company"
                as={TextField}
                label="Company Name"
                placeholder="Company Name"
                error={formik.touched.company ? formik.errors.company : null}
              />
            </Box>
            <RoundedButton
              width={["100%", "auto"]}
              suffix={<Icon icon="arrow-right" />}
              loading={formik.isSubmitting}
              type="submit"
            >
              Continue
            </RoundedButton>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CompanyInformation;
