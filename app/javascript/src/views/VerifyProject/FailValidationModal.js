import React from "react";
import { Formik, Form } from "formik";
import { useParams } from "react-router-dom";
import { Modal, Text, Stack, Button, Textarea } from "@advisable/donut";
import FormField from "../../components/FormField";
import SubmitButton from "../../components/SubmitButton";
import { useFailPreviousProjectValidation } from "./queries";

function FailValidationModal({ modal }) {
  const { id } = useParams();
  const [failValidation] = useFailPreviousProjectValidation();

  const initialValues = {
    reason: "",
  };

  const handleSubmit = async (values) => {
    await failValidation({
      variables: {
        input: {
          previousProject: id,
          ...values,
        },
      },
    });
  };

  return (
    <Modal modal={modal} padding="l" label="Can't validate">
      <Text lineHeight="m" fontSize="xxl" fontWeight="semibold" mb="xs">
        Can&apos;t verify project
      </Text>
      <Text lineHeight="m" mb="l">
        Thanks for reviewing the details of this project. Please let us know why
        you can&apos;t verify the details of this project?
      </Text>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <Stack spacing="m">
            <FormField
              minRows={2}
              as={Textarea}
              name="reason"
              placeholder="Reason"
            />
            <>
              <SubmitButton size="l" variant="dark" mr="xs">
                Continue
              </SubmitButton>
              <Button
                size="l"
                type="button"
                variant="subtle"
                onClick={modal.hide}
              >
                Cancel
              </Button>
            </>
          </Stack>
        </Form>
      </Formik>
    </Modal>
  );
}

export default FailValidationModal;
