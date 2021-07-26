import React from "react";
import { Formik, Form } from "formik";
import { useHistory } from "react-router-dom";
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
import { useFinalizeCaseStudySearch, usePreferences } from "../queries";

function buildPreferences(data) {
  let preferences = [
    `The freelancer is available right now`,
    `The cost of this project is within our overall budget`,
    `The freelancer’s hourly rate is within a specific amount`,
  ];

  if (data?.currentCompany?.industry) {
    preferences = [
      `The company is in the ${data.currentCompany.industry.name} space`,
      ...preferences,
    ];
  }

  if (data?.currentCompany?.kind) {
    preferences = [
      `The company is ${data.currentCompany.kind}`,
      ...preferences,
    ];
  }

  if (data?.currentCompany?.businessType) {
    preferences = [
      `The company is ${data.currentCompany.businessType}`,
      ...preferences,
    ];
  }

  return preferences;
}

export default function EditPreferences({ caseStudySearch }) {
  const history = useHistory();
  const [finalize] = useFinalizeCaseStudySearch();
  const { data, loading } = usePreferences();

  const initialValues = {
    preferences: caseStudySearch.preferences || [],
  };

  if (loading) return <>loading...</>;

  const handleSubmit = async (values, { setStatus }) => {
    setStatus(null);

    const res = await finalize({
      variables: { input: { id: caseStudySearch.id, ...values } },
    });

    if (res.errors) {
      setStatus("Something went wrong, please try again");
      return;
    }

    history.push(`/explore/${caseStudySearch.id}`);
  };

  return (
    <AnimatedBox>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {(formik) => (
          <Form>
            {history.length > 1 && (
              <Button
                onClick={history.goBack}
                type="button"
                variant="minimal"
                size="xs"
                prefix={<ArrowLeft />}
              >
                Back
              </Button>
            )}
            <Heading mb={2.5}>Preferences</Heading>
            <Description>
              What’s important to you when searching for projects?
            </Description>
            <Box mb={6}>
              <FormField
                as={CheckboxInput}
                name="preferences"
                environment="body"
                options={buildPreferences(data)}
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
