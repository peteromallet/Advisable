import React from "react";
import { gql } from "@apollo/client";
import { Formik, Form } from "formik";
import FormField from "components/FormField";
import { useMutation } from "@apollo/client";
import SubmitButton from "src/components/SubmitButton";
import { DialogDisclosure, useDialogState } from "reakit/Dialog";
import { Text, Button, Columns, Textarea, Modal } from "@advisable/donut";
import { PauseCircle } from "@styled-icons/feather";

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

const StopWorkingModal = ({ application }) => {
  const modal = useDialogState();
  const name = application?.specialist?.firstName;
  const [stopWorking] = useMutation(STOP_WORKING);

  const handleSubmit = async (values, formikBag) => {
    try {
      await stopWorking({
        variables: {
          input: {
            application: application.id,
            ...values,
          },
        },
      });
    } catch (e) {
      formikBag.setSubmitting(false);
      formikBag.setStatus(
        "It looks like something went wrong. Please try again.",
      );
    }
  };

  return (
    <>
      <DialogDisclosure {...modal}>
        {(disclosure) => (
          <Button
            {...disclosure}
            width="100%"
            align="left"
            prefix={<PauseCircle />}
            aria-label="Stop Working"
            variant="subtle"
          >
            Stop Working
          </Button>
        )}
      </DialogDisclosure>
      <Modal modal={modal} padding={8} label={`Stop working with ${name}`}>
        <Text
          as="h4"
          mb={2}
          fontSize="3xl"
          lineHeight="1.2"
          fontWeight="500"
          color="neutral900"
          letterSpacing="-0.03rem"
        >
          Are you sure you want to stop working with {name}?
        </Text>
        <Text color="neutral700" lineHeight="1.4" mb={8}>
          You wont be able to add or edit any tasks. Don&apos;t worry though, If
          you want to start working with {name} again you will be able to
          restart this project when you need.
        </Text>
        <Formik onSubmit={handleSubmit} initialValues={{ reason: "" }}>
          {(formik) => (
            <Form>
              <FormField
                as={Textarea}
                name="reason"
                label="Let us know why you are stopping this work"
                placeholder={`What is your reason for stopping your work with ${name}`}
              />
              <Columns mt="l" spacing="xs">
                <SubmitButton width="100%">Stop Working</SubmitButton>
                <Button
                  type="button"
                  width="100%"
                  variant="subtle"
                  onClick={modal.hide}
                >
                  Cancel
                </Button>
              </Columns>
              {formik.status && (
                <Text color="red600" mt="m">
                  {formik.status}
                </Text>
              )}
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default StopWorkingModal;
