import React from "react";
import { Formik, Form } from "formik";
import { useMutation } from "@apollo/react-hooks";
import { Columns, RoundedButton } from "@advisable/donut";
import REJECT from "./reject.graphql";
import { Modal, Heading, FieldRow, Select, Padding } from "src/components";

const REJECTION_REASONS = [
  "Don’t have right skillset",
  "No availability currently",
  "Don’t have enough experience",
  "Have too much experience",
  "Doesn’t seem like a good fit",
];

const RejectModal = ({ isOpen, onClose, onReject, application }) => {
  const [reject] = useMutation(REJECT);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Padding size="xl">
        <React.Fragment>
          <Padding bottom="l">
            <Heading>
              Reject invitation to {application.project.primarySkill} project
            </Heading>
          </Padding>
          <Formik
            initialValues={{ reason: REJECTION_REASONS[0] }}
            onSubmit={async (values) => {
              await reject({
                variables: {
                  input: {
                    id: application.airtableId,
                    ...values,
                  },
                },
              });
              onReject();
            }}
          >
            {(formik) => (
              <Form>
                <FieldRow>
                  <Select
                    name="reason"
                    label="Why are you rejecting this invitation?"
                    onChange={formik.handleChange}
                    value={formik.values.reason}
                    error={formik.touched.reason && formik.errors.reason}
                    options={REJECTION_REASONS}
                  />
                </FieldRow>
                <Columns spacing="s">
                  <RoundedButton
                    size="l"
                    type="submit"
                    variant="dark"
                    loading={formik.isSubmitting}
                    width="100%"
                  >
                    Reject Invite
                  </RoundedButton>
                  <RoundedButton
                    size="l"
                    type="button"
                    variant="subtle"
                    onClick={onClose}
                    width="100%"
                  >
                    Cancel
                  </RoundedButton>
                </Columns>
              </Form>
            )}
          </Formik>
        </React.Fragment>
      </Padding>
    </Modal>
  );
};

export default RejectModal;
