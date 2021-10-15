import React from "react";
import { Formik, Form } from "formik";
import { ArrowSmRight } from "@styled-icons/heroicons-solid";
import { Redirect, useHistory, useLocation } from "react-router";
import { Heading, Box, Text } from "@advisable/donut";
import FormField from "src/components/FormField";
import SubmitButton from "src/components/SubmitButton";
import BackButton from "src/components/BackButton";
import { useCreateCaseStudySearch } from "../queries";

export default function ShortlistName() {
  const history = useHistory();
  const location = useLocation();
  const [createShortlist] = useCreateCaseStudySearch();
  const articles = location?.state?.articles || [];
  const skillCategory = location?.state?.skillCategory;

  if (articles.length === 0) {
    return <Redirect to={`/explore/new/${skillCategory}`} />;
  }

  const handleSubmit = async (values) => {
    const response = await createShortlist({
      variables: {
        input: {
          name: values.name,
          goals: location.state.goals,
          articles: location.state.articles,
        },
      },
    });

    const search = response?.data?.createCaseStudySearch?.search;
    history.push(`/explore/${search.id}`);
  };

  const initialValues = {
    name: location.state.category.name,
  };

  return (
    <>
      <BackButton
        marginBottom={4}
        to={{
          ...location,
          pathname: `/explore/new/goals`,
        }}
      />
      <Heading
        fontSize="6xl"
        letterSpacing="-0.04em"
        marginBottom={3}
        lineHeight="40px"
      >
        What would you like to call this shortlist?
      </Heading>
      <Box maxWidth="680px" marginBottom={8}>
        <Text fontSize="lg" lineHeight="24px">
          Nearly there! Let&apos;s give your shortlist a name.
        </Text>
      </Box>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        <Form>
          <Box mb={6} maxWidth="400px">
            <FormField name="name" autoFocus />
          </Box>
          <SubmitButton
            mt={4}
            variant="gradient"
            size="l"
            suffix={<ArrowSmRight />}
          >
            Create shortlist
          </SubmitButton>
        </Form>
      </Formik>
    </>
  );
}
