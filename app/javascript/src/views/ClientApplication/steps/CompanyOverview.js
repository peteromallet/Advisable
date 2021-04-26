import React from "react";
import { object, string } from "yup";
import { Formik, Form } from "formik";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { ArrowRight } from "@styled-icons/feather/ArrowRight";
import { Box, Select, Error, Combobox } from "@advisable/donut";
import FormField from "src/components/FormField";
import SubmitButton from "src/components/SubmitButton";
import AnimatedCard from "../components/AnimatedCard";
import Header from "../components/Header";
import Description from "../components/Description";
import StepNumber from "../components/StepNumber";
import { UPDATE_CLIENT_APPLICATION } from "../queries";

export const validationSchema = object().shape({
  companyName: string().required("Please enter your company name"),
  businessType: string().required("Please enter your business type"),
  industry: object().required("Please enter your company industry"),
});

export default function CompanyOverview({ clientApplication, industries }) {
  const [update] = useMutation(UPDATE_CLIENT_APPLICATION);
  const history = useHistory();

  const initialValues = {
    companyName: clientApplication.companyName || "",
    businessType: clientApplication.businessType || "",
    industry: clientApplication.industry?.name || "",
  };

  const handleSubmit = async (values, { setStatus }) => {
    setStatus(null);
    const res = await update({
      variables: {
        input: { ...values, industry: values.industry.value },
      },
    });

    if (res.errors) {
      setStatus(res.errors[0]?.message);
      return;
    }

    history.push("/clients/apply/company-stage");
  };

  return (
    <AnimatedCard>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form>
            <StepNumber>Step 1 of 4</StepNumber>
            <Header>Company Overview</Header>
            <Description>Some description</Description>
            <Box mb={6}>
              <Box mb="l">
                <FormField
                  name="companyName"
                  label="Company Name"
                  placeholder="Company name"
                />
              </Box>
              <Box mb="l">
                <FormField
                  isRequired
                  as={Select}
                  error={null}
                  name="businessType"
                  placeholder="Select your business type"
                  label="How would you describe your company?"
                  onChange={formik.handleChange}
                  data-testid="companyType"
                >
                  <option>B2B</option>
                  <option>B2C</option>
                </FormField>
              </Box>
              <Box mb="l">
                <FormField
                  isRequired
                  name="industry"
                  as={Combobox}
                  options={industries}
                  onChange={(i) => formik.setFieldValue("industry", i)}
                  placeholder="Select your company industry"
                  label="What industry is your company in?"
                />
              </Box>
            </Box>
            <Error>{formik.status}</Error>
            <SubmitButton
              mt={4}
              suffix={<ArrowRight />}
              variant="gradient"
              size="l"
            >
              Continue
            </SubmitButton>
          </Form>
        )}
      </Formik>
    </AnimatedCard>
  );
}
