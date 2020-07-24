import React from "react";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import { Text, Stack, Autocomplete } from "@advisable/donut";
import FormField from "src/components/FormField";
import SubmitButton from "../../../../components/SubmitButton";
import Loading from "../../../../components/Loading";
import CurrencyInput from "../../../../components/CurrencyInput";
import Select from "../../../../components/Select";
import {
  useAboutRequirementsQuery,
  useAboutRequirementsUpdate,
  getAboutRequirementsOptimisticReponse,
  useLocationState,
} from "../../queries";
import { string, array, object } from "yup";

const validationSchema = object().shape({
  skills: array().min(1).of(string().required()).required(),
  numberOfFreelancers: string().required(),
  budget: string(),
});

function AboutRequirements({
  RedirectToInitialStep,
  RedirectToNextStep,
  RedirectToLastStep,
}) {
  const locationState = useLocationState();
  const [updateClientApplication, { called }] = useAboutRequirementsUpdate();
  const { loading, error, data } = useAboutRequirementsQuery();

  if (loading) return <Loading />;
  if (error) return <RedirectToInitialStep />;
  if (called) return <RedirectToNextStep state={{ ...locationState }} />;
  if (data.clientApplication?.status !== "STARTED")
    return <RedirectToLastStep state={{ ...locationState }} />;
  const { clientApplication, skills } = data;

  // Formik
  const initialValues = {
    skills: clientApplication.skills.map((skill) => skill.name) || [],
    numberOfFreelancers: clientApplication.numberOfFreelancers || "1-3",
    budget: clientApplication.budget / 100 || "",
  };
  const handleSubmit = (values) => {
    values.budget = Number(values.budget) * 100;
    updateClientApplication({
      variables: {
        id: locationState.applicationId,
        ...values,
      },
      optimisticResponse: getAboutRequirementsOptimisticReponse(
        locationState.applicationId,
        values,
      ),
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
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
            About Your Requirements
          </Text>
          <Text mb="m">
            This is for us to figure out if your requirements are a good match
            for our talent.
          </Text>
          <Form>
            <Stack spacing="m" mb="l">
              <FormField
                as={Autocomplete}
                multiple
                max={5}
                error={null}
                name="skills"
                placeholder="Facebook Ads, Content Marketing, etc."
                label="What skills are you interested in using freelancers for over the next 6 months?*"
                options={skills}
                onChange={(skill) => formik.setFieldValue("skills", skill)}
              />
              <Select
                name="numberOfFreelancers"
                label="How many freelancers do you plan on hiring over the next 6 months?*"
                options={["0", "1-3", "4-10", "10+"]}
                value={formik.values.numberOfFreelancers}
                onChange={formik.handleChange}
              />
              <FormField
                as={CurrencyInput}
                name="budget"
                prefix="$"
                placeholder="99999"
                label="How much do you currently spend on freelancers per year? (optional)"
              />
            </Stack>
            <SubmitButton>Continue</SubmitButton>
          </Form>
        </>
      )}
    </Formik>
  );
}
AboutRequirements.propTypes = {
  RedirectToInitialStep: PropTypes.elementType,
  RedirectToNextStep: PropTypes.elementType,
  RedirectToLastStep: PropTypes.elementType,
};

export default AboutRequirements;
