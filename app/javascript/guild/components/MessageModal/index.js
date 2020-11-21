import React from "react";
import { object, string } from "yup";
import { Formik, Form, Field } from "formik";
import { Send } from "@styled-icons/ionicons-solid";
import SubmitButton from "components/SubmitButton";
import { Modal, Textarea, Text } from "@advisable/donut";
import { useCreateChatDirectMessage } from "./queries";

const validationSchema = object().shape({
  message: string().required("Please write a message"),
});

export default function MessageModal({
  recipient,
  post,
  modal,
  onSend = () => {},
}) {
  const [sendMessage] = useCreateChatDirectMessage();

  const initialValues = {
    message: "",
  };

  const handleSubmit = async (values) => {
    const response = await sendMessage({
      variables: {
        input: {
          recipientId: recipient.id,
          guildPostId: post.id,
          body: values.message,
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
            mb="4"
            fontSize="2xl"
            fontWeight="medium"
            letterSpacing="-0.03rem"
          >
            Start a conversation with {recipient.firstName}
          </Text>
          <Field
            name="message"
            as={Textarea}
            marginBottom="5"
            minRows={3}
            maxRows={8}
            placeholder="Message"
            autoFocus
          />
          <SubmitButton size="s" prefix={<Send />} disableUntilValid>
            Send
          </SubmitButton>
        </Form>
      </Formik>
    </Modal>
  );
}
