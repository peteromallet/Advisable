import React from "react";
import Combobox from "@advisable/donut/components/Combobox";
import { array, object, string } from "yup";
import { Formik, Form } from "formik";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { Box, Error } from "@advisable/donut";
import { ChoiceList } from "src/components";
import FormField from "src/components/FormField";
import SubmitButton from "src/components/SubmitButton";
import { ArrowRight } from "@styled-icons/feather/ArrowRight";
import StepNumber from "../components/StepNumber";
import Header from "../components/Header";
import Description from "../components/Description";
import AnimatedCard from "../components/AnimatedCard";
import { UPDATE_PROFILE } from "../queries";
import { track } from "src/utilities/mixpanel";

export const validationSchema = object().shape({
  skills: array().min(1, "Please select at least one skill"),
  industries: array().min(1, "Please select at least one industry"),
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

  const handleSubmit = async (values, { setStatus }) => {
    setStatus(null);
    const res = await update({
      variables: {
        input: {
          skills: values.skills.map((s) => s.label),
          industries: values.industries.map((i) => i.label),
          primarilyFreelance: values.primarilyFreelance === "full",
        },
      },
    });

    if (res.errors) {
      setStatus(res.errors[0]?.message);
      return;
    }

    track("Preferences (Specialist Application)");
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
              Tell us about your specialisms, focus areas and availability to
              help us match you with the right projects.
            </Description>
            <Box mb={6}>
              <FormField
                isRequired
                as={Combobox}
                multiple
                max={10}
                value={formik.values.skills}
                name="skills"
                onChange={(s) => formik.setFieldValue("skills", s)}
                label="What are the main skills you specialise in?"
                placeholder="e.g Facebook Marketing"
                options={skills}
              />
            </Box>
            <Box mb={6}>
              <FormField
                isRequired
                as={Combobox}
                multiple
                max={10}
                value={formik.values.industries}
                name="industries"
                onChange={(i) => formik.setFieldValue("industries", i)}
                label="Which industries do you work in?"
                placeholder="e.g Financial Services"
                options={industries}
              />
            </Box>
            <Box mb={4}>
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
            <Error>{formik.status}</Error>
            <SubmitButton
              mt={4}
              suffix={<ArrowRight />}
              variant="gradient"
              size="l"
            >
              Continue
            </SubmitButton>
          </Form>
        )}
      </Formik>
    </AnimatedCard>
  );
}
