import React from "react";
import { object, string } from "yup";
import {
  Box,
  Button,
  Text,
  Heading,
  Modal,
  Link,
  useModal,
  DialogDisclosure,
  Textarea,
} from "@advisable/donut";
import { Field, Form, Formik } from "formik";
import SubmitButton from "src/components/SubmitButton";
import { useDisputePaymentRequest } from "./queries";

const validationSchema = object().shape({
  reason: string().required("Please provide a reason"),
});

function DisputePaymentRequestForm({ modal, paymentRequest }) {
  const [dispute] = useDisputePaymentRequest();
  const initialValues = { reason: "" };
  const { specialist } = paymentRequest;

  const handleSubmit = async (values) => {
    await dispute({
      variables: {
        input: {
          paymentRequest: paymentRequest.id,
          reason: values.reason,
        },
      },
    });

    modal.hide();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
      validateOnMount
    >
      <Form>
        <Heading marginBottom={2}>Dispute payment request</Heading>
        <Text lineHeight="20px" marginBottom={5}>
          Let us know why you are not happy with paying this payment request.
          We'll reach out to {specialist.name} and get back to you.
        </Text>
        <Field
          autoFocus
          as={Textarea}
          name="reason"
          minRows={6}
          placeholder="Reason..."
          marginBottom={6}
        />
        <Box display="flex" style={{ gap: "12px" }}>
          <SubmitButton variant="secondary" disableUntilValid>
            Submit
          </SubmitButton>
          <Button variant="subtle" type="button" onClick={modal.hide}>
            Cancel
          </Button>
        </Box>
      </Form>
    </Formik>
  );
}

export default function DisputePaymentRequest({ paymentRequest }) {
  const modal = useModal();

  return (
    <Box
      marginTop={8}
      borderTop="1px solid"
      borderColor="neutral100"
      paddingTop={6}
    >
      <Text lineHeight="24px" marginBottom={2} color="neutral700">
        If you are not happy with paying this request you can dispute it and we
        will reach out to {paymentRequest.specialist.name} and get back to you.
      </Text>
      <DialogDisclosure {...modal}>
        {(disclosure) => <Link {...disclosure}>Dispute request</Link>}
      </DialogDisclosure>
      <Modal modal={modal}>
        <DisputePaymentRequestForm
          modal={modal}
          paymentRequest={paymentRequest}
        />
      </Modal>
    </Box>
  );
}
