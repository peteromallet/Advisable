import React, { useState } from "react";
import { useDeclineConsultationRequest } from "../queries";
import { Modal, Box, Text, Button, Heading, Textarea } from "@advisable/donut";
import { Link } from "react-router-dom";
import CircularButton from "src/components/CircularButton";
import { ArrowLeft } from "@styled-icons/heroicons-solid";

function ConsultationRequestPrompt({ message, sender, onDecline }) {
  return (
    <>
      <Heading textAlign="center" marginBottom={2}>
        Interview request
      </Heading>
      <Text textAlign="center" fontSize="l" lineHeight="20px" marginBottom={6}>
        {sender} has requested a 30 minute call with you.
      </Text>
      <Box display="flex">
        <Box
          as={Link}
          width="100%"
          marginRight={2}
          to={`/interviews/${message.consultation?.interview?.id}`}
        >
          <Button width="100%" size="l" variant="gradient">
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

export default function ConsultationRequestModal({ modal, sender, message }) {
  const [decline, setDecline] = useState(false);

  const reset = () => setDecline(false);
  const handleDecline = () => setDecline(true);

  return (
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
  );
}
