import React from "react";
import { Formik, Form } from "formik";
import { useMutation } from "@apollo/react-hooks";
import REJECT from "./reject.graphql";
import {
  Modal,
  Heading,
  FieldRow,
  Select,
  Padding,
  ButtonGroup,
  Button,
} from "src/components";

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
                <ButtonGroup fullWidth>
                  <Button
                    type="submit"
                    size="l"
                    styling="danger"
                    loading={formik.isSubmitting}
                  >
                    Reject Invite
                  </Button>
                  <Button
                    styling="outlined"
                    size="l"
                    type="button"
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                </ButtonGroup>
              </Form>
            )}
          </Formik>
        </React.Fragment>
      </Padding>
    </Modal>
  );
};

export default RejectModal;
