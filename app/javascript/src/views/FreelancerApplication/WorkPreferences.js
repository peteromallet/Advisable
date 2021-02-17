import React from "react";
import { Formik, Form } from "formik";
import { useQuery, gql } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { Card, Box, Autocomplete } from "@advisable/donut";
import { ChoiceList } from "src/components";
import FormField from "src/components/FormField";
import SubmitButton from "src/components/SubmitButton";
import StepNumber from "./StepNumber";
import { Description, Header } from "./components";
import { object, string } from "yup";
import { ArrowRight } from "@styled-icons/feather";

export const GET_DATA = gql`
  {
    skills {
      value: id
      label: name
    }
    industries {
      value: id
      label: name
    }
  }
`;

const validationSchema = object().shape({
  skills: string().required(),
  industries: string().required(),
  availability: string().required(),
});

export default function WorkPreferences() {
  const { data, loading } = useQuery(GET_DATA);
  const history = useHistory();

  const initialValues = {
    skills: "",
    industries: "",
    availability: "",
  };

  const handleSubmit = () => {
    history.push("/freelancers/apply/ideal_project");
  };

  if (loading) return <Box>loading...</Box>;

  return (
    <Card padding={10} borderRadius="12px">
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <Form>
            <StepNumber>Step 4 of 5</StepNumber>
            <Header>Work preferences</Header>
            <Description>
              Every freelancer has that one project that stands out in there
              mind. The one that you were so excited to complete and add to your
              portfolio. Tell us about one of your previous projects that you
              are most proud of and why.
            </Description>
            <Box mb={6}>
              <FormField
                as={Autocomplete}
                multiple
                name="skills"
                label="What are the main skills you specialise in?"
                placeholder="e.g Facebook marketing"
                options={data.skills}
                onChange={(skill) => formik.setFieldValue("skills", skill)}
              />
            </Box>
            <Box mb={6}>
              <FormField
                as={Autocomplete}
                multiple
                name="industries"
                label="Which industries do you work in?"
                placeholder="e.g Financial services"
                options={data.industries}
                onChange={(industry) =>
                  formik.setFieldValue("industries", industry)
                }
              />
            </Box>
            <Box mb={3}>
              <ChoiceList
                fullWidth
                optionsPerRow={2}
                name="availability"
                onChange={formik.handleChange}
                value={formik.values.availability}
                error={
                  formik.touched.availability && formik.errors.availability
                }
                label="What is your availability for freelance work?"
                options={[
                  "I am a fulltime freelancer",
                  "No, I freelance alongside a full-time job.",
                ]}
              />
            </Box>
            <SubmitButton suffix={<ArrowRight />}>Continue</SubmitButton>
          </Form>
        )}
      </Formik>
    </Card>
  );
}
