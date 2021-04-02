import React from "react";
import { Formik, Form } from "formik";
import { string, array, object } from "yup";
import { Redirect, useHistory, useLocation } from "react-router";
import { Autocomplete, Box } from "@advisable/donut";
import FormField from "src/components/FormField";
import SubmitButton from "src/components/SubmitButton";
import Loading from "src/components/Loading";
import CurrencyInput from "src/components/CurrencyInput";
import {
  useAboutRequirementsQuery,
  useAboutRequirementsUpdate,
  getAboutRequirementsOptimisticReponse,
} from "../../queries";
import { Title, Description } from "../styles";
import TilesInput from "../../TilesInput";

const validationSchema = object().shape({
  skills: array()
    .min(1, "Please enter your skill requirements")
    .of(string().required())
    .required(),
  numberOfFreelancers: string().required(
    "Please enter how many freelancers you might require",
  ),
  budget: string(),
});

function AboutRequirements() {
  const location = useLocation();
  const history = useHistory();
  const [updateClientApplication] = useAboutRequirementsUpdate();
  const { loading, error, data } = useAboutRequirementsQuery();

  if (loading) return <Loading />;
  if (error) return <Redirect to="/clients/signup" />;

  const { clientApplication, skills } = data;

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
    skills: clientApplication.skills.map((skill) => skill.name) || [],
    numberOfFreelancers: clientApplication.numberOfFreelancers || "",
    budget: clientApplication.budget / 100 || "",
  };

  const handleSubmit = (values) => {
    const convertedValues = {
      ...values,
      budget: Number(values.budget) * 100,
    };
    updateClientApplication({
      variables: {
        input: {
          id: location.state?.applicationId,
          ...convertedValues,
        },
      },
      optimisticResponse: getAboutRequirementsOptimisticReponse(
        location.state?.applicationId,
        convertedValues,
      ),
    });
    history.push({
      pathname: "/clients/signup/about_your_preferences",
      state: { ...location.state },
    });
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <Form>
            <Title>About Your Requirements</Title>
            <Description>
              This is for us to figure out if your requirements are a good match
              for our talent.
            </Description>
            <Box mb="m">
              <FormField
                isRequired
                as={Autocomplete}
                multiple
                max={5}
                error={null}
                name="skills"
                placeholder="Select the skills you're looking for"
                label="What freelancer skills are you looking for?"
                options={skills}
                onChange={(skill) => formik.setFieldValue("skills", skill)}
              />
            </Box>
            <Box mb="m">
              <FormField
                isRequired
                as={TilesInput}
                fullWidth
                alignWidth
                optionsPerRow={1}
                name="numberOfFreelancers"
                onChange={(n) => formik.setFieldValue("numberOfFreelancers", n)}
                error={null}
                label="How many freelancers would you like to hire over the next 6 months?"
                options={[
                  { label: "0", value: "0" },
                  { label: "1–3", value: "1-3", ariaLabel: "One to three" },
                  { label: "4–10", value: "4-10", ariaLabel: "Four to ten" },
                  { label: "10+", value: "10+", ariaLabel: "More than 10" },
                ]}
                value={formik.values.numberOfFreelancers}
              />
            </Box>
            <Box mb="l">
              <FormField
                as={CurrencyInput}
                name="budget"
                prefix="$"
                suffix="yearly"
                placeholder="Enter your estimated spend"
                label="How much do you currently spend on freelancers per year?"
                data-testid="budget"
              />
            </Box>
            <SubmitButton width={[1, "auto"]}>Continue</SubmitButton>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default AboutRequirements;
