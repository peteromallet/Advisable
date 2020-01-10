import React from "react";
import {
  Box,
  Text,
  Icon,
  Card,
  useTheme,
  Checkbox,
  Autocomplete,
  RoundedButton,
} from "@advisable/donut";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { useQuery } from "react-apollo";
import Select from "../../../components/Select";
import Loading from "../../../components/Loading";
import Images from "./Images";
import validationSchema from "./validationSchema";
import DATA from "./getData";

const FreelancerSearchCriteria = () => {
  const { updateTheme } = useTheme();
  const { data, loading } = useQuery(DATA);
  const history = useHistory();

  if (loading) return <Loading />;

  const initialValues = {
    skill: "",
    industry: "",
    industryRequired: false,
    companyType: "Growth-Stage Startup",
    companyTypeRequired: false,
  };

  const handleSubmit = values => {
    history.push({
      pathname: "/freelancer_search/results",
      state: {
        search: values,
      },
    });
  };

  return (
    <Box display="flex">
      <Box maxWidth={550} flexShrink={0}>
        <Card
          as={motion.div}
          padding="l"
          elevation="l"
          animate={{ y: 0, opacity: 1 }}
          initial={{ y: 40, opacity: 0 }}
        >
          <Text
            color="blue.9"
            fontSize={28}
            fontWeight="bold"
            letterSpacing="-0.022em"
            lineHeight="36px"
          >
            Find the Perfect Freelancer
          </Text>
          <Text fontSize="m" color="neutral.8" lineHeight="s" mb="l">
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
                <Box mb="m">
                  <Field
                    name="skill"
                    as={Autocomplete}
                    options={data.skills}
                    placeholder="Search for a skill"
                    label="What skill are you looking for?"
                    error={formik.submitCount > 0 && formik.errors.skill}
                    onChange={skill => {
                      formik.setFieldValue("skill", skill);
                    }}
                  />
                </Box>
                <Box mb="m">
                  <Field
                    as={Autocomplete}
                    name="industry"
                    placeholder="Industry"
                    label="What industry are you in?"
                    options={data.industries}
                    error={formik.submitCount > 0 && formik.errors.industry}
                    onChange={industry => {
                      formik.setFieldTouched("industry", true);
                      formik.setFieldValue("industry", industry);
                    }}
                  />
                  <Field
                    mt="s"
                    as={Checkbox}
                    type="checkbox"
                    name="industryRequired"
                  >
                    Industry experience is important to me
                  </Field>
                </Box>
                <Box mb="l">
                  <Field
                    as={Select}
                    name="companyType"
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
                  <Field
                    mt="s"
                    as={Checkbox}
                    type="checkbox"
                    name="companyTypeRequired"
                  >
                    Experience with this type of company is important
                  </Field>
                </Box>
                <RoundedButton size="l" prefix={<Icon icon="search" />}>
                  Find a freelancer
                </RoundedButton>
              </Form>
            )}
          </Formik>
        </Card>
      </Box>
      <Images />
    </Box>
  );
};

export default FreelancerSearchCriteria;
