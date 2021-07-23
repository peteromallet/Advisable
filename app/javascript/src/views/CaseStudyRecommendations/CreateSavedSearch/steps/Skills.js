import React, { useState } from "react";
import { array, object } from "yup";
import { Formik, Form } from "formik";
import { useHistory } from "react-router-dom";
import { useApolloClient, useMutation } from "@apollo/client";
import { ArrowRight } from "@styled-icons/heroicons-solid/ArrowRight";
import { Search } from "@styled-icons/heroicons-solid/Search";
import { Plus } from "@styled-icons/heroicons-solid/Plus";
import { Box, Text, Combobox, Error, Tag, theme } from "@advisable/donut";
import Heading from "src/components/Heading";
import FormField from "src/components/FormField";
import SubmitButton from "src/components/SubmitButton";
import AnimatedCard from "../components/AnimatedCard";
// Queries
import { GET_SKILLS_CASE_STUDY_SEARCH } from "../queries/useSavedSearch";
import CREATE_CASE_STUDY_SEARCH from "../queries/createCaseStudySearch.gql";
import UPDATE_CASE_STUDY_SEARCH from "../queries/updateCaseStudySearch.gql";
import GET_SEARCHES from "../../queries/sidebar.gql";

export const validationSchema = object().shape({
  skills: array().min(1, "Please select at least one skill").required(),
});

export default function Skills({
  caseStudySearch,
  skills,
  popularCaseStudySkills,
}) {
  const client = useApolloClient();
  const [create] = useMutation(CREATE_CASE_STUDY_SEARCH);
  const [update] = useMutation(UPDATE_CASE_STUDY_SEARCH);
  const [popularSkills, setPopularSkills] = useState(
    popularCaseStudySkills.filter(
      (ps) => !caseStudySearch.skills.find((s) => s.skill.value === ps.value),
    ),
  );

  const history = useHistory();

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
          update(cache, { data }) {
            const previous = cache.readQuery({ query: GET_SEARCHES });
            cache.writeQuery({
              query: GET_SEARCHES,
              data: {
                ...previous,
                caseStudySearches: [
                  ...previous.caseStudySearches,
                  { ...data.createCaseStudySearch.search },
                ],
              },
            });
          },
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
    history.push(`/explore/${searchId}/goals`);
  };

  const updatePopularSkills = (newValue) => {
    const updatedPopularSkills = popularCaseStudySkills.filter(
      (ps) => !newValue.find((s) => s.value === ps.value),
    );
    setPopularSkills(updatedPopularSkills);
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
            <Heading mb={2.5}>What skills are you looking for?</Heading>
            <Box mb={6}>
              <FormField
                isRequired
                as={Combobox}
                multiple
                max={10}
                value={formik.values.skills}
                name="skills"
                onChange={(s) => {
                  formik.setFieldValue("skills", s);
                  updatePopularSkills(s);
                }}
                environment="body"
                placeholder="Search for skills..."
                prefix={<Search fill={theme.colors.neutral400} />}
                options={skills}
              />
            </Box>
            <Error>{formik.status}</Error>
            <Text fontSize="l" color="neutral500" mb={2}>
              Popular skills in the SaaS industry
            </Text>
            <Box paddingTop={2}>
              {popularSkills.map((s) => (
                <Tag
                  size="s"
                  key={s.value}
                  marginRight={2}
                  marginBottom={2}
                  icon={Plus}
                  onClick={() => {
                    const newValue = [...formik.values.skills, s];
                    formik.setFieldValue("skills", newValue);
                    updatePopularSkills(newValue);
                  }}
                >
                  {s.label}
                </Tag>
              ))}
            </Box>
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
