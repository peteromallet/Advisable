import React from "react";
import { Box, Text } from "@advisable/donut";
import PaymentRequestStatus from "./PaymentRequestStatus";
import useViewer from "src/hooks/useViewer";
import {
  CheckCircle,
  CreditCard,
  Exclamation,
  XCircle,
} from "@styled-icons/heroicons-solid";
import ApprovePaymentRequest from "./ApprovePaymentRequest";
import CapturePayment from "./CapturePayment";
import CancelPaymentRequest from "./CancelPaymentRequest";
import DownloadInvoice from "./DownloadInvoice";

function Summary({ status, children, icon }) {
  return (
    <Box display="flex" width="100%">
      {icon && (
        <Box flexShrink={0} color="neutral500" marginRight={4}>
          {React.cloneElement(icon, { size: 28 })}
        </Box>
      )}
      <Box flex={1}>
        <PaymentRequestStatus status={status} />
        <Text marginTop={3} fontSize="l" lineHeight="24px">
          {children}
        </Text>
      </Box>
    </Box>
  );
}

export default function PaymentRequestStatusSummary({ paymentRequest }) {
  const viewer = useViewer();
  const { payment, company, specialist, status } = paymentRequest;

  if (status === "pending") {
    return (
      <Summary status={status} icon={<CreditCard />}>
        {viewer.isSpecialist ? (
          <>
            This request is awaiting payment from {company.name}. Once paid, the
            funds will be immediately released to you.
            <Box paddingTop={4}>
              <CancelPaymentRequest paymentRequest={paymentRequest} />
            </Box>
          </>
        ) : (
          <>
            This request is awaiting payment from {company.name}. Once paid the
            funds will be released immediately to {specialist.name}.
            <Box paddingTop={6}>
              <ApprovePaymentRequest paymentRequest={paymentRequest} />
            </Box>
          </>
        )}
      </Summary>
    );
  }

  if (status === "approved") {
    return (
      <Summary status={status} icon={<CreditCard />}>
        {viewer.isSpecialist ? (
          <>
            This request has been approved by {company.name} and we are waiting
            to receive their payment. Once we have received the payment, the
            funds will be released to you immediately.
          </>
        ) : (
          <CapturePayment paymentRequest={paymentRequest} />
        )}
      </Summary>
    );
  }

  if (status === "past_due") {
    return (
      <Summary status={status} icon={<CreditCard />}>
        {viewer.isSpecialist ? (
          <>
            This payment request is past due. We have reached out to{" "}
            {company.name} to collect payment. Once we have received the
            payment, the funds will be released to you immediately.
          </>
        ) : (
          <>
            This request is awaiting payment from {company.name}. Once paid the
            funds will be released immediately to {specialist.name}.
          </>
        )}
      </Summary>
    );
  }

  if (status === "disputed") {
    return (
      <Summary status={status} icon={<Exclamation />}>
        {viewer.isSpecialist ? (
          <>
            This request was disputed by {company.name} and can no longer be
            paid. You should have received an email from us to resolve this. You
            can cancel this request and send them another one if required.
            <Box paddingTop={4}>
              <CancelPaymentRequest paymentRequest={paymentRequest} />
            </Box>
          </>
        ) : (
          <>
            This request was disputed by {company.name} and can no longer be
            paid. We have have reached out to {specialist.name} to resolve the
            dispute. If further payment is required, they will be able to send
            an additional payment request.
          </>
        )}
      </Summary>
    );
  }

  if (status === "paid") {
    return (
      <Summary status={status} icon={<CheckCircle />}>
        This request has been paid by {company.name}.
        {viewer.isClient && (
          <Box paddingTop={4}>
            <DownloadInvoice payment={payment} />
          </Box>
        )}
      </Summary>
    );
  }

  if (status === "canceled") {
    return (
      <Summary status={status} icon={<XCircle />}>
        This request has been canceled by {specialist.name} and can no longer be
        paid.
      </Summary>
    );
  }

  if (status === "paid_out") {
    return (
      <Summary status={status} icon={<CheckCircle />}>
        {viewer.isSpecialist ? (
          <>
            This request has been paid by {company.name} and transferred to your
            account. You should receive the funds within 3 working days.
          </>
        ) : (
          <>
            This request has been paid by {company.name} and has been
            transferred to {specialist.name}.
          </>
        )}
      </Summary>
    );
  }

  return null;
}
