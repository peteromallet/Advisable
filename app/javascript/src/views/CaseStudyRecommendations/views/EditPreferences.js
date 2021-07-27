import React from "react";
import { Formik, Form } from "formik";
import { useHistory } from "react-router-dom";
import { ArrowLeft } from "@styled-icons/heroicons-solid/ArrowLeft";
import { Search } from "@styled-icons/heroicons-solid/Search";
import { Box, Error, Button, Heading } from "@advisable/donut";
import FormField from "src/components/FormField";
import SubmitButton from "src/components/SubmitButton";
import CheckboxInput from "src/components/CheckboxInput";
import Description from "../components/Description";
// Queries
import { useFinalizeCaseStudySearch } from "../queries";

function buildPreferences(currentCompany) {
  let preferences = [
    `The freelancer is available right now`,
    `The cost of this project is within our overall budget`,
    `The freelancer’s hourly rate is within a specific amount`,
  ];

  if (currentCompany?.industry) {
    preferences = [
      `The company is in the ${currentCompany.industry.name} space`,
      ...preferences,
    ];
  }

  if (currentCompany?.kind) {
    preferences = [`The company is ${currentCompany.kind}`, ...preferences];
  }

  if (currentCompany?.businessType) {
    preferences = [
      `The company is ${currentCompany.businessType}`,
      ...preferences,
    ];
  }

  return preferences;
}

export default function EditPreferences({ currentCompany, caseStudySearch }) {
  const history = useHistory();
  const [finalize] = useFinalizeCaseStudySearch(caseStudySearch);

  const initialValues = {
    preferences: caseStudySearch.preferences || [],
  };

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
          <Heading size="5xl" mb={2.5}>
            Preferences
          </Heading>
          <Description>
            What’s important to you when searching for projects?
          </Description>
          <Box mb={6}>
            <FormField
              as={CheckboxInput}
              name="preferences"
              environment="body"
              options={buildPreferences(currentCompany)}
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
  );
}
