import { object, string } from "yup";
import React, { useMemo, useState, useEffect } from "react";
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
import {
  useAcceptAgreement,
  useDeclineAgreement,
  useSetupPaymentsData,
  useUpdateInvoiceSettings,
} from "../queries";
import AgreementDetails from "src/views/NewAgreement/AgreementDetails";
import { useMessagePrompt } from "./MessagePrompt";
import useViewer from "src/hooks/useViewer";
import CircularButton from "src/components/CircularButton";
import { Field, Form, Formik } from "formik";
import SubmitButton from "src/components/SubmitButton";
import css from "@styled-system/css";
import { Loading } from "src/components";
import InvoiceSettingsFields from "src/components/InvoiceSettingsFields";
import { trackEvent } from "src/utilities/segment";

const declineValidationSchema = object().shape({
  message: string().required(),
});

function AgreementPending({ agreement, onAccept, setStep }) {
  const [accept, acceptState] = useAcceptAgreement();

  const handleAccept = async () => {
    const response = await accept({
      variables: {
        input: {
          agreement: agreement.id,
        },
      },
    });

    trackEvent("Hired Freelancer", {
      agreement: agreement.id,
    });

    const errorCode = response.errors?.[0]?.extensions?.code;

    if (errorCode === "PAYMENTS_NOT_SETUP") {
      setStep("SETUP_PAYMENTS");
      return;
    }

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
        onClick={() => setStep("DECLINE")}
        prefix={<XCircle />}
      >
        Decline
      </Button>
    </Box>
  );
}

function AgreementActions({ agreement, onAccept, setStep }) {
  if (agreement.status === "pending") {
    return (
      <AgreementPending
        agreement={agreement}
        onAccept={onAccept}
        setStep={setStep}
      />
    );
  }

  return null;
}

function Agreement({ agreement, onAccept, setStep }) {
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
            setStep={setStep}
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

const addressSchema = object().shape({
  line1: string().required("Please provide your company address"),
  city: string().required("Please provide your company address"),
  state: string().required("Please provide your company address"),
  country: string().required("Please provide your company address"),
});

const invoicingValidationSchema = object().shape({
  name: string().required("Please provide your full name"),
  companyName: string().required("Please provide a company name"),
  billingEmail: string().required("Please provide a billing email"),
  address: addressSchema,
});

function SetupPayments({ agreement, onSuccess }) {
  const { data, loading } = useSetupPaymentsData();
  const [updateInvoiceSettings] = useUpdateInvoiceSettings();
  const [accept] = useAcceptAgreement();

  if (loading) return <Loading />;
  const { viewer, currentCompany } = data;
  const { invoiceSettings } = currentCompany;

  const initialValues = {
    name: invoiceSettings?.name || viewer.name || "",
    companyName: invoiceSettings?.companyName || currentCompany?.name || "",
    billingEmail: invoiceSettings.email || viewer.email || "",
    address: {
      line1: invoiceSettings?.address?.line1 || "",
      line2: invoiceSettings?.address?.line2 || "",
      city: invoiceSettings?.address?.city || "",
      state: invoiceSettings?.address?.state || "",
      country: invoiceSettings?.address?.country || "",
      postcode: invoiceSettings?.address?.postcode || "",
    },
    vatNumber: invoiceSettings?.vatNumber || "",
  };

  const handleSubmit = async (values) => {
    await updateInvoiceSettings({
      variables: {
        input: values,
      },
    });

    await accept({
      variables: {
        input: {
          agreement: agreement.id,
        },
      },
    });

    onSuccess();
  };

  return (
    <>
      <Heading marginBottom={2}>Setup billing</Heading>
      <Text fontSize="l" marginBottom={6} lineHeight="24px">
        Please provide your company information in order to setup future
        invoicing. Credit card input will be requested when receiving the first
        payment request from {agreement.specialist.firstName}.
      </Text>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={invoicingValidationSchema}
      >
        {(formik) => (
          <Form>
            <InvoiceSettingsFields formik={formik} />
            <Box py={5}>
              <SubmitButton
                variant="gradient"
                width="100%"
                size="l"
                disableUntilValid
              >
                Save & Accept
              </SubmitButton>
            </Box>
            <Text fontSize="s" lineHeight="20px" textAlign="center">
              You will not be charged anything until{" "}
              {agreement.specialist.firstName} requests payment from you.
            </Text>
          </Form>
        )}
      </Formik>
    </>
  );
}

function AgreementModal({ agreement, modal }) {
  const [step, setStep] = useState("VIEW");

  useEffect(() => {
    if (!modal.visible) {
      setStep("VIEW");
    }
  }, [modal]);

  return (
    <Modal modal={modal} width={600}>
      {step === "DECLINE" && (
        <DeclineAgreement
          agreement={agreement}
          onBack={() => setStep("VIEW")}
        />
      )}
      {step === "VIEW" && (
        <Agreement
          agreement={agreement}
          onAccept={modal.hide}
          setStep={setStep}
        />
      )}

      {step === "SETUP_PAYMENTS" && (
        <SetupPayments agreement={agreement} onSuccess={modal.hide} />
      )}
    </Modal>
  );
}

export default function AgreementCreatedMessage({ message }) {
  const modal = useModal();
  const viewer = useViewer();
  const sender = message.agreement?.specialist?.firstName;
  const { show, dismiss, highlight } = useMessagePrompt(
    message,
    "New request to work together",
  );
  const isPending = useMemo(
    () => message.agreement?.status === "pending",
    [message],
  );

  useEffect(() => {
    if (isPending) {
      show();
    } else {
      dismiss();
    }
  }, [show, dismiss, isPending]);

  return (
    <BaseMessage message={message} highlight={highlight}>
      <Box
        padding={4}
        borderRadius="20px"
        border="2px solid"
        display="flex"
        alignItems="center"
        onClick={modal.show}
        css={css({
          cursor: "pointer",
          borderColor: "neutral300",
          "&:hover": {
            borderColor: "neutral400",
          },
        })}
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
        <DialogDisclosure {...modal}>
          {(disclosure) => (
            <Button
              variant={viewer.isClient && isPending ? "gradient" : "secondary"}
              {...disclosure}
            >
              {viewer.isClient ? "Review" : "View"}
            </Button>
          )}
        </DialogDisclosure>
      </Box>
      <AgreementModal agreement={message.agreement} modal={modal} />
    </BaseMessage>
  );
}
