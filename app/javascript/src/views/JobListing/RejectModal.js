import React from "react";
import { Formik, Form } from "formik";
import { useMutation } from "@apollo/client";
import { Columns, Button, Modal, Text, Select } from "@advisable/donut";
import { REJECT_INVITATION } from "./queries";
import FormField from "../../components/FormField";

const REJECTION_REASONS = [
  "Don’t have right skillset",
  "No availability currently",
  "Don’t have enough experience",
  "Have too much experience",
  "Doesn’t seem like a good fit",
];

const RejectModal = ({ modal, onReject, application }) => {
  const [reject] = useMutation(REJECT_INVITATION);
  return (
    <Modal modal={modal} label="Reject application invitation" padding="l">
      <Text
        as="h4"
        mb="lg"
        color="blue900"
        fontSize="24px"
        fontWeight="medium"
        letterSpacing="-0.02em"
      >
        Reject invitation to {application.project.primarySkill?.name} project
      </Text>
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
            <FormField
              mb="l"
              as={Select}
              name="reason"
              label="Why are you rejecting this invitation?"
            >
              {REJECTION_REASONS.map((reason) => (
                <option key={reason}>{reason}</option>
              ))}
            </FormField>
            <Columns spacing="s">
              <Button
                size="l"
                type="submit"
                variant="dark"
                loading={formik.isSubmitting}
                width="100%"
              >
                Reject Invite
              </Button>
              <Button
                size="l"
                type="button"
                variant="subtle"
                onClick={modal.hide}
                width="100%"
              >
                Cancel
              </Button>
            </Columns>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default RejectModal;
