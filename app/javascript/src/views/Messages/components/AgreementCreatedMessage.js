import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Modal,
  useModal,
  DialogDisclosure,
  Box,
  Text,
  Stack,
  Circle,
  Textarea,
} from "@advisable/donut";
import { BaseMessage } from "./Message";
import { Calendar } from "@styled-icons/heroicons-solid";
import { useAcceptAgreement, useDeclineAgreement } from "../queries";
import BackButton from "src/components/BackButton";

function AgreementSection({ title, children }) {
  return (
    <Box>
      <Text fontWeight={560} marginBottom={1} fontSize="l">
        {title}
      </Text>
      <Text lineHeight="20px" color="neutral800">
        {children}
      </Text>
    </Box>
  );
}

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

const COLLABORATION_TYPES = {
  fixed: () => `fixed`,
  hourly: () => `hourly`,
  flexible: () => `flexible`,
};

const INVOICES_TYPES = {
  upfront: () => `upfront`,
  recurring: () => `recurring`,
  after: () => `after`,
  flexible: () => `flexible`,
};

function Agreement({ agreement, onAccept, onDecline }) {
  const { specialist, company } = agreement;

  const collaborationType = COLLABORATION_TYPES[agreement.collaboration];
  const invoiceType = INVOICES_TYPES[agreement.invoicing];

  return (
    <>
      <Text
        fontSize="4xl"
        fontWeight={560}
        marginBottom={2}
        paddingRight={12}
        letterSpacing="-0.02em"
      >
        Agreement between {specialist.name} and {company.name}
      </Text>
      <Text
        fontSize="lg"
        lineHeight="24px"
        color="neutral700"
        marginBottom={12}
      >
        Please review the agreement below and accept if you are happy to proceed
        with working with {specialist.firstName}.
      </Text>
      <Stack spacing="2xl" divider="neutral100" marginBottom={10}>
        <AgreementSection title="Collaboration Type">
          {collaborationType(agreement)}
        </AgreementSection>
        <AgreementSection title="Invoicing">
          {invoiceType(agreement)}
        </AgreementSection>
        <AgreementSection title="Trial period">
          Each collaboration on Advisable kicks off with a Trial Period that
          equals a $1,000 budget. It benefits both freelancers and clients as it
          provides security regarding payments during your first hours of work.
        </AgreementSection>
        <AgreementSection title="Terms of service">
          Advisable’s terms of service also apply to this agreement. Feel free
          to take a look at the document once again in case you have any
          remaining questions.
        </AgreementSection>
      </Stack>
      <AgreementActions
        agreement={agreement}
        onAccept={onAccept}
        onDecline={onDecline}
      />
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
  const sender = message.author?.name;
  // const { show, dismiss, highlight } = useMessagePrompt(
  //   message,
  //   "New consultation request",
  // );

  return (
    <BaseMessage message={message}>
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
