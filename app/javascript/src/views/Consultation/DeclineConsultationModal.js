import { Formik, Form } from "formik";
import { useMutation } from "@apollo/client";
import { Modal, Box, Text, Button, Textarea } from "@advisable/donut";
import FormField from "../../components/FormField";
import DECLINE from "./declineConsultation";

export default function DeclineConsultationModal({ consultation, modal }) {
  const [declineConsultation] = useMutation(DECLINE);

  const handleSubmit = async (values) => {
    await declineConsultation({
      variables: {
        input: { consultation: consultation.id, reason: values.reason },
      },
    });
  };

  return (
    <Modal modal={modal} label="Decline Consultation Modal">
      <Box padding="l">
        <Formik onSubmit={handleSubmit} initialValues={{ reason: "" }}>
          {(formik) => (
            <Form>
              <Text
                mb="l"
                fontSize="xl"
                color="blue900"
                fontWeight="medium"
                letterSpacing="-0.02em"
              >
                Decline consultation with {consultation.user.companyName}
              </Text>
              <Box mb="l">
                <FormField
                  as={Textarea}
                  minRows={3}
                  name="reason"
                  labelHint="Optional"
                  placeholder="reason"
                  label="What is your reason for declining this consultation?"
                />
              </Box>
              <Button
                type="submit"
                loading={formik.isSubmitting}
                variant="dark"
                mr="xs"
              >
                Decline Consultation
              </Button>
              <Button variant="subtle" onClick={modal.hide}>
                Cancel
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
}
