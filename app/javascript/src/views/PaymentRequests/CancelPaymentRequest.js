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
import { useCancelPaymentRequest } from "./queries";

const validationSchema = object().shape({
  reason: string().required("Please provide a reason"),
});

function CancelPaymentRequestForm({ modal, paymentRequest }) {
  const [cancel] = useCancelPaymentRequest();
  const initialValues = { reason: "" };

  const handleSubmit = async (values) => {
    await cancel({
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
        <Heading marginBottom={2}>Cancel payment request</Heading>
        <Text lineHeight="20px" marginBottom={5}>
          Let us know why you are canceling this payment request.
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

export default function CancelPaymentRequest({ paymentRequest }) {
  const modal = useModal();

  return (
    <>
      <DialogDisclosure {...modal}>
        {(disclosure) => (
          <Link as="button" variant="underlined" {...disclosure}>
            Cancel request
          </Link>
        )}
      </DialogDisclosure>
      <Modal modal={modal}>
        <CancelPaymentRequestForm
          modal={modal}
          paymentRequest={paymentRequest}
        />
      </Modal>
    </>
  );
}
