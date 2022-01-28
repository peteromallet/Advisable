import React from "react";
import { object, string } from "yup";
import { Form, Formik } from "formik";
import { Box, Container, Heading, Text, Textarea } from "@advisable/donut";
import { useParams, useLocation, useHistory, Redirect } from "react-router-dom";
import { useCreateAgreement } from "./queries";
import BackButton from "src/components/BackButton";
import FormField from "src/components/FormField";
import SubmitButton from "src/components/SubmitButton";
import AgreementDetails from "./AgreementDetails";
import useViewer from "src/hooks/useViewer";

const validationSchema = object().shape({
  message: string().required("Please provide a message."),
});

export default function ConfirmAgreement({ user }) {
  const viewer = useViewer();
  const { userId } = useParams();
  const location = useLocation();
  const history = useHistory();
  const [createAgreement] = useCreateAgreement();

  if (!location.state?.invoicing) {
    return <Redirect to={`/new_agreement/${userId}/invoicing`} />;
  }

  const handleSubmit = async (values) => {
    const response = await createAgreement({
      variables: {
        input: {
          user: userId,
          collaboration: location.state.collaboration,
          invoicing: location.state.invoicing,
          hourlyRate: location.state.hourlyRate,
          ...values,
        },
      },
    });

    const conversation = response.data.createAgreement.conversation;

    history.push(`/messages/${conversation.id}`);
  };

  const initialValues = { message: "" };

  return (
    <Container paddingY={10} maxWidth="1080px">
      <Box display="flex">
        <Box paddingRight={16}>
          <BackButton
            marginBottom={4}
            to={{
              pathname: `/new_agreement/${userId}/invoicing`,
              state: location.state,
            }}
          />
          <Heading mb={2} size="6xl">
            Review and send
          </Heading>
          <Text fontSize="lg" mb={8} lineHeight="24px">
            Please review and send your request. Once accepted you can begin
            working together.
          </Text>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            validateOnMount
          >
            <Form>
              <FormField
                as={Textarea}
                name="message"
                marginBottom={10}
                minRows={10}
                autoFocus
                label={`Message to ${user.name} from ${user.company.name}`}
                description={`Your request will be sent to ${user.name}`}
                placeholder="Message"
              />
              <SubmitButton size="l" variant="gradient" disableUntilValid>
                Send request
              </SubmitButton>
            </Form>
          </Formik>
        </Box>
        <Box width="480px" flexShrink="0">
          <Box boxShadow="m" padding={8} borderRadius="16px">
            <AgreementDetails
              specialistName={viewer.name}
              companyName={user.company.name}
              collaboration={location.state.collaboration}
              hourlyRate={location.state.hourlyRate}
              invoicing={location.state.invoicing}
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
