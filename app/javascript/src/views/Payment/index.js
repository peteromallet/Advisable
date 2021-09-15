import React from "react";
import { Container, Card, Box, Stack, Text, Heading } from "@advisable/donut";
import { usePayment } from "./queries";
import currency from "src/utilities/currency";
import Loading from "src/components/Loading";
import PaymentSuccessful from "./components/PaymentSuccessful";
import PassportAvatar from "src/components/PassportAvatar";
import PaymentPending from "./components/PaymentPending";
import NotFound, { isNotFound } from "../NotFound";
import AccessDenied, { isNotAuthorized } from "../AccessDenied";

export default function Payment() {
  const { data, loading, error } = usePayment();

  if (loading) return <Loading />;

  if (isNotAuthorized(error)) {
    return <AccessDenied />;
  }

  if (isNotFound(error)) {
    return <NotFound />;
  }

  const payment = data?.payment;

  return (
    <Container maxWidth="600px" paddingY={12}>
      <Card padding={8} borderRadius="12px">
        <Box textAlign="center">
          <PassportAvatar
            size="lg"
            marginX="auto"
            marginBottom={3}
            name={data.payment.specialist.name}
            src={data.payment.specialist.avatar}
          />
          <Heading size="2xl" fontWeight={550} marginBottom={2}>
            {data.payment.specialist.name}
          </Heading>
          <Text
            fontWeight={450}
            color="neutral700"
            letterSpacing="-0.02rem"
            lineHeight="20px"
          >
            {data.payment.task?.name}
          </Text>
        </Box>
        <Box marginY={6} padding={5} borderRadius="10px" bg="neutral100">
          <Text fontSize="lg" fontWeight={500} marginBottom={4}>
            Payment Summary
          </Text>
          <Stack divider="neutral200" spacing="lg">
            <Box display="flex" alignItems="center">
              <Box flex={1}>
                <Text fontSize="sm">
                  Payment for {data.payment.specialist.name}
                </Text>
              </Box>
              <Text fontWeight={500}>{currency(data.payment.amount)}</Text>
            </Box>
            <Box display="flex" alignItems="center">
              <Box flex={1}>
                <Text fontSize="sm">Admin Fee</Text>
              </Box>
              <Text fontWeight={500}>{currency(data.payment.adminFee)}</Text>
            </Box>
            <Box display="flex" alignItems="center">
              <Box flex={1}>
                <Text fontSize="sm">Total</Text>
              </Box>

              <Text fontSize="xl" fontWeight={500}>
                {currency(data.payment.amount + data.payment.adminFee)}
              </Text>
            </Box>
          </Stack>
        </Box>
        {payment?.status === "succeeded" ? (
          <PaymentSuccessful />
        ) : (
          <PaymentPending payment={payment} />
        )}
      </Card>
    </Container>
  );
}
