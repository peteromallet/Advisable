import React from "react";
import { useApolloClient } from "@apollo/client";
import { useNotifications } from "src/components/Notifications";
import { object, string } from "yup";
import { Formik, Form, Field } from "formik";
import { Send } from "@styled-icons/ionicons-solid/Send";
import SubmitButton from "components/SubmitButton";
import { Textarea, Text } from "@advisable/donut";
import { useSendPostMessage } from "./queries";

const validationSchema = object().shape({
  message: string().required("Please write a message"),
});

export default function MessageModal({ post, onSend = () => {} }) {
  const client = useApolloClient();
  const notifications = useNotifications();
  const [sendPostMessage] = useSendPostMessage();

  const initialValues = {
    message: "",
  };

  const handleSubmit = async (values) => {
    const response = await sendPostMessage({
      variables: {
        input: {
          post: post.id,
          content: values.message,
        },
      },
    });

    if (!response.errors) {
      client.cache.modify({
        id: client.cache.identify(post),
        fields: {
          engagementsCount(count) {
            return post.engaged ? count : count + 1;
          },
        },
      });

      notifications.notify(
        `Your message has been sent to ${post.author.firstName}`,
      );
      onSend(response);
    }
  };

  return (
    <Formik
      validateOnMount
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      <Form>
        <Text
          mb="4"
          fontSize="3xl"
          fontWeight="medium"
          letterSpacing="-0.03rem"
        >
          Send a message to {post.author.firstName}
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
  );
}
