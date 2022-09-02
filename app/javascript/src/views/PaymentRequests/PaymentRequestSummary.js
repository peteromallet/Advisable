import React, { useMemo } from "react";
import currency from "src/utilities/currency";
import { Text, Link, Circle } from "@advisable/donut";
import PaymentRequestStatus from "./PaymentRequestStatus";
import { DateTime } from "luxon";
import { Calendar, OfficeBuilding, User } from "@styled-icons/heroicons-solid";
import PaymentRequestPastDue from "./PaymentRequestPastDue";

function SourcingFee({ amount = 0, sourcingFee }) {
  if (amount <= 0) return null;

  const earnings = amount - sourcingFee;
  const fee = sourcingFee / amount;

  return (
    <Text marginTop={2} lineHeight="20px">
      You will earn <b>{currency(earnings)}</b> after our{" "}
      <Link.External
        variant="underlined"
        target="_blank"
        href="https://more.advisable.com/faq"
      >
        {fee * 100}% Advisable fee
      </Link.External>
    </Text>
  );
}

function PaymentRequestAttribute({ icon, label, value }) {
  return (
    <div className="flex items-center">
      <div className="shrink-0">
        <Circle size={32} bg="blue100" color="blue900">
          {icon && React.createElement(icon, { size: 16 })}
        </Circle>
      </div>
      <div className="pl-3">
        <span className="mb-1 text-sm text-neutral500">{label}</span>
        <Text $truncate fontSize="sm" fontWeight={520}>
          {value}
        </Text>
      </div>
    </div>
  );
}

export default function PaymentRequestSummary({
  paymentRequest,
  showClientFee,
  showFreelancerFee,
}) {
  const {
    specialist,
    company,
    lineItems,
    amount,
    adminFee = 0,
    createdAt,
    dueAt,
    status,
    sourcingFee,
    memo,
  } = paymentRequest;

  const total = useMemo(() => {
    let result = amount;
    if (showClientFee) result += adminFee;
    return result;
  }, [amount, showClientFee, adminFee]);

  return (
    <div className="pb-8 shrink-0 md:w-[460px]">
      <div className="relative p-8 pb-12 bg-white rounded-lg shadow-2xl">
        <div className="absolute top-5 right-5">
          <PaymentRequestStatus status={status} />
        </div>

        <h4 className="mb-8 text-2xl font-medium tracking-tight">Summary</h4>

        <div className="grid grid-cols-2 gap-x-3 gap-y-7">
          <PaymentRequestAttribute
            label="Billed to"
            icon={OfficeBuilding}
            value={company?.name || "-"}
          />
          <PaymentRequestAttribute
            icon={User}
            label="From"
            value={specialist?.name || "-"}
          />
          <PaymentRequestAttribute
            label="Issued"
            icon={Calendar}
            value={DateTime.fromISO(createdAt).toFormat("dd MMM yyyy")}
          />
          <PaymentRequestAttribute
            label="Due"
            icon={Calendar}
            value={DateTime.fromISO(dueAt).toFormat("dd MMM yyyy")}
          />
        </div>

        <div className="divide-y divide-solid divide-neutral100">
          <h5 className="mt-10 mb-2 text-lg font-medium">Items</h5>
          {lineItems.map((lineItem, index) => (
            <div key={index} className="flex justify-between py-4">
              <span className="text-neutral800">{lineItem.description}</span>
              <span className="text-lg font-semibold">
                {currency(lineItem.amount)}
              </span>
            </div>
          ))}

          {showClientFee && paymentRequest.adminFee && (
            <div className="flex justify-between py-4">
              <div>
                <div className="mb-1 text-neutral800">5% Advisable fee</div>
                <Link.External fontSize="s" variant="underlined">
                  Read more
                </Link.External>
              </div>
              <div className="text-lg font-medium">
                {currency(paymentRequest.adminFee, { format: "$0,0.00" })}
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4">
            <div className="text-lg neutral800">Total</div>
            <div className="text-right">
              <div className="text-3xl font-semibold tracking-tight">
                {currency(total, { format: "$0,0.00" })}
              </div>
              {showClientFee && company?.applyVat && (
                <div className="mt-2 text-neutral700 w-[200px]">
                  VAT not included in summary
                </div>
              )}
              {showFreelancerFee && (
                <div className="w-[200px]">
                  <SourcingFee amount={amount} sourcingFee={sourcingFee} />
                </div>
              )}
            </div>
          </div>
        </div>

        {memo ? (
          <div>
            <h5 className="mt-10 mb-2 text-lg font-medium">Note</h5>
            <p className="leading-relaxed text-md text-neutral700">{memo}</p>
          </div>
        ) : null}

        <PaymentRequestPastDue paymentRequest={paymentRequest} />
      </div>
    </div>
  );
}
