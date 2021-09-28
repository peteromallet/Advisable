import React from "react";
import { object, string } from "yup";
import { Formik, Form } from "formik";
import { useApolloClient } from "@apollo/client";
import { Send } from "@styled-icons/ionicons-solid/Send";
import SubmitButton from "components/SubmitButton";
import useViewer from "src/hooks/useViewer";
import FormField from "components/FormField";
import { Textarea, Text, Paragraph } from "@advisable/donut";
import { useNotifications } from "src/components/Notifications";
import { useSendPostMessage } from "./queries";

const validationSchema = object().shape({
  message: string().required("Please write a message"),
  guildCalendlyLink: string().required(
    "Please provide a link to your calendly",
  ),
});

export default function RequestVideoCallModal({ post, onSend = () => {} }) {
  const viewer = useViewer();
  const client = useApolloClient();
  const notifications = useNotifications();
  const [sendPostMessage] = useSendPostMessage();
  const firstName = post.author.firstName;

  const initialValues = {
    message: "",
    guildCalendlyLink: viewer.guildCalendlyLink || "",
  };

  const handleSubmit = async (values) => {
    const response = await sendPostMessage({
      variables: {
        input: {
          post: post.id,
          content: values.message,
          calendlyUrl: values.guildCalendlyLink,
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
          mb="1"
          fontSize="3xl"
          fontWeight="medium"
          letterSpacing="-0.03rem"
        >
          Request a call with {firstName}
        </Text>
        <Paragraph mb="5" size="md">
          Send your calendly link to {firstName} to request to schedule a call
          with them.
        </Paragraph>
        <FormField
          autoFocus={!viewer.guildCalendlyLink}
          marginBottom={4}
          label="Calendly URL"
          name="guildCalendlyLink"
        />
        <FormField
          autoFocus={viewer.guildCalendlyLink}
          name="message"
          as={Textarea}
          marginBottom={8}
          minRows={3}
          maxRows={8}
          placeholder="Message"
          label="Include a message with your request"
        />
        <SubmitButton size="s" prefix={<Send />} disableUntilValid>
          Send
        </SubmitButton>
      </Form>
    </Formik>
  );
}
