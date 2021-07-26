import React from "react";
import { Formik, Form } from "formik";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ArrowLeft } from "@styled-icons/heroicons-solid/ArrowLeft";
import { Search } from "@styled-icons/heroicons-solid/Search";
import { Box, Error, Button } from "@advisable/donut";
import Heading from "src/components/Heading";
import FormField from "src/components/FormField";
import SubmitButton from "src/components/SubmitButton";
import CheckboxInput from "src/components/CheckboxInput";
import Description from "../components/Description";
import AnimatedBox from "../components/AnimatedBox";
// Queries
import FINALIZE_CASE_STUDY_SEARCH from "../queries/finalizeCaseStudySearch.gql";

export default function Preferences({ id, caseStudySearch }) {
  const history = useHistory();
  const [finalize] = useMutation(FINALIZE_CASE_STUDY_SEARCH);

  const preferencesOptions = [
    `The company is ${caseStudySearch.businessType}`,
    `The company is ${caseStudySearch.companyType}`,
    `The company is in the ${caseStudySearch.industry?.name} space`,
    // `The company is in [Location]`, // We don't know a location of a client
    `The freelancer is available right now`,
    `The cost of this project is within our overall budget`,
    `The freelancer’s hourly rate is within a specific amount`,
  ];

  const initialValues = {
    preferences: caseStudySearch.preferences,
  };

  const handleSubmit = async (values, { setStatus }) => {
    setStatus(null);

    const res = await finalize({
      variables: { input: { id, ...values } },
    });

    if (res.errors) {
      setStatus("Something went wrong, please try again");
      return;
    }

    history.push(`/explore/${id}`);
  };

  const handleBack = () => {
    history.push(`/explore/${id}/goals`);
  };

  return (
    <AnimatedBox>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {(formik) => (
          <Form>
            <Button
              onClick={handleBack}
              type="button"
              variant="minimal"
              size="xs"
              prefix={<ArrowLeft />}
            >
              Back
            </Button>
            <Heading mb={2.5}>Preferences</Heading>
            <Description>
              What’s important to you when searching for projects?
            </Description>
            <Box mb={6}>
              <FormField
                as={CheckboxInput}
                name="preferences"
                environment="body"
                options={preferencesOptions}
                optionsPerRow={1}
              />
            </Box>
            <Error>{formik.status}</Error>
            <SubmitButton
              mt={4}
              prefix={<Search />}
              disabled={formik.values.preferences.length === 0}
              variant="gradient"
              size="l"
            >
              Search for Case Studies
            </SubmitButton>
          </Form>
        )}
      </Formik>
    </AnimatedBox>
  );
}
