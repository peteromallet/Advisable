import React from "react";
import { Search } from "@styled-icons/feather";
import {
  Box,
  Text,
  Checkbox,
  Autocomplete,
  Button,
  useTheme,
} from "@advisable/donut";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { useQuery } from "@apollo/react-hooks";
import { Container } from "./styles";
import Select from "../../../components/Select";
import TextField from "../../../components/TextField";
import Loading from "../../../components/Loading";
import Images from "./Images";
import validationSchema from "./validationSchema";
import DATA from "./getData";

const FreelancerSearchCriteria = () => {
  const history = useHistory();
  const theme = useTheme();
  const { data, loading } = useQuery(DATA);

  React.useEffect(() => {
    theme.updateTheme({ background: "white" });
    return () => theme.updateTheme({ background: "default" });
  }, []);

  if (loading) return <Loading />;

  const initialValues = {
    skill: "",
    industry: data.viewer?.industry?.name || "",
    industryExperienceRequired: false,
    companyType: data.viewer?.companyType || "Growth-Stage Startup",
    companyExperienceRequired: false,
    description: "",
  };

  const handleSubmit = (values) => {
    history.push({
      pathname: "/freelancer_search/search",
      state: {
        search: values,
      },
    });
  };

  return (
    <Container>
      <Box
        as={motion.div}
        py="m"
        elevation="l"
        animate={{ y: 0, opacity: 1 }}
        initial={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <Text
          as="h2"
          mb="xxs"
          color="blue.8"
          fontSize="30px"
          lineHeight="28px"
          fontWeight="semibold"
          letterSpacing="-0.035em"
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
          {(formik) => (
            <Form>
              <Box mb="m">
                <Field
                  name="skill"
                  as={Autocomplete}
                  options={data.skills}
                  placeholder="Search for a skill"
                  label="What skill are you looking for?"
                  error={formik.submitCount > 0 && formik.errors.skill}
                  onChange={(skill) => {
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
                  onChange={(industry) => {
                    formik.setFieldTouched("industry", true);
                    formik.setFieldValue("industry", industry);
                  }}
                />
                <Field
                  mt="s"
                  as={Checkbox}
                  type="checkbox"
                  name="industryExperienceRequired"
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
                  name="companyExperienceRequired"
                >
                  Experience with this type of company is important
                </Field>
              </Box>
              <Box mb="xl">
                <Field
                  multiline
                  minRows={2}
                  as={TextField}
                  name="description"
                  label="Please briefly describe what you're looking for"
                  error={
                    formik.touched.description && formik.errors.description
                  }
                />
              </Box>
              <Button size="l" type="submit" prefix={<Search />}>
                Find a freelancer
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
      <Images />
    </Container>
  );
};

export default FreelancerSearchCriteria;
