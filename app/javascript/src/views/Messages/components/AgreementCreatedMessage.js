import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  useModal,
  DialogDisclosure,
  Box,
  Text,
  Circle,
  Textarea,
} from "@advisable/donut";
import { BaseMessage } from "./Message";
import { Calendar } from "@styled-icons/heroicons-solid";
import { useAcceptAgreement, useDeclineAgreement } from "../queries";
import AgreementDetails from "src/views/NewAgreement/AgreementDetails";
import { useMessagePrompt } from "./MessagePrompt";

function AgreementPending({ agreement, onAccept, onDecline }) {
  const [accept, acceptState] = useAcceptAgreement();

  const handleAccept = async () => {
    await accept({
      variables: {
        input: {
          agreement: agreement.id,
        },
      },
    });

    onAccept();
  };

  return (
    <Box display="flex" style={{ gap: "12px" }}>
      <Button
        size="l"
        variant="gradient"
        onClick={handleAccept}
        loading={acceptState.loading}
      >
        Accept
      </Button>
      <Button
        disabled={acceptState.loading}
        size="l"
        variant="secondary"
        onClick={onDecline}
      >
        Decline
      </Button>
    </Box>
  );
}

function AgreementActions({ agreement, onAccept, onDecline }) {
  if (agreement.status === "accepted") {
    return <>accepted</>;
  }

  return (
    <AgreementPending
      agreement={agreement}
      onAccept={onAccept}
      onDecline={onDecline}
    />
  );
}

function Agreement({ agreement, onAccept, onDecline }) {
  const { specialist, company } = agreement;

  return (
    <>
      <AgreementDetails
        specialistName={specialist.name}
        companyName={company.name}
        collaboration={agreement.collaboration}
        invoicing={agreement.invoicing}
        hourlyRate={agreement.hourlyRate}
      />
      <Box marginTop={8}>
        <AgreementActions
          agreement={agreement}
          onAccept={onAccept}
          onDecline={onDecline}
        />
      </Box>
    </>
  );
}

function DeclineAgreement({ agreement, onBack }) {
  const [decline, { loading }] = useDeclineAgreement();
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    decline({
      variables: {
        input: {
          agreement: agreement.id,
          message,
        },
      },
    });
  };

  return (
    <>
      <Text>Decline request</Text>
      <Textarea
        name="message"
        value={message}
        placeholder="Message..."
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button onClick={handleSubmit} loading={loading}>
        Decline Request
      </Button>
    </>
  );
}

function AgreementModal({ agreement, modal }) {
  const [step, setStep] = useState("VIEW");

  if (step === "DECLINE") {
    return (
      <DeclineAgreement agreement={agreement} onClick={() => setStep("VIEW")} />
    );
  }

  return (
    <Agreement
      agreement={agreement}
      onAccept={modal.hide}
      onDecline={() => setStep("DECLINE")}
    />
  );
}

function ViewAgreement({ agreement }) {
  const modal = useModal();
  return (
    <>
      <DialogDisclosure {...modal}>
        {(disclosure) => (
          <Button variant="gradient" {...disclosure}>
            Respond
          </Button>
        )}
      </DialogDisclosure>
      <Modal modal={modal} width={640}>
        <AgreementModal agreement={agreement} modal={modal} />
      </Modal>
    </>
  );
}

export default function AgreementCreatedMessage({ message }) {
  const sender = message.agreement?.specialist?.firstName;
  const { show, dismiss, highlight } = useMessagePrompt(
    message,
    "New request to work together",
  );

  useEffect(() => {
    if (message.agreement?.status === "pending") {
      show();
    } else {
      dismiss();
    }
  }, [show, dismiss, message]);

  return (
    <BaseMessage message={message} highlight={highlight}>
      <Box
        padding={4}
        borderRadius="20px"
        border="2px solid"
        borderColor="neutral300"
        display="flex"
        alignItems="center"
      >
        <Circle size={40} bg="neutral200" color="neutral800">
          <Calendar size={20} />
        </Circle>
        <Box paddingLeft={3} flex={1}>
          <Text fontSize="17px" fontWeight={560} marginBottom={1}>
            {sender} requested to work together
          </Text>
          <Text color="neutral600" fontSize="sm">
            Review the agreement
          </Text>
        </Box>
        {message.agreement.status === "pending" && (
          <ViewAgreement agreement={message.agreement} />
        )}
      </Box>
    </BaseMessage>
  );
}
