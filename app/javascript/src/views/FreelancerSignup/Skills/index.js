import React from "react";
import { get } from "lodash";
import gql from "graphql-tag";
import { Formik, Form } from "formik";
import { useQuery } from "react-apollo";
import {
  Text,
  Box,
  Autocomplete,
  Button,
  Link,
  Skeleton,
} from "@advisable/donut";
import validationSchema from "./validationSchema";

const SKILLS = gql`
  query {
    skills {
      value: name
      label: name
    }
  }
`;

// Renders the freelancer signup flow.
const Skills = ({ history, location }) => {
  const skillsQuery = useQuery(SKILLS);

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
  const handleSubmit = values => {
    const state = { skills: values.skills };
    history.replace(`/freelancers/signup${location.search}`, state);
    // Continue to the account details step and pass the state.
    history.push(`/freelancers/signup/account${location.search}`, state);
  };

  if (skillsQuery.loading) {
    return (
      <>
        <Skeleton height={24} mb="xxs" maxWidth="60%" />
        <Skeleton height={24} width={160} mb="l" />
        <Skeleton height={13} width="80%" mb="xxs" />
        <Skeleton height={13} width="90%" mb="xxs" />
        <Skeleton height={13} width="30%" mb="xxs" />
      </>
    );
  }

  return (
    <>
      <Text as="h2" size="xxxl" weight="semibold" color="blue.9" mb="s">
        Apply to join our network of freelancers
      </Text>
      <Text size="s" color="neutral.5" lineHeight="m">
        Let us know what kind of projects you are looking for to begin the
        application process. Please add skill’s that you have used in previously
        completed projects.
      </Text>
      <Box bg="neutral.0" width="100%" height="1px" my="l" />
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {formik => (
          <Form>
            {skillsQuery.loading ? (
              <>loading...</>
            ) : (
              <Autocomplete
                multiple
                max={10}
                name="skills"
                description="Add up to 10 skill’s that you have used in previously completed projects."
                label="What type of projects are you looking for?"
                placeholder="e.g Online Marketing"
                options={skillsQuery.data.skills}
                onBlur={formik.handleBlur}
                value={formik.values.skills}
                error={formik.touched.skills && formik.errors.skills}
                onChange={skills => {
                  formik.setFieldTouched("skills", true);
                  formik.setFieldValue("skills", skills);
                }}
              />
            )}
            <Box bg="neutral.0" width="100%" height="1px" my="l" />
            <Button
              size="l"
              type="submit"
              iconRight="arrow-right"
              appearance="primary"
              intent="success"
            >
              Get Started
            </Button>
          </Form>
        )}
      </Formik>
      <Text size="s" weight="medium" color="neurtal.5" mt="l" mb="xxs">
        Already have an account?
      </Text>
      <Text size="s">
        <Link to="/login">Login to your account</Link>
      </Text>
    </>
  );
};

export default Skills;
