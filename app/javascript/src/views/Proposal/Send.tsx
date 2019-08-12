import * as React from "react";
import { Formik, Form } from "formik";
import { flowRight as compose } from "lodash";
import { Redirect } from "react-router-dom";
import { graphql } from "react-apollo";
import Text from "../../components/Text";
import Card from "../../components/Card";
import Button from "../../components/Button";
import ButtonGroup from "../../components/ButtonGroup";
import Heading from "../../components/Heading";
import TextField from "../../components/TextField";
import { Padding } from "../../components/Spacing";
import SEND_PROPOSAL from "./sendProposal.graphql";
import { useMobile } from "../../components/Breakpoint";
import { hasCompleteTasksStep } from "./validationSchema";

const Send = ({ application, history, sendProposal }) => {
  const isMobile = useMobile();

  // If they haven't complete the tasks step then redirect back
  if (!hasCompleteTasksStep(application)) {
    return <Redirect to="tasks" />;
  }

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
              <ButtonGroup fullWidth={isMobile}>
                <Button
                  loading={formik.isSubmitting}
                  type="submit"
                  styling="primary"
                >
                  Send Proposal
                </Button>
              </ButtonGroup>
            </Form>
          )}
        </Formik>
      </Padding>
    </Card>
  );
};

export default compose(graphql(SEND_PROPOSAL, { name: "sendProposal" }))(Send);
