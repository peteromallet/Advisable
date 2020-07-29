import React from "react";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import { Select, Autocomplete, Box } from "@advisable/donut";
import FormField from "src/components/FormField";
import SubmitButton from "../../../../components/SubmitButton";
import Loading from "../../../../components/Loading";
import CurrencyInput from "../../../../components/CurrencyInput";
import {
  useAboutRequirementsQuery,
  useAboutRequirementsUpdate,
  getAboutRequirementsOptimisticReponse,
  useLocationState,
} from "../../queries";
import { string, array, object } from "yup";
import MotionStack from "../MotionStack";
import Navigation from "../Navigation";
import { Title, Description } from "../styles";

const validationSchema = object().shape({
  skills: array().min(1).of(string().required()).required(),
  numberOfFreelancers: string().required(
    "number of freelancers is a required field",
  ),
  budget: string(),
});

function AboutRequirements() {
  const locationState = useLocationState();
  const [updateClientApplication, { called }] = useAboutRequirementsUpdate();
  const { loading, error, data } = useAboutRequirementsQuery();

  if (loading) return <Loading />;

  const { clientApplication, skills } = data;

  // Formik
  const initialValues = {
    skills: clientApplication.skills.map((skill) => skill.name) || [],
    numberOfFreelancers: clientApplication.numberOfFreelancers || "",
    budget: clientApplication.budget / 100 || "",
  };
  const handleSubmit = (values) => {
    values.budget = Number(values.budget) * 100;
    updateClientApplication({
      variables: {
        input: {
          id: locationState.applicationId,
          ...values,
        },
      },
      optimisticResponse: getAboutRequirementsOptimisticReponse(
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
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <Form>
            <MotionStack spacing="m">
              <Title>About Your Requirements</Title>
              <Description>
                This is for us to figure out if your requirements are a good
                match for our talent.
              </Description>
              <Box mb="m">
                <FormField
                  isRequired
                  as={Autocomplete}
                  multiple
                  max={5}
                  error={null}
                  name="skills"
                  placeholder="Facebook Ads, Content Marketing, etc."
                  label="What skill are you looking for?"
                  options={skills}
                  onChange={(skill) => formik.setFieldValue("skills", skill)}
                />
              </Box>
              <Box mb="m">
                <FormField
                  isRequired
                  as={Select}
                  name="numberOfFreelancers"
                  label="How many freelancers would you like to hire over the next 6 months?"
                  placeholder="Number of freelancers"
                  error={null}
                  value={formik.values.numberOfFreelancers}
                  onChange={formik.handleChange}
                  data-testid="numberOfFreelancers"
                >
                  <option>0</option>
                  <option>1-3</option>
                  <option>4-10</option>
                  <option>10+</option>
                </FormField>
              </Box>
              <Box mb="l">
                <FormField
                  as={CurrencyInput}
                  name="budget"
                  prefix="$"
                  suffix="per year"
                  placeholder="99999"
                  label="How much do you currently spend on freelancers per year?"
                  data-testid="budget"
                />
              </Box>
              <SubmitButton width={[1, "auto"]}>Continue</SubmitButton>
            </MotionStack>
          </Form>
        )}
      </Formik>
    </>
  );
}
AboutRequirements.propTypes = {
  RedirectToInitialStep: PropTypes.elementType,
  RedirectToNextStep: PropTypes.elementType,
  RedirectToLastStep: PropTypes.elementType,
};

export default AboutRequirements;
