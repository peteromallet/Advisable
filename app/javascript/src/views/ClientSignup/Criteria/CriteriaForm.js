import React from "react";
import queryString from "query-string";
import { Formik, Form, Field } from "formik";
import { useQuery } from "react-apollo";
import { useLocation } from "react-router-dom";
import {
  Box,
  Text,
  Icon,
  Label,
  Select,
  Checkbox,
  useTheme,
  Autocomplete,
  RoundedButton,
} from "@advisable/donut";
import validationSchema from "./validationSchema";
import GET_DATA from "./getData";
import Loading from "./Loading";
import Testimonials from "./Testimonials";

function CriteriaForm({ onSubmit }) {
  const theme = useTheme();
  const location = useLocation();
  const formData = useQuery(GET_DATA);
  const queryParams = queryString.parse(location.search);

  React.useLayoutEffect(() => {
    theme.updateTheme({ background: "white" });
    return () => theme.updateTheme({ background: "default" });
  }, []);

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

  if (formData.loading) {
    return <Loading />;
  }

  return (
    <Box paddingRight={{ _: null, l: 550 }}>
      <Box py="xxl" maxWidth={600} margin="0 auto" px="m">
        <Text
          as="h2"
          mb="xs"
          color="blue.8"
          fontSize="30px"
          lineHeight="28px"
          fontWeight="semibold"
          letterSpacing="-0.035em"
        >
          Find the Perfect Freelancer
        </Text>
        <Text fontSize="l" color="neutral.8" lineHeight="m" mb="l">
          Let us know what you are looking for so that we can find the perfect
          freelancer for you.
        </Text>
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
                  options={formData.data.skills}
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
                  options={formData.data.industries}
                  error={formik.submitCount > 0 && formik.errors.industry}
                  onChange={industry => {
                    formik.setFieldTouched("industry", true);
                    formik.setFieldValue("industry", industry);
                  }}
                />
              </Box>
              <Field
                as={Checkbox}
                type="checkbox"
                name="industryRequired"
                mb="l"
              >
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
              <RoundedButton
                size="l"
                intent="success"
                appearance="primary"
                prefix={<Icon icon="search" />}
              >
                Find a specialist
              </RoundedButton>
            </Form>
          )}
        </Formik>
      </Box>
      <Box display={{ _: "none", l: "block" }}>
        <Testimonials />
      </Box>
    </Box>
  );
}

export default CriteriaForm;
