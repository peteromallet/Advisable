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
import { Autocomplete, Select, Box } from "@advisable/donut";
import { object, string } from "yup";
import MotionStack from "../MotionStack";
import { Loading } from "../../../../components/Loading/styles";
import Navigation from "../Navigation";
import { Title, Description } from "../styles";

const validationSchema = object().shape({
  companyName: string().required("Please enter your company name"),
  industry: string().required("Please enter your company industry"),
  companyType: string().required("Please enter your company type"),
});

function AboutCompany() {
  const locationState = useLocationState();
  const [updateClientApplication, { called }] = useAboutCompanyUpdate();
  const { loading, error, data } = useAboutCompanyQuery();

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
        input: {
          id: locationState.applicationId,
          ...values,
        },
      },
      optimisticResponse: getAboutCompanyOptimisticReponse(
        locationState.applicationId,
        values,
      ),
    });
  };

  return (
    <>
      <Navigation
        called={called}
        error={error}
        status={clientApplication.status}
      />
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {(formik) => (
          <Form>
            <MotionStack>
              <Title>About Your Company</Title>
              <Description>
                As next steps, we need you to answer a few questions in order to
                figure out if you&apos;re a good fit for Advisable
              </Description>
              <Box mb="m">
                <FormField
                  name="companyName"
                  placeholder="Company name"
                  label="What's the name of your company?"
                  isRequired
                />
              </Box>
              <Box mb="m">
                <FormField
                  isRequired
                  as={Autocomplete}
                  error={null}
                  options={industries}
                  name="industry"
                  placeholder="Select your company industry"
                  label="What industry is your company in?"
                  onChange={(industry) =>
                    formik.setFieldValue("industry", industry)
                  }
                />
              </Box>
              <Box mb="l">
                <FormField
                  isRequired
                  as={Select}
                  error={null}
                  name="companyType"
                  placeholder="Select your company type"
                  label="What type of company are you?"
                  onChange={formik.handleChange}
                  data-testid="companyType"
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
              </Box>
              <SubmitButton width={[1, "auto"]}>Continue</SubmitButton>
            </MotionStack>
          </Form>
        )}
      </Formik>
    </>
  );
}

AboutCompany.propTypes = {
  RedirectToInitialStep: PropTypes.elementType,
  RedirectToNextStep: PropTypes.elementType,
  RedirectToLastStep: PropTypes.elementType,
};

export default AboutCompany;
