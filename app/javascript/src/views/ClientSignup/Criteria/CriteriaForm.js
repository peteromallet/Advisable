import React from "react";
import * as Yup from "yup";
import queryString from "query-string";
import { Formik, Form, Field } from "formik";
import { useLocation } from "react-router-dom";
import {
  Box,
  Icon,
  Label,
  Select,
  Checkbox,
  Autocomplete,
  RoundedButton,
} from "@advisable/donut";

const validationSchema = Yup.object({
  skill: Yup.string().required("Please select a skill"),
  industry: Yup.string().required("Please provide what industry are in"),
});

function CriteriaForm({ onSubmit, data }) {
  const location = useLocation();
  const queryParams = queryString.parse(location.search);

  const initialValues = {
    skill: queryParams.skill || "",
    industry: "",
    industryRequired: false,
    companyType: "Growth-Stage Startup",
    companyTypeRequired: false,
  };

  const handleSubmit = values => {
    let searchInput = {
      skill: values.skill,
      industry: values.industry,
      companyType: values.companyType,
    };

    if (values.industryRequired) {
      searchInput.industryRequired = true;
    }

    if (values.companyTypeRequired) {
      searchInput.companyTypeRequired = true;
    }

    onSubmit(searchInput);
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {formik => (
        <Form>
          <Box mb="l">
            <Autocomplete
              name="skill"
              value={formik.values.skill}
              placeholder="Search for a skill"
              label="What skill are you looking for?"
              options={data.skills}
              error={formik.submitCount > 0 && formik.errors.skill}
              onChange={skill => {
                formik.setFieldValue("skill", skill);
              }}
            />
          </Box>
          <Box mb="s">
            <Autocomplete
              name="industry"
              placeholder="Industry"
              value={formik.values.industry}
              label="What industry are you in?"
              options={data.industries}
              error={formik.submitCount > 0 && formik.errors.industry}
              onChange={industry => {
                formik.setFieldTouched("industry", true);
                formik.setFieldValue("industry", industry);
              }}
            />
          </Box>
          <Field as={Checkbox} type="checkbox" name="industryRequired" mb="l">
            Industry experience is important to me
          </Field>
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
          <Field
            as={Checkbox}
            type="checkbox"
            name="companyTypeRequired"
            mb="xl"
          >
            Experience with this type of company is important
          </Field>
          <RoundedButton size="l" type="submit" prefix={<Icon icon="search" />}>
            Find a specialist
          </RoundedButton>
        </Form>
      )}
    </Formik>
  );
}

export default CriteriaForm;
