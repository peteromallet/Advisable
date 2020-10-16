import { Formik, Form } from "formik";
import { Box, Card, Text, Paragraph, Textarea } from "@advisable/donut";
import FormField from "components/FormField";
import SubmitButton from "components/SubmitButton";
import { useRequestInterviewReschedule } from "./queries";

export default function RequestRescheduleAsSpecialist({ interview }) {
  const initialValues = { note: "" };
  const [requestRequest] = useRequestInterviewReschedule();

  const handleSubmit = async (values) => {
    await requestRequest({
      variables: {
        input: {
          interview: interview.id,
          note: values.note,
        },
      },
    });
  };

  return (
    <Box maxWidth="500px" marginX="auto" paddingY="xl">
      <Card padding={["xl", "2xl"]} borderRadius="12px">
        <Text
          fontSize="3xl"
          marginBottom="xs"
          fontWeight="medium"
          letterSpacing="-0.02em"
        >
          Request to reschedule interview with {interview.user.firstName}
        </Text>
        <Paragraph marginBottom="xl">
          We will reach out to {interview.user.firstName} to see what other
          times are available and let you know once they have suggested new
          times.
        </Paragraph>
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form>
            <FormField
              name="note"
              as={Textarea}
              marginBottom="xl"
              label={`Include a message to ${interview.user.firstName} about when might suit you best.`}
            />
            <SubmitButton variant="dark">Request To Reschedule</SubmitButton>
          </Form>
        </Formik>
      </Card>
    </Box>
  );
}
