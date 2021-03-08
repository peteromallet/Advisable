import React from "react";
import { object, string } from "yup";
import { Formik, Form } from "formik";
import { useHistory } from "react-router-dom";
import { Box, Textarea } from "@advisable/donut";
import FormField from "src/components/FormField";
import SubmitButton from "src/components/SubmitButton";
import { ArrowRight } from "@styled-icons/feather";
import Header from "../components/Header";
import Description from "../components/Description";
import StepNumber from "../components/StepNumber";
import AnimatedCard from "../components/AnimatedCard";
import { useMutation } from "@apollo/client";
import { UPDATE_PROFILE } from "../queries";

export const validationSchema = object().shape({
  previousWorkDescription: string()
    .max(
      300,
      "Please keep the description simple. It must be at most 300 characters",
    )
    .required("Please share your description with us"),
  previousWorkResults: string()
    .max(300, "Please keep the text simple. It must be at most 300 characters")
    .required("Please tell us why you proud of it"),
});

export default function PreviousWork({ specialist }) {
  const history = useHistory();
  const [update] = useMutation(UPDATE_PROFILE);

  const initialValues = {
    previousWorkDescription: specialist.previousWorkDescription || "",
    previousWorkResults: specialist.previousWorkResults || "",
  };

  const handleSubmit = (values) => {
    update({
      variables: { input: values },
      optimisticResponse: {
        __typename: "Mutation",
        updateProfile: {
          __typename: "UpdateProfilePayload",
          specialist: {
            ...specialist,
            ...values,
          },
        },
      },
    });

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
          <Box mb={6}>
            <FormField
              isRequired
              as={Textarea}
              charLimit={300}
              name="previousWorkDescription"
              minRows={5}
              label="Please provide a brief description of a project you’re proud of"
              placeholder="What were the goals of this project? What type of work was involved?"
            />
          </Box>
          <Box mb={8}>
            <FormField
              isRequired
              as={Textarea}
              charLimit={300}
              name="previousWorkResults"
              minRows={5}
              label="Why are you proud of this project?"
              placeholder="What were the results of this project? Why does it stand out to you?"
            />
          </Box>
          <SubmitButton suffix={<ArrowRight />} variant="gradient" size="l">
            Continue
          </SubmitButton>
        </Form>
      </Formik>
    </AnimatedCard>
  );
}
