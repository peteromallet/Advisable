import React from "react";
import { object, string } from "yup";
import { Formik, Form } from "formik";
import { Redirect, useHistory, useLocation } from "react-router";
import {
  useAboutCompanyQuery,
  useAboutCompanyUpdate,
  getAboutCompanyOptimisticReponse,
} from "../../queries";
import FormField from "src/components/FormField";
import SubmitButton from "src/components/SubmitButton";
import { Autocomplete, Select, Box } from "@advisable/donut";
import { Loading } from "src/components/Loading/styles";
import MotionStack from "../MotionStack";
import { Title, Description } from "../styles";

const validationSchema = object().shape({
  companyName: string().required("Please enter your company name"),
  industry: string().required("Please enter your company industry"),
  companyType: string().required("Please enter your company type"),
});

function AboutCompany() {
  const location = useLocation();
  const history = useHistory();
  const [updateClientApplication] = useAboutCompanyUpdate();
  const { loading, error, data } = useAboutCompanyQuery();

  if (loading) return <Loading />;
  if (error) return <Redirect to="/clients/signup" />;

  const { clientApplication, industries } = data;

  if (clientApplication?.status !== "Application Started")
    return (
      <Redirect
        to={{
          pathname: "/clients/signup/status",
          state: { ...location.state },
        }}
      />
    );

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
          id: location.state?.applicationId,
          ...values,
        },
      },
      optimisticResponse: getAboutCompanyOptimisticReponse(
        location.state?.applicationId,
        values,
      ),
    });

    history.push({
      pathname: "/clients/signup/about_your_requirements",
      state: { ...location.state },
    });
  };

  return (
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
  );
}

export default AboutCompany;
