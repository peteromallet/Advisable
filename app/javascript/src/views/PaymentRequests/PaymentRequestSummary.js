import React, { useMemo } from "react";
import currency from "src/utilities/currency";
import { Box, Stack, Text, Link, Circle } from "@advisable/donut";
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
    <Box display="flex" alignItems="center">
      <Box flexShrink={0}>
        <Circle size={32} bg="blue100" color="blue900">
          {icon && React.createElement(icon, { size: 16 })}
        </Circle>
      </Box>
      <Box paddingLeft={3}>
        <Text marginBottom={1} fontSize="sm" color="neutral500">
          {label}
        </Text>
        <Text $truncate fontSize="sm" fontWeight={520}>
          {value}
        </Text>
      </Box>
    </Box>
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
    <Box
      bg="white"
      padding={8}
      borderRadius="24px"
      paddingBottom={12}
      position="relative"
      boxShadow="rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px"
    >
      <Box position="absolute" right="20px" top="20px">
        <PaymentRequestStatus status={status} />
      </Box>

      <Text
        fontSize="3xl"
        fontWeight={520}
        letterSpacing="-0.02em"
        marginBottom={8}
      >
        Summary
      </Text>

      <Box
        display="grid"
        gridTemplateColumns="1fr 1fr"
        style={{ rowGap: "28px", columnGap: "12px" }}
      >
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
      </Box>

      <Stack spacing={8} divider="neutral100">
        <Text fontWeight={560} fontSize="lg" marginTop={10}>
          Items
        </Text>
        {lineItems.map((lineItem, index) => (
          <Box key={index} display="flex" justifyContent="space-between">
            <Text color="neutral800">{lineItem.description}</Text>
            <Text fontWeight={560} fontSize="l">
              {currency(lineItem.amount)}
            </Text>
          </Box>
        ))}

        {showClientFee && paymentRequest.adminFee && (
          <Box display="flex" justifyContent="space-between">
            <Box>
              <Text color="neutral800" marginBottom={1}>
                5% Advisable fee
              </Text>
              <Link.External fontSize="s" variant="underlined">
                Read more
              </Link.External>
            </Box>
            <Text fontWeight={560} fontSize="l">
              {currency(paymentRequest.adminFee, { format: "$0,0.00" })}
            </Text>
          </Box>
        )}

        <Box display="flex" justifyContent="space-between">
          <Text fontSize="lg" color="neutral800">
            Total
          </Text>
          <Box textAlign="right">
            <Text fontSize="5xl" fontWeight={600}>
              {currency(total, { format: "$0,0.00" })}
            </Text>
            {showFreelancerFee && (
              <Box width="200px">
                <SourcingFee amount={amount} sourcingFee={sourcingFee} />
              </Box>
            )}
          </Box>
        </Box>
      </Stack>

      {memo ? (
        <Box paddingTop={10}>
          <Text fontSize="lg" marginBottom={2} fontWeight={520}>
            Note
          </Text>
          <Text fontSize="s" lineHeight="20px" color="neutral700">
            {memo}
          </Text>
        </Box>
      ) : null}
    </Box>
  );
}
