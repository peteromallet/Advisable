import React from "react";
import { Formik, Form } from "formik";
import { useHistory } from "react-router-dom";
import { Box, Textarea } from "@advisable/donut";
import FormField from "src/components/FormField";
import SubmitButton from "src/components/SubmitButton";
import StepNumber from "./components/StepNumber";
import { Description, Header } from "./components";
import { object, string } from "yup";
import { ArrowRight } from "@styled-icons/feather";
import AnimatedCard from "./components/AnimatedCard";

const validationSchema = object().shape({
  projectDescription: string().required(),
  proud: string().required(),
});

export default function PreviousWork() {
  const history = useHistory();

  const initialValues = {
    projectDescription: "",
    proud: "",
  };

  const handleSubmit = () => {
    history.push("/freelancers/apply/preferences");
  };

  return (
    <AnimatedCard>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <Form>
          <StepNumber>Step 3 of 5</StepNumber>
          <Header>Previous work</Header>
          <Description>
            Every freelancer has that one project that stands out in there mind.
            The one that you were so excited to complete and add to your
            portfolio. Tell us about one of your previous projects that you are
            most proud of and why.
          </Description>
          <Box mb="l">
            <FormField
              as={Textarea}
              name="projectDescription"
              minRows={5}
              label="Please provide a brief description of a project you’re proud of"
              placeholder="What were the goals of this project? What type of work was involved?"
            />
          </Box>
          <Box mb="l">
            <FormField
              as={Textarea}
              name="proud"
              minRows={5}
              label="Why are you proud of this project?"
              placeholder="What were the results of this project? Why does it stand out to you?"
            />
          </Box>
          <SubmitButton suffix={<ArrowRight />}>Continue</SubmitButton>
        </Form>
      </Formik>
    </AnimatedCard>
  );
}
