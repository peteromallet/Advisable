import { Box, Stack, Text, Heading, Textarea } from "@advisable/donut";
import { CheckCircle } from "@styled-icons/heroicons-solid";
import { Form, Formik } from "formik";
import React from "react";
import FormField from "../FormField";
import SubmitButton from "../SubmitButton";
import { useRequestInterview } from "./queries";
import { object, string } from "yup";
import { trackEvent } from "src/utilities/segment";

const validationSchema = object({
  message: string().required("Please include a message"),
});

function ListItem({ children }) {
  return (
    <Box as="li" display="flex" lineHeight="20px">
      <Box flexShrink={0} color="neutral400" marginRight={2}>
        <CheckCircle size={20} />
      </Box>
      <Text fontWeight={420} color="neutral800">
        {children}
      </Text>
    </Box>
  );
}

export default function RequestConsultationMessage({ specialist, onSubmit }) {
  const [requestInterview] = useRequestInterview();

  const handleSubmit = async (values) => {
    await requestInterview({
      variables: {
        input: {
          specialist: specialist.id,
          message: values.message,
        },
      },
      update(cache, result) {
        cache.modify({
          id: cache.identify(specialist),
          fields: {
            interview: () => result.data.requestInterview.interview,
          },
        });
      },
    });

    trackEvent("Requested Consultation", {
      specialist: specialist.id,
    });
    onSubmit();
  };

  return (
    <>
      <Box paddingBottom={6} paddingRight={4}>
        <Heading size="5xl" marginBottom={2}>
          Connect with {specialist.firstName}
        </Heading>
        <Text
          fontSize="lg"
          fontWeight={450}
          lineHeight="24px"
          color="neutral700"
          letterSpacing="-0.01em"
        >
          Write a short message to include in your request.
        </Text>
      </Box>
      <Formik
        initialValues={{ message: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        validateOnMount
      >
        <Form>
          <FormField
            autoFocus
            as={Textarea}
            name="message"
            placeholder="Write a short message to include in your request..."
            minRows={8}
            showError={false}
          />
          <Stack spacing={4} as="ul" marginY={8}>
            <Heading size="lg">What to include in your message</Heading>
            <ListItem>
              Explain why you’re reaching out and why you’re excited about
              potentially working together.
            </ListItem>
            <ListItem>
              Describe what kind of project you have in mind and why you think
              it would be exciting for them.
            </ListItem>
            <ListItem>
              Add any relevant information you have around timelines, budget,
              goals, etc.
            </ListItem>
          </Stack>
          <SubmitButton
            variant="gradient"
            width="100%"
            size="l"
            disableUntilValid
          >
            Send Request
          </SubmitButton>
        </Form>
      </Formik>
    </>
  );
}
