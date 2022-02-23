import React, { useMemo } from "react";
import currency from "src/utilities/currency";
import { Text, Link, Circle } from "@advisable/donut";
import PaymentRequestStatus from "./PaymentRequestStatus";
import { DateTime } from "luxon";
import { Calendar, OfficeBuilding, User } from "@styled-icons/heroicons-solid";

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
        href="https://www.advisable.com/faq"
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
    <div className="md:w-[460px] shrink-0 pb-8">
      <div className="bg-white p-8 rounded-lg pb-12 relative shadow-2xl">
        <div className="absolute right-5 top-5">
          <PaymentRequestStatus status={status} />
        </div>

        <h4 className="text-2xl font-medium tracking-tight mb-8">Summary</h4>

        <div className="grid grid-cols-2 gap-y-7 gap-x-3">
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
          <h5 className="font-medium text-lg mt-10 mb-2">Items</h5>
          {lineItems.map((lineItem, index) => (
            <div key={index} className="flex justify-between py-4">
              <span className="text-neutral800">{lineItem.description}</span>
              <span className="font-semibold text-lg">
                {currency(lineItem.amount)}
              </span>
            </div>
          ))}

          {showClientFee && paymentRequest.adminFee && (
            <div className="flex justify-between py-4">
              <div>
                <div className="text-neutral800 mb-1">5% Advisable fee</div>
                <Link.External fontSize="s" variant="underlined">
                  Read more
                </Link.External>
              </div>
              <div className="font-medium text-lg">
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
            <h5 className="font-medium text-lg mt-10 mb-2">Note</h5>
            <p className="text-md leading-relaxed text-neutral700">{memo}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
