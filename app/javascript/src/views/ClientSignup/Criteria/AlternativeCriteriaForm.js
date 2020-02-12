// A version of the criteria form where the industry and company type
// are hidden initially.
import React from "react";
import * as Yup from "yup";
import { motion } from "framer-motion";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import {
  Box,
  Text,
  Autocomplete,
  RoundedButton,
  Icon,
  Select,
  Label,
  Checkbox,
} from "@advisable/donut";
import { Formik, Form, Field } from "formik";
import { StyledPopularSkill } from "./styles";

const validationSchema = Yup.object({
  skill: Yup.string().required("Please select a skill"),
});

function AlternativeCriteriaForm({ data, onSubmit }) {
  const location = useLocation();
  const queryParams = queryString.parse(location.search);

  const initialValues = {
    skill: queryParams.skill,
    industry: "",
    companyType: "Growth-Stage Startup",
    experienceRequired: false,
  };

  const handleSubmit = async values => {
    const search = {
      skill: values.skill,
    };

    if (values.experienceRequired) {
      search.industry = values.industry;
      search.industryRequired = true;
      search.companyType = values.companyType;
      search.companyTypeRequired = true;
    }

    onSubmit(search);
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {formik => (
        <Form>
          <Field
            mb="m"
            name="skill"
            as={Autocomplete}
            placeholder="Search for a skill"
            label="What skill are you looking for?"
            options={data.skills}
            error={formik.submitCount > 0 && formik.errors.skill}
            onChange={skill => {
              formik.setFieldValue("skill", skill);
            }}
          />
          <Box>
            <Text mb="s" fontSize="s" color="neutral.7" letterSpacing="-0.02em">
              Popular skills
            </Text>
            {data.popularSkills.nodes.map((skill, i) => (
              <StyledPopularSkill
                key={skill.id}
                type="button"
                as={motion.button}
                onClick={() => formik.setFieldValue("skill", skill.name)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.05 * i }}
                isSelected={formik.values.skill === skill.name}
              >
                {skill.name}
              </StyledPopularSkill>
            ))}
          </Box>
          <Box height={1} bg="neutral.1" my="l" />
          <Field as={Checkbox} type="checkbox" name="experienceRequired">
            Experience working at companies similar to mine is important
          </Field>
          {formik.values.experienceRequired && (
            <>
              <Field
                mt="l"
                mb="m"
                name="industry"
                as={Autocomplete}
                placeholder="What industry are you in?"
                label="What industry are you in?"
                options={data.industries}
                error={formik.submitCount > 0 && formik.errors.industry}
                onChange={industry => {
                  formik.setFieldTouched("industry", true);
                  formik.setFieldValue("industry", industry);
                }}
              />
              <Label htmlFor="companyType" mb="xs">
                What type of company are you?
              </Label>
              <Field as={Select} id="companyType" name="companyType" mb="s">
                <option>Individual Entrepreneur</option>
                <option>Small Business</option>
                <option>Medium-Sized Business</option>
                <option>Startup</option>
                <option>Growth-Stage Startup</option>
                <option>Major Corporation</option>
                <option>Non-Profit</option>
                <option>Education Institution</option>
                <option>Government</option>
              </Field>
            </>
          )}
          <Box height={1} bg="neutral.1" my="l" />
          <RoundedButton size="l" type="submit" prefix={<Icon icon="search" />}>
            Find a specialist
          </RoundedButton>
        </Form>
      )}
    </Formik>
  );
}

export default AlternativeCriteriaForm;
