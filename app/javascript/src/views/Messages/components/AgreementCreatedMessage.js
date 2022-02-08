import { object, string } from "yup";
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
  Heading,
} from "@advisable/donut";
import { BaseMessage } from "./Message";
import {
  ArrowLeft,
  BadgeCheck,
  Calendar,
  XCircle,
} from "@styled-icons/heroicons-solid";
import { useAcceptAgreement, useDeclineAgreement } from "../queries";
import AgreementDetails from "src/views/NewAgreement/AgreementDetails";
import { useMessagePrompt } from "./MessagePrompt";
import useViewer from "src/hooks/useViewer";
import CircularButton from "src/components/CircularButton";
import { Field, Form, Formik } from "formik";
import SubmitButton from "src/components/SubmitButton";

const declineValidationSchema = object().shape({
  message: string().required(),
});

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
        prefix={<BadgeCheck />}
      >
        Accept
      </Button>
      <Button
        disabled={acceptState.loading}
        size="l"
        variant="secondary"
        onClick={onDecline}
        prefix={<XCircle />}
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
  const viewer = useViewer();
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
      {!viewer.isSpecialist && (
        <Box marginTop={8}>
          <AgreementActions
            agreement={agreement}
            onAccept={onAccept}
            onDecline={onDecline}
          />
        </Box>
      )}
    </>
  );
}

function DeclineAgreement({ agreement, onBack }) {
  const [decline, { loading }] = useDeclineAgreement();
  const { specialist } = agreement;

  const handleSubmit = async (values) => {
    await decline({
      variables: {
        input: {
          agreement: agreement.id,
          message: values.message,
        },
      },
    });
  };

  const initialValues = { message: "" };

  return (
    <>
      <Box position="absolute" left="12px" top="12px">
        <CircularButton onClick={onBack} icon={ArrowLeft} />
      </Box>
      <Heading paddingTop={9} marginBottom={2}>
        Decline request to work together
      </Heading>
      <Text fontSize="l" marginBottom={6}>
        Let {specialist.firstName} know why you are declining their request.
      </Text>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={declineValidationSchema}
        validateOnMount
      >
        <Form>
          <Field
            autoFocus
            as={Textarea}
            minRows={8}
            name="message"
            placeholder="Message..."
            marginBottom={6}
          />
          <SubmitButton
            size="l"
            variant="secondary"
            loading={loading}
            disableUntilValid
          >
            Decline Request
          </SubmitButton>
        </Form>
      </Formik>
    </>
  );
}

function AgreementModal({ agreement, modal }) {
  const [step, setStep] = useState("VIEW");

  if (step === "DECLINE") {
    return (
      <DeclineAgreement agreement={agreement} onBack={() => setStep("VIEW")} />
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
  const viewer = useViewer();
  return (
    <>
      <DialogDisclosure {...modal}>
        {(disclosure) => (
          <Button
            variant={viewer.isClient ? "gradient" : "secondary"}
            {...disclosure}
          >
            {viewer.isClient ? "Review" : "View"}
          </Button>
        )}
      </DialogDisclosure>
      <Modal modal={modal} width={600}>
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
