import { Box, Stack, Textarea } from "@advisable/donut";
import { CheckCircle } from "@styled-icons/heroicons-solid";
import { Form, Formik } from "formik";
import React from "react";
import FormField from "../FormField";
import SubmitButton from "../SubmitButton";
import { useRequestConsultation } from "./queries";
import RequestConsultationHeader from "./RequestConsultationHeader";
import { object, string } from "yup";

const validationSchema = object({
  message: string().required("Please include a message"),
});

function ListItem({ children }) {
  return (
    <Box as="li" display="flex">
      <Box flexShrink={0} color="neutral300" marginRight={2}>
        <CheckCircle size={20} />
      </Box>
      <Box>{children}</Box>
    </Box>
  );
}

export default function RequestConsultationMessage({ specialist, onSubmit }) {
  const [requestConsultation] = useRequestConsultation();

  const handleSubmit = async (values) => {
    await requestConsultation({
      variables: {
        input: {
          specialist: specialist.id,
          message: values.message,
        },
      },
    });

    onSubmit();
  };

  return (
    <>
      <RequestConsultationHeader specialist={specialist} />
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
            placeholder="Message..."
            label="Message"
            minRows={8}
            showError={false}
          />
          <Stack spacing={3} as="ul" marginY={6}>
            <ListItem>
              Include details about the problem you are looking to solve.
            </ListItem>
            <ListItem>
              Include details about the problem you are looking to solve.
            </ListItem>
            <ListItem>
              Include details about the problem you are looking to solve.
            </ListItem>
            <ListItem>
              Include details about the problem you are looking to solve.
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
