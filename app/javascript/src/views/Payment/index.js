import React from "react";
import { Container, Card, Box, Stack, Avatar, Text } from "@advisable/donut";
import { usePayment } from "./queries";
import currency from "src/utilities/currency";
import PaymentSuccessful from "./PaymentSuccessful";
import HandlePayment from "./HandlePayment";

export default function Payment() {
  const { data, loading } = usePayment();

  if (loading) return <>loading...</>;

  const payment = data?.payment;

  return (
    <Container maxWidth="600px" paddingY={12}>
      <Card padding={8} borderRadius="12px">
        <Box textAlign="center">
          <Avatar
            size="l"
            marginBottom={3}
            name={data.payment.specialist.name}
            url={data.payment.specialist.avatar}
          />
          <Text fontSize="xl" fontWeight={500} marginBottom={2}>
            {data.payment.specialist.name}
          </Text>
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
          <HandlePayment payment={payment} />
        )}
      </Card>
    </Container>
  );
}
