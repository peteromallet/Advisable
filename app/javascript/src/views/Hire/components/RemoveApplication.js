import React from "react";
import { Box, Button, Heading, Modal, Text, Textarea } from "@advisable/donut";
import { useDialogState, DialogDisclosure } from "reakit/Dialog";
import CircularButton from "src/components/CircularButton";
import { Trash } from "@styled-icons/heroicons-solid";
import { Field, Form, Formik } from "formik";
import SubmitButton from "src/components/SubmitButton";
import { useRejectApplication } from "../queries";

function RemoveApplicationForm({ dialog, application, onRemove = () => {} }) {
  const [removeApplication] = useRejectApplication();
  const handleSubmit = async (values) => {
    await removeApplication({
      variables: {
        input: {
          id: application.id,
          message: values.message,
        },
      },
    });

    dialog.hide();
    onRemove(application);
  };

  const firstName = application.specialist.firstName;

  return (
    <>
      <Heading letterSpacing="-0.03em" marginBottom={8}>
        Remove {firstName}
      </Heading>
      <Box marginBottom={1.5} display="flex" justifyContent="space-between">
        <Text fontSize="lg" fontWeight={500} letterSpacing="-0.016em">
          Let {firstName} know you’re not interested
        </Text>
        <Text fontSize="sm" color="neutral500">
          Optional
        </Text>
      </Box>
      <Text fontSize="sm" color="neutral800" lineHeight="20px" marginBottom={4}>
        Out of respect for {firstName}, if you haven’t already, we encourage you
        to let them know you’re not interested.
      </Text>
      <Formik onSubmit={handleSubmit} initialValues={{ message: "" }}>
        <Form>
          <Field
            minRows={3}
            as={Textarea}
            name="message"
            marginBottom={8}
            placeholder="Message..."
          />
          <SubmitButton variant="dark">Remove</SubmitButton>
          <Button variant="subtle" marginLeft={3} onClick={dialog.hide}>
            Cancel
          </Button>
        </Form>
      </Formik>
    </>
  );
}

export default function RemoveApplication({ application, onRemove, ...props }) {
  const dialog = useDialogState();
  const firstName = application.specialist.firstName;

  return (
    <>
      <DialogDisclosure
        {...dialog}
        as={CircularButton}
        size="sm"
        label="Remove"
        icon={<Trash />}
        {...props}
      />
      <Modal padding={[4, 6, 8]} modal={dialog} label={`Reject ${firstName}`}>
        <RemoveApplicationForm
          application={application}
          dialog={dialog}
          onRemove={onRemove}
        />
      </Modal>
    </>
  );
}
