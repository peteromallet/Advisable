import React from "react";
import { array, object } from "yup";
import { Formik, Form } from "formik";
import { useHistory } from "react-router";
import { ArrowRight } from "@styled-icons/feather/ArrowRight";
import { Box, Combobox, Error } from "@advisable/donut";
import FormField from "src/components/FormField";
import SubmitButton from "src/components/SubmitButton";
import AnimatedCard from "../components/AnimatedCard";
import StepNumber from "../components/StepNumber";
import Header from "../components/Header";
import CREATE_CASE_STUDY_SEARCH from "../../queries/createCaseStudySearch.gql";
import UPDATE_CASE_STUDY_SEARCH from "../../queries/updateCaseStudySearch.gql";
import { useApolloClient, useMutation } from "@apollo/client";
import { GET_SKILLS_CASE_STUDY_SEARCH } from "../useSavedSearch";
import { useLocation } from "react-router-dom";

export const validationSchema = object().shape({
  skills: array().min(1, "Please select at least one skill").required(),
});

export default function Skills({ caseStudySearch, skills }) {
  const client = useApolloClient();
  const [create] = useMutation(CREATE_CASE_STUDY_SEARCH);
  const [update] = useMutation(UPDATE_CASE_STUDY_SEARCH);

  const history = useHistory();
  const location = useLocation();

  const initialValues = {
    skills: caseStudySearch?.skills.map((s) => s.skill) || [],
  };

  const handleSubmit = async (values, { setStatus }) => {
    setStatus(null);

    const res = caseStudySearch
      ? await update({
          variables: {
            input: {
              id: caseStudySearch.id,
              skills: values.skills.map((s) => s.value),
            },
          },
        })
      : await create({
          variables: { input: { skills: values.skills.map((s) => s.value) } },
        });

    if (res.errors) {
      setStatus("Something went wrong, please try again");
      return;
    }

    const searchId =
      caseStudySearch?.id || res.data?.createCaseStudySearch?.search.id;

    if (!caseStudySearch) {
      // Prefetch caseStudySearch to prevent
      // loading state in parent component
      await client.query({
        query: GET_SKILLS_CASE_STUDY_SEARCH,
        variables: { id: searchId },
      });

      // Put search id to location state to read
      // it when user clicks back button
      history.replace(location.pathname, { id: searchId });
    }
    history.push(`/explore/new/${searchId}/goals`);
  };

  return (
    <AnimatedCard>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <Form>
            <StepNumber>Step 1 of 4</StepNumber>
            <Header>Skills</Header>
            <Box mb={6}>
              <FormField
                isRequired
                as={Combobox}
                multiple
                max={10}
                value={formik.values.skills}
                name="skills"
                onChange={(s) => formik.setFieldValue("skills", s)}
                label="What are the skills you're interested in?"
                placeholder="e.g Facebook Marketing"
                options={skills}
              />
            </Box>
            <Error>{formik.status}</Error>
            <SubmitButton
              mt={4}
              suffix={<ArrowRight />}
              disabled={formik.values.skills.length === 0}
              variant="gradient"
              size="l"
            >
              Continue
            </SubmitButton>
          </Form>
        )}
      </Formik>
    </AnimatedCard>
  );
}
