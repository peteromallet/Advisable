import React from "react";
import { get } from "lodash-es";
import gql from "graphql-tag";
import { Formik, Form } from "formik";
import FormField from "components/FormField";
import { useMutation } from "@apollo/apollo";
import { Text, Box, Button, Columns, Textarea } from "@advisable/donut";
import Modal from "../../components/Modal";

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

const StopWorkingModal = ({ isOpen, onClose, application }) => {
  const name = get(application, "specialist.firstName");
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
    <Modal isOpen={isOpen} onClose={onClose}>
      <Box padding="l">
        <Text
          pr="s"
          as="h4"
          mb="xs"
          size="xl"
          lineHeight="l"
          fontWeight="medium"
          color="blue900"
        >
          Are you sure you want to stop working with {name}?
        </Text>
        <Text size="xs" color="neutral700" lineHeight="s" mb="l">
          You wont be able to add or edit any tasks. Don't worry though, If you
          want to start working with {name} again you will be able to restart
          this project when you need.
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
                <Button
                  width="100%"
                  type="submit"
                  aria-label="Stop Working"
                  loading={formik.isSubmitting}
                >
                  Stop Working
                </Button>
                <Button
                  type="button"
                  width="100%"
                  variant="subtle"
                  onClick={onClose}
                >
                  Cancel
                </Button>
              </Columns>
              {formik.status && (
                <Text color="red.6" mt="m">
                  {formik.status}
                </Text>
              )}
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default StopWorkingModal;
