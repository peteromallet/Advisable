import React from "react";
import { Formik, Form } from "formik";
import { Box, Modal, Text, Paragraph, Textarea } from "@advisable/donut";
import FormField from "components/FormField";
import SubmitButton from "components/SubmitButton";
import { useRequestInterviewReschedule } from "./queries";

export default function RequestRescheduleAsClient({ interview, modal }) {
  const initialValues = { note: "" };
  const [requestRequest] = useRequestInterviewReschedule();

  const handleSubmit = async (values) => {
    await requestRequest({
      variables: {
        input: {
          interview: interview.id,
          note: values.note,
        },
      },
    });
  };

  return (
    <Modal modal={modal} label="Request reschedule">
      <Box padding="xl">
        <Box maxWidth="350px">
          <Text
            fontSize="3xl"
            marginBottom="xs"
            fontWeight="medium"
            letterSpacing="-0.02em"
          >
            Reschedule your interview with {interview.specialist.firstName}
          </Text>
        </Box>
        <Paragraph marginBottom="xl">
          Update your availability and we will send new time options to{" "}
          {interview.specialist.firstName} for this interview.
        </Paragraph>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form>
            <FormField
              name="note"
              as={Textarea}
              marginBottom="xl"
              label={`Include a message to ${interview.user.firstName} about when might suit you best.`}
            />
            <SubmitButton variant="dark">Request To Reschedule</SubmitButton>
          </Form>
        </Formik>
      </Box>
    </Modal>
  );
}
