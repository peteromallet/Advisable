import React from "react";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import SubmitButton from "../../../../components/SubmitButton";
import {
  useAboutCompanyQuery,
  useAboutCompanyUpdate,
  getAboutCompanyOptimisticReponse,
  useApplicationId,
} from "../../queries";
import FormField from "src/components/FormField";
import { Text, Stack, Autocomplete } from "@advisable/donut";
import { object, string } from "yup";
import Loading from "../../../../components/Loading";

const typesOfCompany = [
  { label: "Individual Entrepreneur", value: "Individual Entrepreneur" },
  { label: "Small Business", value: "Small Business" },
  { label: "Medium-Sized Business", value: "Medium-Sized Business" },
  { label: "Startup", value: "Startup" },
  { label: "Growth Stage Startup", value: "Growth Stage Startup" },
  { label: "Major Corporation", value: "Major Corporation" },
  { label: "Non-Profit", value: "Non-Profit" },
  { label: "Education Institution", value: "Education Institution" },
  { label: "Government", value: "Government" },
];

const validationSchema = object().shape({
  companyName: string().required("This field is required"),
  industry: string().required("This field is required"),
  companyType: string().required("This filed is required"),
});

function AboutCompany({ pushInitialStepPath, pushNextStepPath }) {
  const applicationId = useApplicationId();
  const [updateClientApplication] = useAboutCompanyUpdate();
  const { loading, error, data } = useAboutCompanyQuery();

  if (error) pushInitialStepPath();
  if (loading) return <Loading />;
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
        id: applicationId,
        ...values,
      },
      optimisticResponse: getAboutCompanyOptimisticReponse(
        applicationId,
        values,
      ),
      update: () => pushNextStepPath({ state: { applicationId } }),
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
                as={Autocomplete}
                error={null}
                options={typesOfCompany}
                name="companyType"
                placeholder="Major Corporation"
                label="What type of company are you?*"
                onChange={(type) => formik.setFieldValue("companyType", type)}
              />
            </Stack>
            <SubmitButton>Continue</SubmitButton>
          </Form>
        </>
      )}
    </Formik>
  );
}

AboutCompany.propTypes = {
  pushNextStepPath: PropTypes.func,
  pushInitialStepPath: PropTypes.func,
};

export default AboutCompany;
