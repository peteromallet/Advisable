import React from "react";
import { Formik, Form } from "formik";
import { Autocomplete, Box } from "@advisable/donut";
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
import { motion } from "framer-motion";
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
  const locationState = useLocationState();
  const [updateClientApplication, { called }] = useAboutRequirementsUpdate();
  const { loading, error, data } = useAboutRequirementsQuery();

  if (loading || error)
    return (
      <motion.div exit>
        <Navigation error={error} />
        <Loading />
      </motion.div>
    );

  const { clientApplication, skills } = data;

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
          id: locationState.applicationId,
          ...convertedValues,
        },
      },
      optimisticResponse: getAboutRequirementsOptimisticReponse(
        locationState.applicationId,
        convertedValues,
      ),
    });
  };

  return (
    <>
      <Navigation called={called} status={clientApplication.status} />
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
                  optionsPerRow={1}
                  name="numberOfFreelancers"
                  onChange={(n) =>
                    formik.setFieldValue("numberOfFreelancers", n)
                  }
                  error={null}
                  label="How many freelancers would you like to hire over the next 6 months?"
                  options={[
                    { label: "0", value: "0" },
                    { label: "1–3", value: "1-3" },
                    { label: "4–10", value: "4-10" },
                    { label: "10+", value: "10+" },
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
            </MotionStack>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default AboutRequirements;
