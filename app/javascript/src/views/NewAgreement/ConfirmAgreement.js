import React from "react";
import { object, string } from "yup";
import { Form, Formik, Field } from "formik";
import { Box, Container, Heading, Text, Textarea } from "@advisable/donut";
import { useParams, useLocation, useHistory, Redirect } from "react-router-dom";
import { useCreateAgreement } from "./queries";
import BackButton from "src/components/BackButton";
import FormField from "src/components/FormField";
import SubmitButton from "src/components/SubmitButton";
import AgreementDetails from "./AgreementDetails";
import useViewer from "src/hooks/useViewer";
import { PaperAirplane } from "@styled-icons/heroicons-solid";

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
            Send request
          </Heading>
          <Text fontSize="lg" mb={8} lineHeight="24px">
            Please review and send your request. Once {user.company.name}{" "}
            accepts you can begin working together.
          </Text>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
            validateOnMount
          >
            <Form>
              <Text
                as="label"
                htmlFor="message"
                fontSize="l"
                fontWeight={520}
                display="block"
                marginBottom={3}
              >
                Message to {user.name} from {user.company.name}
              </Text>
              <Field
                as={Textarea}
                id="message"
                name="message"
                marginBottom={10}
                minRows={10}
                autoFocus
                placeholder="Message"
              />
              <SubmitButton
                prefix={<PaperAirplane />}
                size="l"
                variant="gradient"
                disableUntilValid
              >
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
