import React from "react";
import { gql, useMutation } from "@apollo/client";
import { object, string } from "yup";
import { Formik, Form } from "formik";
import FormField from "src/components/FormField";
import SubmitButton from "src/components/SubmitButton";
import { useNotifications } from "src/components/Notifications";
import { Text, Button, Modal, Textarea, useModal } from "@advisable/donut";
import { DialogDisclosure } from "reakit/Dialog";

const validationSchema = object().shape({
  message: string().required("Required"),
});

const REPORT_UNRESPONSIVE = gql`
  mutation reportUnresponsiveness($input: ReportUnresponsivenessInput!) {
    reportUnresponsiveness(input: $input) {
      success
    }
  }
`;

function ReportUnresponsiveModal({ asClient, application, modal }) {
  const { notify, error } = useNotifications();
  const [report] = useMutation(REPORT_UNRESPONSIVE);
  const specialistName = application.specialist?.firstName;
  const clientName = application.project?.user?.firstName;
  const name = asClient ? specialistName : clientName;

  const handleSubmit = async (values) => {
    const { errors } = await report({
      variables: {
        input: {
          applicationId: application.id,
          message: values.message,
        },
      },
    });

    if (errors) {
      error("Something went wrong, please try again.");
    } else {
      notify(
        `We will reach out to ${name} and get back to you as soon as we have heard from them.`,
      );
      modal.hide();
    }
  };

  const initialValues = {
    message: "",
  };

  return (
    <Modal modal={modal} label="Report Unresponsive">
      <Text mb={2} fontSize="4xl" fontWeight="medium" letterSpacing="-0.03em">
        Report Unresponsive
      </Text>
      <Text lineHeight="1.2em" mb={6}>
        Has {name} stopped responding to your messages? Let us know and we will
        reach out to them directly to make sure they have seen your messages.
      </Text>
      <Formik
        validateOnMount
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <Form>
          <FormField
            as={Textarea}
            name="message"
            minRows={3}
            marginBottom={2}
            label={`What would you like to communicate to ${name}?`}
            placeholder="Message to Advisable team"
          />
          <Text fontSize="xs" color="color700" lineHeight="1.2em" mb={6}>
            This message will be sent to the Advisable team, not {name}
          </Text>
          <SubmitButton variant="dark" disableUntilValid mr={3}>
            Report Unresponsive
          </SubmitButton>
          <Button variant="subtle" type="button" onClick={modal.hide}>
            Cancel
          </Button>
        </Form>
      </Formik>
    </Modal>
  );
}

export default function ReportUnresponsive({ asClient, application }) {
  const modal = useModal();

  return (
    <>
      <DialogDisclosure {...modal} as={Button} width="100%" variant="subtle">
        Report Unresponsive
      </DialogDisclosure>

      <ReportUnresponsiveModal
        modal={modal}
        application={application}
        asClient={asClient}
      />
    </>
  );
}
