import React from "react";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import SubmitButton from "../../../../components/SubmitButton";
import { useLocation } from "react-router";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { ABOUT_COMPANY_UPDATE, ABOUT_COMPANY_QUERY } from "../../queries";
import FormField from "src/components/FormField";
import { Text, Stack, Autocomplete } from "@advisable/donut";
import { object, string } from "yup";

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
  const location = useLocation();
  const { applicationId } = location.state;
  const [updateClientApplication, updateResponse] = useMutation(
    ABOUT_COMPANY_UPDATE,
    {
      variables: { id: applicationId },
    },
  );
  const { loading, error, data } = useQuery(ABOUT_COMPANY_QUERY, {
    variables: { id: applicationId },
  });
  console.log("applicationid", applicationId);
  console.log("data", data);
  console.log("response", updateResponse);

  if (error) pushInitialStepPath();
  if (loading) return <div>loading...</div>;

  // Formik
  const initialValues = {
    companyName: data.clientApplication.companyName || "",
    industry: data.clientApplication.industry?.name || "",
    companyType: data.clientApplication.companyType || "",
  };
  const industries = data.industries.map((industry) => ({
    label: industry.name,
    value: industry.name,
  }));
  const handleSubmit = (values) => {
    updateClientApplication({
      variables: {
        id: applicationId,
        ...values,
      },
    });
  };

  updateResponse.data && pushNextStepPath({ state: location.state });

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
            This is for us to tell whether or not your company is a good fit for
            us.
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
