import React from "react";
import { Formik, Form } from "formik";
import { Mutation } from "react-apollo";
import REJECT from "./reject.graphql";
import {
  Modal,
  Heading,
  FieldRow,
  Select,
  Padding,
  ButtonGroup,
  Button
} from "src/components";

const REJECTION_REASONS = [
  "Don’t have right skillset",
  "No availability currently",
  "Don’t have enough experience",
  "Have too much experience",
  "Doesn’t seem like a good fit"
];

const RejectModal = ({ isOpen, onClose, onReject, applicationId }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Padding size="xl">
        <React.Fragment>
          <Padding bottom="l">
            <Heading>Reject invitation to ClickDimensions at Selecta</Heading>
          </Padding>
          <Mutation mutation={REJECT}>
            {reject => (
              <Formik
                initialValues={{ reason: REJECTION_REASONS[0] }}
                onSubmit={async values => {
                  await reject({
                    variables: {
                      input: {
                        id: applicationId,
                        ...values
                      }
                    }
                  });
                  onReject();
                }}
              >
                {formik => (
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
            )}
          </Mutation>
        </React.Fragment>
      </Padding>
    </Modal>
  );
};

export default RejectModal;
