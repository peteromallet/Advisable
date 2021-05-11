import React from "react";
import { object, string } from "yup";
import { gql, useMutation } from "@apollo/client";
import { Formik, Form } from "formik";
import { Ban } from "@styled-icons/heroicons-outline/Ban";
import { DialogDisclosure, useDialogState } from "reakit/Dialog";
import { Text, Button, Modal, Textarea } from "@advisable/donut";
import FormField from "components/FormField";
import SubmitButton from "components/SubmitButton";

const validationSchema = object().shape({
  reason: string().required("Please provide a reason."),
});

export const STOP_WORKING = gql`
  mutation stopWorking($input: StopWorkingInput!) {
    stopWorking(input: $input) {
      application {
        id
        status
      }
    }
  }
`;

function StopWorkingModal({ modal, clientName, applicationId }) {
  const [stopWorking] = useMutation(STOP_WORKING);

  const handleSubmit = async (values, formik) => {
    const { errors } = await stopWorking({
      variables: {
        input: {
          application: applicationId,
          reason: values.reason,
        },
      },
    });

    if (errors) {
      formik.setSubmitting(false);
      formik.setStatus("It looks like something went wrong, please try again.");
    }
  };

  const initialValues = {
    reason: "",
  };

  return (
    <Modal modal={modal} label="Stop working">
      <Text mb={1} fontSize="5xl" fontWeight="medium" letterSpacing="-0.03rem">
        Stop working
      </Text>
      <Text color="neutral800" lineHeight="1.3" mb={6}>
        This will end your work with {clientName}. Once you stop working with{" "}
        {clientName} you won&apos;t be able to add, edit or action any tasks.
      </Text>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        validateOnMount
      >
        <Form>
          <FormField
            name="reason"
            as={Textarea}
            minRows={4}
            marginBottom={8}
            label="Let us know why you are stopping this work"
            placeholder={`What is your reason for stopping your work with ${clientName}`}
          />
          <SubmitButton variant="dark" mr={2} disableUntilValid>
            Stop Working
          </SubmitButton>
          <Button variant="subtle" onClick={modal.hide}>
            Cancel
          </Button>
        </Form>
      </Formik>
    </Modal>
  );
}

export default function StopWorking({ clientName, applicationId, ...props }) {
  const modal = useDialogState();

  return (
    <>
      <StopWorkingModal
        modal={modal}
        clientName={clientName}
        applicationId={applicationId}
      />
      <DialogDisclosure
        as={Button}
        variant="subtle"
        width="100%"
        prefix={<Ban />}
        {...modal}
        {...props}
      >
        Stop Working
      </DialogDisclosure>
    </>
  );
}
