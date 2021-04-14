import React from "react";
import { object, string } from "yup";
import { Formik, Form } from "formik";
import { Box, Textarea, Error } from "@advisable/donut";
import FormField from "src/components/FormField";
import SubmitButton from "src/components/SubmitButton";
import { ArrowRight } from "@styled-icons/feather/ArrowRight";
import StepNumber from "../components/StepNumber";
import Header from "../components/Header";
import Description from "../components/Description";
import AnimatedCard from "../components/AnimatedCard";
import { useMutation } from "@apollo/client";
import { COMPLETE_SETUP, UPDATE_PROFILE } from "../queries";
import { useHistory } from "react-router-dom";
import { track } from "src/utilities/mixpanel";

export const validationSchema = object().shape({
  idealProject: string()
    .max(
      300,
      "Please keep the description simple. It must be at most 300 characters",
    )
    .required("Please describe your ideal project"),
});

export default function IdealProject({ specialist }) {
  const [update] = useMutation(UPDATE_PROFILE);
  const [complete] = useMutation(COMPLETE_SETUP);
  const history = useHistory();

  const initialValues = {
    idealProject: specialist.idealProject || "",
  };

  const handleSubmit = async (values, { setStatus }) => {
    setStatus(null);
    const res = await update({ variables: { input: values } });

    if (res.errors) {
      setStatus(res.errors[0]?.message);
      return;
    }

    if (specialist.applicationStage === "Started") {
      await complete({ variables: { input: {} } });
    }

    track("Ideal Project (Specialist Application)");
    history.push("/");
  };

  return (
    <AnimatedCard>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({ status }) => (
          <Form>
            <StepNumber>Step 5 of 5</StepNumber>
            <Header>Ideal project</Header>
            <Description letterSpacing="-0.01rem">
              Tell us about your perfect project so we can tailor how we match
              you with potential work.
            </Description>
            <Box mb={4}>
              <FormField
                as={Textarea}
                name="idealProject"
                minRows={5}
                charLimit={300}
                label="How would you describe your ideal project?"
                placeholder="What kinds of projects most excite you? What kinds of companies do you prefer working with?"
              />
            </Box>
            <Error>{status}</Error>
            <SubmitButton
              mt={4}
              suffix={<ArrowRight />}
              variant="gradient"
              size="l"
            >
              Submit
            </SubmitButton>
          </Form>
        )}
      </Formik>
    </AnimatedCard>
  );
}
