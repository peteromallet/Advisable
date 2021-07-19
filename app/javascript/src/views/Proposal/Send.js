import * as React from "react";
import { Formik, Form } from "formik";
import { Redirect } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Text, Card, Textarea } from "@advisable/donut";
import FormField from "src/components/FormField";
import SEND_PROPOSAL from "./sendProposal.graphql";
import SubmitButton from "src/components/SubmitButton";
import { hasCompleteTasksStep } from "./validationSchema";

const Send = ({ application, history }) => {
  const [sendProposal] = useMutation(SEND_PROPOSAL);

  // If they haven't complete the tasks step then redirect back
  if (!hasCompleteTasksStep(application)) {
    return <Redirect to="tasks" />;
  }

  const handleSubmit = async (values) => {
    await sendProposal({
      variables: {
        input: {
          application: application.id,
          ...values,
        },
      },
    });

    history.push("sent");
  };

  return (
    <Card borderRadius="12px" padding={8}>
      <Text
        as="h2"
        fontSize="4xl"
        marginBottom={4}
        fontWeight="medium"
        letterSpacing="-0.03rem"
      >
        Send Proposal
      </Text>
      <Formik
        onSubmit={handleSubmit}
        initialValues={{ proposalComment: application.proposalComment || "" }}
      >
        <Form>
          <FormField
            as={Textarea}
            marginBottom="l"
            name="proposalComment"
            label="Include a short message"
            placeholder="Add a message..."
          />
          <SubmitButton>Submit</SubmitButton>
        </Form>
      </Formik>
    </Card>
  );
};

export default Send;
