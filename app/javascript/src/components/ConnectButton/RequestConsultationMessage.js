import { Box, Stack, Text, Textarea } from "@advisable/donut";
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
    <Box as="li" display="flex" lineHeight="20px" alignItems="center">
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
            <Text fontWeight={500}>What to include in your message</Text>
            <ListItem>
              Provide a brief introduction to your project and how you see{" "}
              {specialist.firstName} fitting in.
            </ListItem>
            <ListItem>
              Specify the project budget if you have one in mind.
            </ListItem>
            <ListItem>
              Add any other information that you think might be relevant at this
              moment.
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
