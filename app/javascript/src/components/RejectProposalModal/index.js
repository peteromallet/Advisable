import React from "react";
import { Formik } from "formik";
import { Query, Mutation } from "react-apollo";
import Text from "src/components/Text";
import Modal from "src/components/Modal";
import Select from "src/components/Select";
import Button from "src/components/Button";
import Heading from "src/components/Heading";
import Spacing from "src/components/Spacing";
import Loading from "src/components/Loading";
import TextField from "src/components/TextField";
import ButtonGroup from "src/components/ButtonGroup";
import { withNotifications } from "src/components/Notifications";
import FETCH_REASONS from "./reasons.graphql";
import REJECT_PROPOSAL from "./rejectProposal.graphql";
import validationSchema from "./validationSchema";

const RejectProposalModal = ({
  isOpen,
  onClose,
  specialist,
  booking,
  notifications
}) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <Query query={FETCH_REASONS}>
      {query =>
        query.loading ? (
          <Loading />
        ) : (
          <Mutation mutation={REJECT_PROPOSAL}>
            {rejectProposal => (
              <Formik
                validationSchema={validationSchema}
                onSubmit={async values => {
                  await rejectProposal({
                    variables: {
                      id: booking.id,
                      reason: values.reason,
                      comment: values.comment
                    }
                  });

                  notifications.notify(`
                    ${specialist.firstName}'s application has been rejected
                  `)
                }}
                render={formik => (
                  <form onSubmit={formik.handleSubmit}>
                    <Spacing padding="xl">
                      <Heading marginBottom="xs">
                        Reject {specialist.name}
                      </Heading>
                      <Text marginBottom="l" size="l">
                        Please provide feedback by selecting a reason for
                        rejection
                      </Text>
                      <Select
                        block
                        marginBottom="m"
                        name="reason"
                        onChange={formik.handleChange}
                        value={formik.values.reason}
                        placeholder="Select reason for rejection"
                        options={query.data.reasons}
                        error={formik.errors.reason}
                      />
                      <TextField
                        marginBottom="xl"
                        multiline
                        name="comment"
                        value={formik.values.comment}
                        onChange={formik.handleChange}
                        placeholder="Let us know why you are declining this proposal..."
                      />
                      <ButtonGroup fullWidth>
                        <Button
                          size="l"
                          type="submit"
                          theme="danger"
                          loading={formik.isSubmitting}
                          disabled={formik.isSubmitting}
                        >
                          Reject Applicant
                        </Button>
                        <Button type="button" size="l" onClick={onClose}>
                          Cancel
                        </Button>
                      </ButtonGroup>
                    </Spacing>
                  </form>
                )}
              />
            )}
          </Mutation>
        )
      }
    </Query>
  </Modal>
);

export default withNotifications(RejectProposalModal);
