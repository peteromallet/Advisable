import React from "react";
import { object, string } from "yup";
import { Form, Formik, Field } from "formik";
import { Box, Heading, Text, Stack, Textarea } from "@advisable/donut";
import {
  useParams,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { useCreateAgreement } from "./queries";
import BackButton from "src/components/BackButton";
import SubmitButton from "src/components/SubmitButton";
import AgreementDetails from "./AgreementDetails";
import useViewer from "src/hooks/useViewer";
import { PaperAirplane, PlusSm } from "@styled-icons/heroicons-solid";
import useAttachments from "../Messages/hooks/useAttachments";
import AddAttachmentsButton from "../Messages/components/AddAttachmentsButton";
import Attachment from "../Messages/components/Attachment";

const validationSchema = object().shape({
  message: string().required("Please provide a message."),
});

function AgreementAttachments({
  attachments,
  addAttachments,
  completeUpload,
  removeAttachment,
}) {
  return (
    <Stack divider="neutral100" marginBottom={10}>
      {attachments.map((a) => (
        <Attachment
          key={a.id}
          attachment={a}
          completeUpload={completeUpload}
          onRemove={() => removeAttachment(a.id)}
        />
      ))}
      <Box paddingY={4}>
        <AddAttachmentsButton
          icon={<PlusSm />}
          label="Add attachment"
          onSelect={(e) => addAttachments(e.target.files)}
        />
      </Box>
    </Stack>
  );
}

export default function ConfirmAgreement({ user }) {
  const viewer = useViewer();
  const { userId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const attachmentProps = useAttachments();
  const [createAgreement] = useCreateAgreement();
  const { uploading } = attachmentProps;

  if (!location.state?.invoicing) {
    return <Navigate to={`/new_agreement/${userId}/invoicing`} />;
  }

  const handleSubmit = async (values) => {
    const response = await createAgreement({
      variables: {
        input: {
          user: userId,
          collaboration: location.state.collaboration,
          invoicing: location.state.invoicing,
          hourlyRate: location.state.hourlyRate,
          attachments: attachmentProps.signedIds,
          ...values,
        },
      },
    });

    const conversation = response.data.createAgreement.conversation;

    navigate(`/messages/${conversation.id}`);
  };

  const initialValues = { message: "" };

  return (
    <>
      <Box display="flex">
        <Box paddingRight={{ _: 0, m: 16 }}>
          <BackButton
            marginBottom={4}
            to={`/new_agreement/${userId}/invoicing`}
            state={location.state}
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
                marginBottom={2}
                minRows={10}
                autoFocus
                placeholder="Message"
              />
              <AgreementAttachments {...attachmentProps} />
              <SubmitButton
                prefix={<PaperAirplane />}
                size="l"
                variant="gradient"
                width={{ _: "100%", m: "auto" }}
                disableUntilValid
                disabled={uploading}
              >
                Send request
              </SubmitButton>
            </Form>
          </Formik>
        </Box>
        <Box display={{ _: "none", m: "block" }} width="480px" flexShrink="0">
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
    </>
  );
}
