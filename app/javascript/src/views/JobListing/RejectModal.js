import React from "react";
import { object, string } from "yup";
import { Formik, Form, useField } from "formik";
import { useMutation } from "@apollo/client";
import { Columns, Button, Modal, Text, Select } from "@advisable/donut";
import { REJECT_INVITATION } from "./queries";
import FormField from "src/components/FormField";
import DatePicker from "src/components/DatePicker";
import SubmitButton from "src/components/SubmitButton";
import { useSetUnavailableUntil } from "src/shared/mutations/setUnavailableUntil";

const NOT_AVAILABLE = "No availability currently";

const REJECTION_REASONS = [
  "Don’t have right skillset",
  NOT_AVAILABLE,
  "Don’t have enough experience",
  "Have too much experience",
  "Doesn’t seem like a good fit",
];

const validationSchema = object().shape({
  reason: string().required(),
  unavailableUntil: string().when("reason", {
    is: NOT_AVAILABLE,
    then: string().required("Please provide a date when you will be available"),
  }),
});

function UnavailableDate() {
  const [reason] = useField("reason");
  const [, , helpers] = useField("unavailableUntil");

  if (reason.value !== NOT_AVAILABLE) return null;

  const isDayDisabled = (day) => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return day < now;
  };

  return (
    <FormField
      marginBottom={6}
      name="unavailableUntil"
      as={DatePicker.Input}
      onChange={helpers.setValue}
      disabledDays={isDayDisabled}
      label="When will you be available again?"
      description="We wont send you any more project invititations until then"
    />
  );
}

export default function RejectModal({ modal, onReject, application }) {
  const [reject] = useMutation(REJECT_INVITATION);
  const [setUnavailable] = useSetUnavailableUntil();

  const handleReject = async (values) => {
    if (values.reason === NOT_AVAILABLE) {
      await setUnavailable({
        variables: {
          input: {
            date: values.unavailableUntil,
          },
        },
      });
    }

    await reject({
      variables: {
        input: {
          id: application.id,
          reason: values.reason,
        },
      },
    });

    onReject();
  };

  const initialValues = {
    reason: REJECTION_REASONS[0],
    unavailableUntil: undefined,
  };

  return (
    <Modal modal={modal} label="Reject application invitation" padding={8}>
      <Text
        as="h4"
        mb={6}
        color="neutral900"
        fontSize="4xl"
        fontWeight="medium"
        letterSpacing="-0.03rem"
      >
        Reject invitation to {application.project.primarySkill?.name} project
      </Text>
      <Formik
        initialValues={initialValues}
        onSubmit={handleReject}
        validationSchema={validationSchema}
        validateOnMount
      >
        <Form>
          <FormField
            as={Select}
            name="reason"
            marginBottom={6}
            label="Why are you rejecting this invitation?"
          >
            {REJECTION_REASONS.map((reason) => (
              <option key={reason}>{reason}</option>
            ))}
          </FormField>
          <UnavailableDate />
          <Columns paddingTop={2} spacing="s">
            <SubmitButton
              size="l"
              variant="dark"
              width="100%"
              disableUntilValid
            >
              Reject Invite
            </SubmitButton>
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
      </Formik>
    </Modal>
  );
}
