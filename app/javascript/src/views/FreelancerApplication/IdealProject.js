import React from "react";
import { Formik, Form } from "formik";
import { Card, Box, Textarea } from "@advisable/donut";
import FormField from "src/components/FormField";
import SubmitButton from "src/components/SubmitButton";
import StepNumber from "./StepNumber";
import { Description, Header } from "./styles";
import { object, string } from "yup";
import { ArrowRight } from "@styled-icons/feather";

const validationSchema = object().shape({
  idealProject: string().required(),
});

export default function IdealProject() {
  const initialValues = {
    idealProject: "",
  };

  const handleSubmit = () => {};

  return (
    <Card padding={10} borderRadius="12px">
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <Form>
          <StepNumber>Step 5 of 5</StepNumber>
          <Header>Ideal Project</Header>
          <Description>
            Every freelancer has that one project that stands out in there mind.
            The one that you were so excited to complete and add to your
            portfolio. Tell us about one of your previous projects that you are
            most proud of and why.
          </Description>
          <Box mb={10}>
            <FormField
              as={Textarea}
              name="idealProject"
              minRows={5}
              label="How would you describe an ideal project for you?"
              placeholder="What kind of projects most excite you? What kind of companies do you prefer working with?"
            />
          </Box>
          <SubmitButton suffix={<ArrowRight />}>Submit</SubmitButton>
        </Form>
      </Formik>
    </Card>
  );
}
