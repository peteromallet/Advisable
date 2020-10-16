import { Formik, Form } from "formik";
import { Redirect } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Box, Card, Button, Textarea } from "@advisable/donut";
import Heading from "../../components/Heading";
import FormField from "../../components/FormField";
import SEND_PROPOSAL from "./sendProposal.graphql";
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
          application: application.airtableId,
          ...values,
        },
      },
    });

    history.push("sent");
  };

  return (
    <Card>
      <Box padding="l">
        <Box paddingBottom="l">
          <Heading level={3}>Send Proposal</Heading>
        </Box>
        <Formik
          onSubmit={handleSubmit}
          initialValues={{ proposalComment: application.proposalComment || "" }}
        >
          {(formik) => (
            <Form>
              <FormField
                as={Textarea}
                marginBottom="l"
                name="proposalComment"
                label="Include a short message"
                placeholder="Add a message..."
              />
              <Button type="submit" loading={formik.isSubmitting}>
                Send Proposal
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Card>
  );
};

export default Send;
