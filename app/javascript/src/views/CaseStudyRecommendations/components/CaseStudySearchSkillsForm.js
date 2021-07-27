import React, { useMemo } from "react";
import { array, object } from "yup";
import { Formik, Form } from "formik";
import css from "@styled-system/css";
import { ArrowRight } from "@styled-icons/heroicons-solid/ArrowRight";
import { Search } from "@styled-icons/heroicons-solid/Search";
import { Plus } from "@styled-icons/heroicons-solid/Plus";
import { Box, Text, Combobox, Error, Heading, theme } from "@advisable/donut";
import FormField from "src/components/FormField";
import SubmitButton from "src/components/SubmitButton";
import Description from "./Description";

export const validationSchema = object().shape({
  skills: array().min(1, "Please select at least one skill").required(),
});

function PopularSkills({ popularSkills, formik, disabled }) {
  const filtered = useMemo(() => {
    const names = formik.values.skills.map((s) => s.value);
    return popularSkills.filter((s) => !names.includes(s.value));
  }, [formik.values.skills, popularSkills]);

  return filtered.map((s) => (
    <Box
      key={s.value}
      onClick={() => {
        if (disabled) return;
        const newValue = [...formik.values.skills, s];
        formik.setFieldValue("skills", newValue);
      }}
      marginRight={2}
      marginBottom={2}
      color="blue700"
      border="1px solid"
      borderColor="blue200"
      alignItems="center"
      display="inline-flex"
      height="32px"
      borderRadius="12px"
      paddingLeft={2}
      paddingRight={3}
      fontSize="15px"
      fontWeight={300}
      opacity={disabled ? 0.5 : 1}
      css={
        !disabled &&
        css({
          cursor: "pointer",
          "&:hover": {
            bg: "blue50",
          },
        })
      }
    >
      <Plus size={20} />
      <Box paddingLeft={0.5} marginTop="-1px">
        {s.label}
      </Box>
    </Box>
  ));
}

export default function CaseStudySearchSkillsForm({
  skills,
  popularSkills,
  initialValues,
  onSubmit,
}) {
  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {(formik) => (
        <Form>
          <Heading size="5xl" mb={2.5}>
            What skills are you looking for?
          </Heading>
          <Description mb={8}>
            Select the skills you are interested in below
          </Description>
          <Box mb={9}>
            <FormField
              isRequired
              as={Combobox}
              multiple
              max={3}
              value={formik.values.skills}
              name="skills"
              onChange={(s) => {
                formik.setFieldValue("skills", s);
              }}
              placeholder="Search for skills..."
              prefix={<Search fill={theme.colors.neutral400} />}
              options={skills}
            />
          </Box>
          <Text fontSize="md" color="neutral500" mb={1}>
            Popular skills in the SaaS industry
          </Text>
          <Box paddingTop={2} mb={4}>
            <PopularSkills
              disabled={formik.values.skills.length >= 3}
              popularSkills={popularSkills}
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
  );
}
