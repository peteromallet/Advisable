import React, { useState } from "react";
import {
  useAcceptConsultationRequest,
  useDeclineConsultationRequest,
} from "../queries";
import {
  Modal,
  Box,
  Text,
  Button,
  Heading,
  Textarea,
  useModal,
  DialogDisclosure,
} from "@advisable/donut";
import { useHistory } from "react-router-dom";
import CircularButton from "src/components/CircularButton";
import { ArrowLeft } from "@styled-icons/heroicons-solid";
import { useNotifications } from "src/components/Notifications";

function ConsultationRequestPrompt({ message, sender, onDecline }) {
  const history = useHistory();
  const { error } = useNotifications();
  const [accept, { loading }] = useAcceptConsultationRequest();

  const gotoInterview = (i) => history.push(`/interviews/${i.id}`);

  const handleAccept = async () => {
    if (message.consultation.interview) {
      gotoInterview(message.consultation.interview);
      return;
    }

    const response = await accept({
      variables: {
        input: {
          consultation: message.consultation.id,
        },
      },
    });

    if (response.errors) {
      error("Something went wrong, please try again.");
      return;
    }

    gotoInterview(response.data.acceptConsultation.interview);
  };

  return (
    <>
      <Heading textAlign="center" marginBottom={2}>
        Interview request
      </Heading>
      <Text textAlign="center" fontSize="l" lineHeight="20px" marginBottom={6}>
        {sender} has requested a 30 minute call with you.
      </Text>
      <Box display="flex">
        <Box width="100%" marginRight={2}>
          <Button
            width="100%"
            size="l"
            loading={loading}
            variant="gradient"
            onClick={handleAccept}
          >
            View availability
          </Button>
        </Box>
        <Box width="100%" marginLeft={2}>
          <Button size="l" width="100%" variant="dark" onClick={onDecline}>
            Decline
          </Button>
        </Box>
      </Box>
    </>
  );
}

function DeclineConsultationRequest({ message, sender, onBack, onDecline }) {
  const [decline, { loading }] = useDeclineConsultationRequest();
  const [reason, setReason] = useState("");

  const handleDecline = async () => {
    await decline({
      variables: {
        input: {
          consultation: message.consultation.id,
          reason: reason.trim(),
        },
      },
    });

    onDecline();
  };

  return (
    <>
      <Box position="absolute" left="12px" top="12px">
        <CircularButton onClick={onBack} icon={ArrowLeft} />
      </Box>
      <Heading textAlign="center" marginBottom={2}>
        Decline Interview request
      </Heading>
      <Text textAlign="center" fontSize="l" lineHeight="20px" marginBottom={6}>
        Let them know why you are declining
      </Text>
      <Textarea
        autoFocus
        minRows={8}
        value={reason}
        marginBottom={8}
        placeholder={`Message to ${sender}...`}
        onChange={(e) => setReason(e.target.value)}
      />
      <Button
        width="100%"
        variant="dark"
        size="l"
        onClick={handleDecline}
        loading={loading}
        disabled={reason.trim().length === 0}
      >
        Decline request
      </Button>
    </>
  );
}

export default function ConsultationRequestModal({ sender, message }) {
  const modal = useModal();
  const [decline, setDecline] = useState(false);

  const reset = () => setDecline(false);
  const handleDecline = () => setDecline(true);

  return (
    <>
      <DialogDisclosure {...modal}>
        {(disclosure) => (
          <Button {...disclosure} variant="gradient" size="s">
            View
          </Button>
        )}
      </DialogDisclosure>
      <Modal modal={modal}>
        {decline ? (
          <DeclineConsultationRequest
            message={message}
            sender={sender}
            onBack={reset}
            onDecline={modal.hide}
          />
        ) : (
          <ConsultationRequestPrompt
            sender={sender}
            message={message}
            onDecline={handleDecline}
          />
        )}
      </Modal>
    </>
  );
}
