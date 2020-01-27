import * as React from "react";
import { Formik, Form } from "formik";
import { useMutation } from "react-apollo";
import { useHistory } from "react-router-dom";
import { Box, Text, Card, RoundedButton } from "@advisable/donut";
import TextField from "../../components/TextField";
import SEND_PROPOSAL from "./sendProposal.graphql";

const Send = ({ application }) => {
  const history = useHistory();
  const [sendProposal] = useMutation(SEND_PROPOSAL);

  const handleSubmit = async values => {
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
    <Card padding="l">
      <Text as="h3" fontSize="xl" color="blue.9" fontWeight="semibold" mb="xs">
        Send Proposal
      </Text>
      <Text mb="l" color="neutral.8" lineHeight="s">
        Some text that exlains what a freelancer should expect when a proposal
        is submitted. How long is it going to take? What are the next steps?
      </Text>
      <Formik
        onSubmit={handleSubmit}
        initialValues={{ proposalComment: application.proposalComment || "" }}
      >
        {formik => (
          <Form>
            <Box mb="l">
              <TextField
                multiline
                autoHeight
                name="proposalComment"
                onBlur={formik.handleBlur}
                value={formik.values.proposalComment}
                onChange={formik.handleChange}
                label="Include a short message"
                placeholder="Add a message..."
              />
            </Box>
            <RoundedButton loading={formik.isSubmitting} type="submit">
              Send Proposal
            </RoundedButton>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default Send;
