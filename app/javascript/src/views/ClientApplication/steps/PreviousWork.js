import React from "react";
import { object, string } from "yup";
import { Formik, Form } from "formik";
import { useHistory } from "react-router-dom";
import { Box, Textarea, Error } from "@advisable/donut";
import FormField from "src/components/FormField";
import SubmitButton from "src/components/SubmitButton";
import { ArrowRight } from "@styled-icons/feather/ArrowRight";
import Header from "../components/Header";
import Description from "../components/Description";
import StepNumber from "../components/StepNumber";
import AnimatedCard from "../components/AnimatedCard";
import { useMutation } from "@apollo/client";
import { UPDATE_PROFILE } from "../queries";
import { track } from "src/utilities/mixpanel";

const CHAR_LIMIT = 800;

export const validationSchema = object().shape({
  previousWorkDescription: string()
    .max(
      CHAR_LIMIT,
      `Please keep the description simple. It must be at most ${CHAR_LIMIT} characters`,
    )
    .required("Please share your description with us"),
  previousWorkResults: string()
    .max(
      CHAR_LIMIT,
      `Please keep the text simple. It must be at most ${CHAR_LIMIT} characters`,
    )
    .required("Please tell us why you’re proud of this project"),
});

export default function PreviousWork({ specialist }) {
  const history = useHistory();
  const [update] = useMutation(UPDATE_PROFILE);

  const initialValues = {
    previousWorkDescription: specialist.previousWorkDescription || "",
    previousWorkResults: specialist.previousWorkResults || "",
  };

  const handleSubmit = async (values, { setStatus }) => {
    setStatus(null);
    const res = await update({ variables: { input: values } });

    if (res.errors) {
      setStatus(res.errors[0]?.message);
      return;
    }

    track("Previous Work (Specialist Application)");
    history.push("/freelancers/apply/preferences");
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
            <StepNumber>Step 3 of 5</StepNumber>
            <Header>Previous work</Header>
            <Description>
              Every freelancer has that one project that stands out in their
              mind. Tell us about one of your previous projects that you’re most
              proud of, and why.
            </Description>
            <Box mb={6}>
              <FormField
                isRequired
                as={Textarea}
                charLimit={CHAR_LIMIT}
                name="previousWorkDescription"
                minRows={5}
                label="Please provide a brief description of a project you’re proud of"
                placeholder="What were the goals of this project? What type of work was involved?"
              />
            </Box>
            <Box mb={4}>
              <FormField
                isRequired
                as={Textarea}
                charLimit={CHAR_LIMIT}
                name="previousWorkResults"
                minRows={5}
                label="Why are you proud of this project?"
                placeholder="What were the results of this project? Why does it stand out for you?"
              />
            </Box>
            <Error>{status}</Error>
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
