import React from "react";
import { Formik } from "formik";
import { useMutation } from "@apollo/react-hooks";
import Text from "src/components/Text";
import Modal from "src/components/Modal";
import Select from "src/components/Select";
import { Button, Columns } from "@advisable/donut";
import Heading from "src/components/Heading";
import { Padding } from "src/components/Spacing";
import TextField from "src/components/TextField";
import { useNotifications } from "src/components/Notifications";
import REJECT_PROPOSAL from "./rejectProposal.graphql";
import validationSchema from "./validationSchema";

const REASONS = [
  "Too Expensive",
  "Proposal Not A Good Fit",
  "Bad Skill Fit",
  "Not Experienced Enough",
  "Too Experienced",
  "Bad Personality Fit",
  "Someone Else More Suitable",
  "Proposal Took Too Long",
  "Not Professional Enough",
  "Project Isn’t Going Ahead",
];

const RejectProposalModal = ({
  isOpen,
  onClose,
  specialist,
  application,
  onReject,
}) => {
  const notifications = useNotifications();
  const [mutate] = useMutation(REJECT_PROPOSAL);

  const initialValues = {
    reason: "",
    comment: "",
  };

  const handleSubmit = async (values) => {
    await mutate({
      variables: {
        input: {
          id: application.airtableId,
          reason: values.reason,
          comment: values.comment,
        },
      },
    });

    if (onReject) {
      onReject();
    }

    notifications.notify(
      `${specialist.firstName}'s application has been rejected`,
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <Padding size="xl">
              <Padding bottom="s">
                <Heading level={3}>Reject {specialist.name}</Heading>
              </Padding>
              <Padding bottom="l">
                <Text size="s">
                  Please provide feedback by selecting a reason for rejection
                </Text>
              </Padding>
              <Padding bottom="m">
                <Select
                  block
                  name="reason"
                  onChange={formik.handleChange}
                  value={formik.values.reason}
                  placeholder="Select reason for rejection"
                  options={REASONS}
                  error={formik.errors.reason}
                />
              </Padding>
              <Padding bottom="m">
                <TextField
                  multiline
                  name="comment"
                  value={formik.values.comment}
                  onChange={formik.handleChange}
                  placeholder="Let us know why you are declining this proposal..."
                />
              </Padding>
              <Columns spacing="s">
                <Button
                  type="submit"
                  width="100%"
                  variant="dark"
                  loading={formik.isSubmitting}
                >
                  Reject Applicant
                </Button>
                <Button
                  type="button"
                  width="100%"
                  variant="subtle"
                  onClick={onClose}
                >
                  Cancel
                </Button>
              </Columns>
            </Padding>
          </form>
        )}
      </Formik>
    </Modal>
  );
};

export default RejectProposalModal;
