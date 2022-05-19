import React from "react";
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
    <div className="flex w-full">
      {icon && (
        <div className="shrink-0 text-neutral500 mr-4">
          {React.cloneElement(icon, { size: 28 })}
        </div>
      )}
      <div className="flex-1">
        <PaymentRequestStatus status={status} />
        <div className="mt-3 text-lg">{children}</div>
      </div>
    </div>
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
            This request is awaiting payment from {company.name}. Once we have
            received the payment, the funds will be released to you on our next
            weekly payout, which is done on Tuesdays.
            <div className="pt-4">
              <CancelPaymentRequest paymentRequest={paymentRequest} />
            </div>
          </>
        ) : (
          <>
            This request is awaiting payment from {company.name}. Once paid the
            funds will be released to {specialist.name}.
            <div className="pt-6">
              <ApprovePaymentRequest paymentRequest={paymentRequest} />
            </div>
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
            funds will be released to you on our next weekly payout, which is
            done on Tuesdays.
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
            payment, the funds will be released to you on our next weekly
            payout, which is done on Tuesdays.
          </>
        ) : (
          <>
            <div className="mb-6">
              This request is awaiting payment from {company.name}. Once paid
              the funds will be released immediately to {specialist.name}.
            </div>
            <ApprovePaymentRequest paymentRequest={paymentRequest} />
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
            <div className="pt-4">
              <CancelPaymentRequest paymentRequest={paymentRequest} />
            </div>
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
        {viewer.isSpecialist ? (
          <>
            This request has been paid by {company.name}. We have received the
            funds and they will be transferred out to your account on our next
            weekly payout, which is done on Tuesdays.
          </>
        ) : (
          <>
            This payment request has been paid. We have received the funds and
            they will be transferred out to {specialist.name} on our next weekly
            payout.
            <div className="pt-4">
              <DownloadInvoice payment={payment} />
            </div>
          </>
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
            This request has been paid by {company.name}. We have transferred
            the funds to your account and you should receive them within 3
            working days.
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
