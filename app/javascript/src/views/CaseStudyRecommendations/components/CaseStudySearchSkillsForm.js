import React, { useMemo } from "react";
import { array, object } from "yup";
import { Formik, Form } from "formik";
import { ArrowRight } from "@styled-icons/heroicons-solid/ArrowRight";
import { Search } from "@styled-icons/heroicons-solid/Search";
import { Plus } from "@styled-icons/heroicons-solid/Plus";
import { Box, Text, Combobox, Error, Tag, theme } from "@advisable/donut";
import Heading from "src/components/Heading";
import FormField from "src/components/FormField";
import SubmitButton from "src/components/SubmitButton";
import AnimatedBox from "./AnimatedBox";
import Description from "./Description";
import { useNewSearch } from "../queries";

export const validationSchema = object().shape({
  skills: array().min(1, "Please select at least one skill").required(),
});

function PopularSkills({ popularSkills, formik }) {
  const filtered = useMemo(() => {
    const names = formik.values.skills.map((s) => s.value);
    return popularSkills.filter((s) => !names.includes(s.value));
  }, [formik.values.skills, popularSkills]);

  return filtered.map((s) => (
    <Tag
      size="s"
      key={s.value}
      marginRight={2}
      marginBottom={2}
      icon={Plus}
      onClick={() => {
        const newValue = [...formik.values.skills, s];
        formik.setFieldValue("skills", newValue);
      }}
    >
      {s.label}
    </Tag>
  ));
}

export default function CaseStudySearchSkillsForm({ initialValues, onSubmit }) {
  const { data, loading } = useNewSearch();

  if (loading) return <>loading...</>;

  return (
    <AnimatedBox>
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <Form>
            <Heading mb={2.5}>What skills are you looking for?</Heading>
            <Description mb={8}>
              Select the skills you are interested in below
            </Description>
            <Box mb={9}>
              <FormField
                isRequired
                as={Combobox}
                multiple
                max={10}
                value={formik.values.skills}
                name="skills"
                onChange={(s) => {
                  formik.setFieldValue("skills", s);
                }}
                environment="body"
                placeholder="Search for skills..."
                prefix={<Search fill={theme.colors.neutral400} />}
                options={data.skills}
              />
            </Box>
            <Text fontSize="l" color="neutral500" mb={1}>
              Popular skills in the SaaS industry
            </Text>
            <Box paddingTop={2} mb={4}>
              <PopularSkills
                popularSkills={data.popularCaseStudySkills}
                formik={formik}
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
    </AnimatedBox>
  );
}
