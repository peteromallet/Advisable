import React from "react";
import * as Yup from "yup";
import { useMutation } from "react-apollo";
import { useParams, useLocation, Redirect } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { Icon, Box, Text, RoundedButton } from "@advisable/donut";
import TextField from "../../components/TextField";
import CREATE_CONSULTATION from "./createConsultation";

const validationSchema = Yup.object({
  firstName: Yup.string().required("Please enter your first name"),
  lastName: Yup.string().required("Please enter your last name"),
  email: Yup.string()
    .required("Please enter your email")
    .email(),
  company: Yup.string().required("Please enter your company name"),
});

const CompanyInformation = ({ data, nextStep, previousStepURL }) => {
  const params = useParams();
  const location = useLocation();
  const [createConsultation] = useMutation(CREATE_CONSULTATION);

  if (!location.state?.skill) {
    return <Redirect to={previousStepURL(params)} />;
  }

  const initialValues = {
    firstName: location.state?.firstName || "",
    lastName: location.state?.lastName || "",
    email: location.state?.email || "",
    company: location.state?.company || "",
  };

  const handleSubmit = async (values, formik) => {
    const response = await createConsultation({
      variables: {
        input: {
          skill: location.state.skill,
          specialist: params.specialistId,
          utmSource: location.state?.utmSource,
          utmCampaign: location.state?.utmCampaign,
          utmMedium: location.state?.utmMedium,
          gclid: location.state?.gclid,
          ...values,
        },
      },
    });

    if (response.errors) {
      const error = response.errors[0].extensions.code;
      if (error === "emailBelongsToFreelancer") {
        formik.setFieldError("email", "This email belongs to a freelancer");
      }

      return;
    }

    // Continue to the next step and pass the consultation id in the route
    // state. This makes the step routes much easier. i.e they are all prefixed
    // with request_consultation/:specialistId/[step] and don't need to have the
    // consultation id embeded.
    const consultation = response.data?.createConsultation.consultation;
    nextStep(
      {
        specialistId: params.specialistId,
      },
      {
        ...location.state,
        ...values,
        consultationId: consultation.id,
      }
    );
  };

  return (
    <Box padding={["m", "l"]}>
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
        Please provide some basic information so we can get back to you when{" "}
        {data.specialist.firstName} responds.
      </Text>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
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
    </Box>
  );
};

export default CompanyInformation;
