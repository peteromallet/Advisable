import React from "react";
import { Formik, Form } from "formik";
import { useQuery } from "react-apollo";
import { Box, Text, Autocomplete, Button, useTheme } from "@advisable/donut";
import Logo from "../../../components/Logo";
import Select from "../../../components/Select";
import Checkbox from "../../../components/Checkbox";
import Loading from "../../../components/Loading";
import Testimonials from "../Testimonials";
import validationSchema from "./validationSchema";
import GET_DATA from "./getData";

const Criteria = ({ onSubmit }) => {
  const theme = useTheme();
  const { loading, data } = useQuery(GET_DATA);

  React.useLayoutEffect(() => {
    theme.updateTheme({ background: "white" });
    return () => theme.updateTheme({ background: "default" });
  }, []);

  if (loading) {
    return <Loading />;
  }

  const initialValues = {
    skill: "",
    industry: "",
    industryRequired: false,
    companyType: "",
    companyTypeRequired: false,
  };

  return (
    <Box paddingRight={{ _: null, l: 550 }}>
      <Box maxWidth={600} margin="0 auto" px="m">
        <Box py="xl">
          <Logo />
        </Box>
        <Text
          as="h1"
          mb="xs"
          fontSize={30}
          letterSpacing={-0.5}
          fontWeight="semibold"
          color="neutral.9"
        >
          Find the perfect specialist
        </Text>
        <Text fontSize="s" lineHeight="s" color="neutral.7" mb="l">
          Let us know what you are looking for so that we can find the perfect
          specialist for you.
        </Text>
        <Formik
          onSubmit={onSubmit}
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
                    formik.setFieldValue("skill", skill.value);
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
                    formik.setFieldValue("industry", industry.value);
                  }}
                />
              </Box>
              <Box mb="l">
                <Checkbox
                  name="industryRequired"
                  onChange={formik.handleChange}
                  value={formik.values.industryRequired}
                  label="Industry experience is important to me"
                />
              </Box>
              <Box mb="s">
                <Select
                  name="companyType"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.companyType}
                  label="What type of company are you?"
                  options={[
                    "Individual Entrepreneur",
                    "Small Business",
                    "Medium-Sized Business",
                    "Startup",
                    "Growth-Stage Startup",
                    "Major Corporation",
                    "Non-Profit",
                    "Education Institution",
                    "Government",
                  ]}
                />
              </Box>
              <Box mb="xl">
                <Checkbox
                  name="companyTypeRequired"
                  onChange={formik.handleChange}
                  value={formik.values.companyTypeRequired}
                  label="Experience with this type of company is important"
                />
              </Box>
              <Button appearance="primary" intent="success" size="l">
                Find a specialist
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
      <Box display={{ _: "none", l: "block" }}>
        <Testimonials />
      </Box>
    </Box>
  );
};

export default Criteria;
