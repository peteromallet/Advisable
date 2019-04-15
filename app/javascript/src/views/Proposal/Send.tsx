import * as React from "react";
import { Formik, Form } from "formik";
import { compose, graphql } from "react-apollo";
import Text from "../../components/Text";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Heading from "../../components/Heading";
import TextField from "../../components/TextField";
import { Padding } from "../../components/Spacing";
import SEND_PROPOSAL from "./sendProposal.graphql";

const Send = ({ application, history, sendProposal }) => {
  const handleSubmit = async values => {
    await sendProposal({
      variables: {
        input: {
          application: application.airtableId,
          ...values
        }
      }
    })

    history.push("sent")
  };

  return (
    <Card>
      <Padding size="l">
        <Padding bottom="s">
          <Heading level={3}>Send Proposal</Heading>
        </Padding>
        <Padding bottom="l">
          <Text size="s">
            Some text that exlains what a freelancer should expect when a
            proposal is submitted. How long is it going to take? What are the
            next steps?
          </Text>
        </Padding>
        <Formik
          onSubmit={handleSubmit}
          initialValues={{ proposalComment: application.proposalComment || "" }}
        >
          {formik => (
            <Form>
              <Padding bottom="l">
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
              </Padding>
              <Button loading={formik.isSubmitting} type="submit" styling="primary">
                Send Proposal
              </Button>
            </Form>
          )}
        </Formik>
      </Padding>
    </Card>
  );
};

export default compose(
  graphql(SEND_PROPOSAL, { name: "sendProposal" }),
)(Send);
