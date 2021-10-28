import React, { useState } from "react";
import { object, string } from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import SubmitButton from "components/SubmitButton";
import { Text, Textarea } from "@advisable/donut";
import { useCreateConversation } from "./queries";
import FreelancerMessageSent from "./FreelancerMessageSent";

const validationSchema = object({
  body: string().required("Please write your message"),
});

export default function SendFreelancerMessage({ specialist, dialog }) {
  const [sent, setSent] = useState(false);
  const [createConversation] = useCreateConversation();

  const initialValues = {
    body: "",
  };

  const handleSubmit = async (values) => {
    await createConversation({
      variables: {
        input: {
          participants: [specialist.account.id],
          content: values.body,
        },
      },
    });

    setSent(true);
  };

  if (sent) {
    return <FreelancerMessageSent specialist={specialist} dialog={dialog} />;
  }

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      <Form>
        <Text
          fontSize="4xl"
          fontWeight={600}
          marginBottom={4}
          letterSpacing="-0.03em"
        >
          Send a message to {specialist.firstName}
        </Text>
        <Field
          name="body"
          as={Textarea}
          minRows={8}
          placeholder={`Introduce yourself to ${specialist.firstName}`}
        />
        <ErrorMessage
          name="body"
          marginTop="sm"
          color="red700"
          component={Text}
        />
        <SubmitButton variant="gradient" size="l" marginTop="md">
          Send Message
        </SubmitButton>
      </Form>
    </Formik>
  );
}
