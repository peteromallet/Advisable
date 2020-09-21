import React from "react";
import { Formik, Form } from "formik";
import { DialogDisclosure, useDialogState } from "reakit/Dialog";
import {
  Box,
  Button,
  Modal,
  Text,
  Paragraph,
  Textarea,
} from "@advisable/donut";
import FormField from "components/FormField";
import SubmitButton from "components/SubmitButton";
import InterviewInformation from "./InterviewInformation";
import { useRequestInterviewReschedule } from "./queries";

export default function RescheduleAsSpecialist({ interview }) {
  const modal = useDialogState();
  return (
    <Box textAlign="center">
      <Box marginBottom="xl">
        <InterviewInformation interview={interview} />
      </Box>
      <RequestRescheduleAsSpecialist interview={interview} modal={modal} />
      <DialogDisclosure {...modal} as={Button} variant="dark">
        Request To Reschedule
      </DialogDisclosure>
    </Box>
  );
}

function RequestRescheduleAsSpecialist({ interview, modal }) {
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
            Request to reschedule interview with {interview.user.firstName}
          </Text>
        </Box>
        <Paragraph marginBottom="xl">
          We will reach out to {interview.user.firstName} to see what other
          times are available and let you know once they have suggested new
          times.
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
