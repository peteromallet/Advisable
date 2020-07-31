import React from "react";
import gql from "graphql-tag";
import { get, sortBy } from "lodash-es";
import { Formik, Form } from "formik";
import { useQuery } from "@apollo/client";
import { Redirect } from "react-router-dom";
import { Text, Box, Link, Button, Autocomplete } from "@advisable/donut";
import Loading from "../../../components/Loading";
import validationSchema from "./validationSchema";
import { ArrowRight } from "@styled-icons/feather";

export const GET_SKILLS = gql`
  query {
    skills(local: true) {
      value: name
      label: name
    }
  }
`;

// Renders the freelancer signup flow.
const Skills = ({ history, location, specialist }) => {
  const { loading, data, error } = useQuery(GET_SKILLS);

  if (specialist) {
    return <Redirect to="/freelancers/signup/preferences" />;
  }

  const initialValues = {
    skills: get(location.state, "skills") || [],
  };

  // We want to store the skills in the location state so that they are
  // persisted accross browser refreshes and navigation. They are not actually
  // submitted to the api until the account details step is submitted. The
  // account details step component reads the skills from the location state.
  // Its important that we first replace the state so that if the user
  // navigates back to the skills step, we can read their previously selected
  // skills from the location state.
  const handleSubmit = (values) => {
    const state = { skills: values.skills };
    history.replace(`/freelancers/signup${location.search}`, state);
    // Continue to the account details step and pass the state.
    history.push(`/freelancers/signup/account${location.search}`, state);
  };

  return (
    <>
      <Text
        mb="s"
        as="h2"
        size="32px"
        lineHeight="34px"
        weight="semibold"
        color="blue900"
        letterSpacing="-0.02em"
      >
        Apply to join our network of freelancers
      </Text>
      <Text size="m" color="neutral700" lineHeight="m">
        Let us know what kind of projects you are looking for to begin the
        application process. Please add skill’s that you have used in previously
        completed projects.
      </Text>
      <Box bg="neutral100" width="100%" height="1px" my="l" />
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <Form>
            {loading ? (
              <Loading />
            ) : (
              <>
                <Autocomplete
                  multiple
                  max={10}
                  name="skills"
                  description="Add up to 10 skill’s that you have used in previously completed projects."
                  label="What type of projects are you looking for?"
                  placeholder="e.g Online Marketing"
                  options={sortBy(data.skills, ["label"])}
                  onBlur={formik.handleBlur}
                  value={formik.values.skills}
                  error={formik.touched.skills && formik.errors.skills}
                  onChange={(skills) => {
                    formik.setFieldTouched("skills", true);
                    formik.setFieldValue("skills", skills);
                  }}
                />
                <Box bg="neutral100" width="100%" height="1px" my="l" />
                <Button size="l" type="submit" suffix={<ArrowRight />}>
                  Get Started
                </Button>
              </>
            )}
          </Form>
        )}
      </Formik>
      <Text fontSize="s" fontWeight="medium" color="neutral800" mt="l" mb="xxs">
        Already have an account?
      </Text>
      <Text fontSize="s" mb="xl">
        <Link to="/login">Login to your account →</Link>
      </Text>
    </>
  );
};

export default Skills;
