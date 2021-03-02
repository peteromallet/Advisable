import React from "react";
import Combobox from "@advisable/donut/components/Combobox";
import { array, object, string } from "yup";
import { Formik, Form } from "formik";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { Box } from "@advisable/donut";
import { ChoiceList } from "src/components";
import FormField from "src/components/FormField";
import SubmitButton from "src/components/SubmitButton";
import { ArrowRight } from "@styled-icons/feather";
import StepNumber from "../components/StepNumber";
import { Description, Header } from "../components";
import AnimatedCard from "../components/AnimatedCard";
import { UPDATE_PROFILE } from "../queries";

export const validationSchema = object().shape({
  skills: array().min(1).required(),
  industries: array().min(1).required(),
  primarilyFreelance: string().required("Please set your availability"),
});

export default function WorkPreferences({ specialist, skills, industries }) {
  const [update] = useMutation(UPDATE_PROFILE);
  const history = useHistory();

  const initialValues = {
    skills: specialist.skills || [],
    industries: specialist.industries || [],
    primarilyFreelance:
      (specialist.primarilyFreelance && "full") ||
      (specialist.primarilyFreelance === false && "part") ||
      undefined,
  };

  const handleSubmit = async (values) => {
    update({
      variables: {
        input: {
          skills: values.skills.map((s) => s.label),
          industries: values.industries.map((i) => i.label),
          primarilyFreelance: values.primarilyFreelance === "full",
        },
      },
      optimisticResponse: {
        __typename: "Mutation",
        updateProfile: {
          __typename: "UpdateProfilePayload",
          specialist: {
            ...specialist,
            ...values,
            primarilyFreelance:
              values.primarilyFreelance === "full" ||
              (values.primarilyFreelance === "part" ? false : null),
          },
        },
      },
    });

    history.push("/freelancers/apply/ideal_project");
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
                isRequired
                as={Combobox}
                multiple
                value={formik.values.skills}
                name="skills"
                onChange={(s) => formik.setFieldValue("skills", s)}
                label="What are the main skills you specialise in?"
                placeholder="e.g Facebook marketing"
                options={skills}
              />
            </Box>
            <Box mb={6}>
              <FormField
                isRequired
                as={Combobox}
                multiple
                value={formik.values.industries}
                name="industries"
                onChange={(i) => formik.setFieldValue("industries", i)}
                label="Which industries do you work in?"
                placeholder="e.g Financial services"
                options={industries}
              />
            </Box>
            <Box mb={3}>
              <FormField
                isRequired
                as={ChoiceList}
                fullWidth
                optionsPerRow={2}
                name="primarilyFreelance"
                onChange={formik.handleChange}
                value={formik.values.primarilyFreelance}
                error={false}
                label="What is your availability for freelance work?"
                options={[
                  {
                    value: "full",
                    label: "Full-time freelancer",
                  },
                  {
                    value: "part",
                    label: "Part-time freelancer",
                  },
                ]}
              />
            </Box>
            <SubmitButton suffix={<ArrowRight />} variant="gradient">
              Continue
            </SubmitButton>
          </Form>
        )}
      </Formik>
    </AnimatedCard>
  );
}
