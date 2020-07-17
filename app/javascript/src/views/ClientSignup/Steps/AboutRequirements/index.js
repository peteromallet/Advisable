import React from "react";
import PropTypes from "prop-types";
import { Formik, Form } from "formik";
import { Text, Stack, Autocomplete } from "@advisable/donut";
import FormField from "src/components/FormField";
import SubmitButton from "../../../../components/SubmitButton";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  ABOUT_REQUIREMENTS_QUERY,
  ABOUT_REQUIREMENTS_UPDATE,
} from "../../queries";
import { useLocation } from "react-router";
import { string, array, object } from "yup";

const numberOfFreelancersOptions = [
  { label: "0", value: "0" },
  { label: "1-3", value: "1-3" },
  { label: "4-10", value: "4-10" },
  { label: "10+", value: "10+" },
];

const validationSchema = object().shape({
  skills: array().min(1).of(string().required()).required(),
  numberOfFreelancers: string().required(),
  budget: string(),
});

function AboutRequirements({ pushNextStepPath, pushInitialStepPath }) {
  const location = useLocation();
  const { applicationId } = location.state;
  const [updateClientApplication, updateResponse] = useMutation(
    ABOUT_REQUIREMENTS_UPDATE,
    {
      variables: { id: applicationId },
    },
  );
  console.log("about requirements app id", applicationId);
  const { loading, error, data } = useQuery(ABOUT_REQUIREMENTS_QUERY, {
    variables: { id: applicationId },
  });
  console.log("about requirements data", data, error);

  if (error) pushInitialStepPath();
  if (loading) return <div>loading...</div>;

  // Formik
  const initialValues = {
    skills: data.clientApplication.skills.map((skill) => skill.name) || [],
    numberOfFreelancers: data.clientApplication.numberOfFreelancers || "",
    budget: data.clientApplication.budget || "",
  };
  const handleSubmit = (values) => {
    values.budget = parseInt(values.budget);
    console.log("values", values);
    updateClientApplication({
      variables: {
        id: applicationId,
        ...values,
      },
    });
  };

  updateResponse.data && pushNextStepPath({ state: location.state });
  console.log("update response", updateResponse);

  console.log("initial values", initialValues);

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
                options={data.skills}
                onChange={(skill) => formik.setFieldValue("skills", skill)}
              />
              <FormField
                as={Autocomplete}
                name="numberOfFreelancers"
                placeholder="1-3"
                label="How many freelancers do you plan on hiring over the next 6 months?*"
                options={numberOfFreelancersOptions}
                onChange={(number) =>
                  formik.setFieldValue("numberOfFreelancers", number)
                }
              />
              <FormField
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
  pushNextStepPath: PropTypes.func,
  pushInitialStepPath: PropTypes.func,
};

export default AboutRequirements;
