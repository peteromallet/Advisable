import React from "react";
import { object, string } from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { gql, useMutation } from "@apollo/client";
import { Chatbubble } from "@styled-icons/ionicons-outline/Chatbubble";
import SubmitButton from "components/SubmitButton";
import { useNotifications } from "components/Notifications";
import { Button, Text, Modal, useModal, Textarea } from "@advisable/donut";

export const CREATE_CHAT_DIRECT_MESSAGE = gql`
  mutation createChatDirectMessage($input: CreateChatDirectMessageInput!) {
    createChatDirectMessage(input: $input) {
      enqueued
    }
  }
`;

const CREATE_CONVERSATION = gql`
  mutation CreateConversationFromProfile($input: CreateConversationInput!) {
    createConversation(input: $input) {
      conversation {
        id
      }
    }
  }
`;

const validationSchema = object({
  body: string().required("Please write your message"),
});

function MessageForm({ specialist, onSend }) {
  const [send] = useMutation(CREATE_CHAT_DIRECT_MESSAGE);
  const [createConversation] = useMutation(CREATE_CONVERSATION);
  const versionTwo = sessionStorage.getItem("/messages/:conversationId?");

  const initialValues = {
    body: "",
  };

  const handleSubmit = async (values) => {
    if (versionTwo) {
      await createConversation({
        variables: {
          input: {
            participants: [specialist.account.id],
            content: values.body,
          },
        },
      });
    } else {
      await send({
        variables: {
          input: {
            body: values.body,
            recipientId: specialist.id,
          },
        },
      });
    }

    onSend();
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      <Form>
        <Field
          name="body"
          as={Textarea}
          placeholder={`Introduce yourself to ${specialist.firstName}`}
        />
        <ErrorMessage
          name="body"
          marginTop="sm"
          color="red700"
          component={Text}
        />
        <SubmitButton marginTop="md" type="submit" variant="dark">
          Send
        </SubmitButton>
      </Form>
    </Formik>
  );
}

export default function MessageButton({ specialist }) {
  const dialog = useModal();
  const notifications = useNotifications();

  const onSend = () => {
    notifications.notify(
      `Your message has been sent to ${specialist.firstName}`,
    );
    dialog.hide();
  };

  return (
    <>
      <Button
        onClick={dialog.toggle}
        prefix={<Chatbubble />}
        variant="dark"
        width={["100%", "auto"]}
        size={["m", "m", "l"]}
      >
        Message
      </Button>
      <Modal modal={dialog} label="Send message">
        <Text fontSize="l" fontWeight="medium" marginBottom="sm">
          Message {specialist.name}
        </Text>
        <MessageForm onSend={onSend} specialist={specialist} />
      </Modal>
    </>
  );
}