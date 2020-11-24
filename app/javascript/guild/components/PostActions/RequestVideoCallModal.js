import React from "react";
import { object, string } from "yup";
import { Formik, Form, Field } from "formik";
import { Send } from "@styled-icons/ionicons-solid";
import SubmitButton from "components/SubmitButton";
import useViewer from "src/hooks/useViewer";
import FormField from "components/FormField";
import { Modal, Textarea, Text, Paragraph } from "@advisable/donut";
import { useCreateChatDirectMessage } from "./queries";

const validationSchema = object().shape({
  message: string().required("Please write a message"),
  guildCalendlyLink: string().required(
    "Please provide a link to your calendly",
  ),
});

export default function RequestVideoCallModal({
  recipient,
  post,
  modal,
  onSend = () => {},
}) {
  const viewer = useViewer();
  const [sendMessage] = useCreateChatDirectMessage();

  const initialValues = {
    message: "",
    guildCalendlyLink: viewer.guildCalendlyLink || "",
  };

  const handleSubmit = async (values) => {
    const response = await sendMessage({
      variables: {
        input: {
          recipientId: recipient.id,
          guildPostId: post.id,
          body: values.message,
          guildCalendlyLink: values.guildCalendlyLink,
        },
      },
    });

    if (!response.errors) {
      modal.hide();
      onSend(response);
    }
  };

  return (
    <Modal modal={modal}>
      <Formik
        validateOnMount
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <Form>
          <Text
            mb="1"
            fontSize="3xl"
            fontWeight="medium"
            letterSpacing="-0.03rem"
          >
            Request a call with {recipient.firstName}
          </Text>
          <Paragraph mb="5" size="md">
            Send your calendly link to {recipient.firstName} to request to
            schedule a call with them.
          </Paragraph>
          <Field
            autoFocus
            name="message"
            as={Textarea}
            marginBottom="5"
            minRows={3}
            maxRows={8}
            placeholder="Message"
          />
          <FormField
            marginBottom="7"
            label="Calendly URL"
            name="guildCalendlyLink"
          />
          <SubmitButton size="s" prefix={<Send />} disableUntilValid>
            Send
          </SubmitButton>
        </Form>
      </Formik>
    </Modal>
  );
}
