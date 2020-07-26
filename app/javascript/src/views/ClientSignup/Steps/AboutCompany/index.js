import React from "react";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import SubmitButton from "../../../../components/SubmitButton";
import {
  useAboutCompanyQuery,
  useAboutCompanyUpdate,
  getAboutCompanyOptimisticReponse,
  useLocationState,
} from "../../queries";
import FormField from "src/components/FormField";
import { Text, Stack, Autocomplete, Select } from "@advisable/donut";
import { object, string } from "yup";
import Loading from "../../../../components/Loading";

const validationSchema = object().shape({
  companyName: string().required("This field is required"),
  industry: string().required("This field is required"),
  companyType: string().required("This filed is required"),
});

function AboutCompany({
  RedirectToInitialStep,
  RedirectToNextStep,
  RedirectToLastStep,
}) {
  const locationState = useLocationState();
  const [updateClientApplication, { called }] = useAboutCompanyUpdate();
  const { loading, error, data } = useAboutCompanyQuery();

  if (loading) return <Loading />;
  if (error) return <RedirectToInitialStep />;
  if (called) return <RedirectToNextStep state={{ ...locationState }} />;
  if (data.clientApplication?.status !== "STARTED")
    return <RedirectToLastStep state={{ ...locationState }} />;
  const { clientApplication, industries } = data;

  // Formik
  const initialValues = {
    companyName: clientApplication.companyName || "",
    industry: clientApplication.industry?.name || "",
    companyType: clientApplication.companyType || "",
  };
  const handleSubmit = (values) => {
    updateClientApplication({
      variables: {
        id: locationState.applicationId,
        ...values,
      },
      optimisticResponse: getAboutCompanyOptimisticReponse(
        locationState.applicationId,
        values,
      ),
    });
  };

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <>
          <Text
            as="h2"
            mb="m"
            color="blue.8"
            fontSize="xxxl"
            lineHeight="xxxl"
            fontWeight="semibold"
            letterSpacing="-0.02em"
          >
            About Your Company
          </Text>
          <Text mb="m">
            As next steps, we need you to answer a few questions in order to
            figure out if you&apos;re a good fit for Advisable
          </Text>
          <Form>
            <Stack spacing="m" mb="l">
              <FormField
                name="companyName"
                placeholder="Umbrella Corporation"
                label="What's the name of your company?*"
              />
              <FormField
                as={Autocomplete}
                error={null}
                options={industries}
                name="industry"
                placeholder="Biotechnology"
                label="What industry are you in?*"
                onChange={(industry) =>
                  formik.setFieldValue("industry", industry)
                }
              />
              <FormField
                as={Select}
                error={null}
                name="companyType"
                placeholder="Major Corporation"
                label="What type of company are you?*"
                onChange={formik.handleChange}
              >
                <option>Individual Entrepreneur</option>
                <option>Small Business</option>
                <option>Medium-Sized Business</option>
                <option>Startup</option>
                <option>Growth-Stage Startup</option>
                <option>Major Corporation</option>
                <option>Non-Profit</option>
                <option>Education Institution</option>
              </FormField>
            </Stack>
            <SubmitButton>Continue</SubmitButton>
          </Form>
        </>
      )}
    </Formik>
  );
}

AboutCompany.propTypes = {
  RedirectToInitialStep: PropTypes.elementType,
  RedirectToNextStep: PropTypes.elementType,
  RedirectToLastStep: PropTypes.elementType,
};

export default AboutCompany;
