import React from "react";
import { Formik, Form } from "formik";
import { ArrowSmRight } from "@styled-icons/heroicons-solid";
import { useHistory, useLocation, Redirect } from "react-router";
import BackButton from "src/components/BackButton";
import { Heading, Box, Text } from "@advisable/donut";
import FormField from "src/components/FormField";
import CheckboxInput from "src/components/CheckboxInput";
import SubmitButton from "src/components/SubmitButton";
import { useCreateCaseStudySearch } from "../queries";

const PREFERENCES = [
  `The freelancer is available right now`,
  `The cost of this project is within our overall budget`,
  `The freelancer’s hourly rate is within a specific amount`,
];

export default function ShortlistPreferences() {
  const [createShortlist] = useCreateCaseStudySearch();
  const history = useHistory();
  const location = useLocation();
  const articles = location?.state?.articles || [];
  const skillCategory = location?.state?.skillCategory;

  if (articles.length === 0) {
    return <Redirect to={`/explore/new/${skillCategory}`} />;
  }

  const handleSubmit = async (values) => {
    const response = await createShortlist({
      variables: {
        input: {
          name: location.state.name,
          goals: location.state.goals,
          preferences: values.preferences,
          articles: location.state.articles,
        },
      },
    });

    const search = response?.data?.createCaseStudySearch?.search;
    history.push(`/explore/${search.id}`);
  };

  const initialValues = {
    preferences: [],
  };

  return (
    <>
      <BackButton
        marginBottom={4}
        to={{
          ...location,
          pathname: "/explore/new/goals",
        }}
      />
      <Heading
        fontSize="6xl"
        letterSpacing="-0.04em"
        marginBottom={3}
        lineHeight="40px"
      >
        What are your preferences?
      </Heading>
      <Box maxWidth="680px" marginBottom={8}>
        <Text fontSize="lg" lineHeight="24px">
          What’s important to you when searching for freelancers? We&apos;ll use
          this information to decide how to improve our recommendation engine in
          the future.
        </Text>
      </Box>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        <Form>
          <Box mb={6}>
            <FormField
              as={CheckboxInput}
              name="goals"
              environment="body"
              options={PREFERENCES}
              optionsPerRow={2}
            />
          </Box>
          <SubmitButton
            mt={4}
            variant="gradient"
            size="l"
            suffix={<ArrowSmRight />}
          >
            Continue
          </SubmitButton>
        </Form>
      </Formik>
    </>
  );
}
