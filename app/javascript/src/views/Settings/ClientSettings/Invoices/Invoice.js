import React from "react";
import { Heading, Card, Stack, Box, Text, Avatar } from "@advisable/donut";
import { useParams } from "react-router-dom";
import { useInvoice } from "./queries";
import currency from "src/utilities/currency";
import { DateTime } from "luxon";

export default function Invoice() {
  const { id } = useParams();
  const { loading, data } = useInvoice(id);

  const company = data?.currentCompany;
  const invoice = company?.invoice;
  const payments = invoice?.payments || [];

  if (loading) return <>loading</>;

  const date = DateTime.fromObject({
    year: invoice.year,
    month: invoice.month,
  });

  return (
    <Card padding={8} borderRadius="12px">
      <Box
        display="flex"
        alignItems="flex-start"
        justifyContent="space-between"
        marginBottom={6}
      >
        <Box>
          <Heading mb={2}>{date.toFormat("MMMM yyyy")}</Heading>
          <Text>
            For services throughout the month of {date.toFormat("MMMM yyyy")}
          </Text>
        </Box>

        <Box textAlign="right">
          <Text mb={1} fontSize="lg" fontWeight={550}>
            {company.name}
          </Text>
          <Text lineHeight="20px" fontSize="xs" color="neutral700">
            {company.invoiceCompanyName || company.name}
            {Boolean(company.address?.line1) && (
              <>
                <br />
                {company.address.line1}
              </>
            )}
            {Boolean(company.address?.line2) && (
              <>
                <br />
                {company.address.line2}
              </>
            )}
            {Boolean(company.address?.city) && (
              <>
                <br />
                {company.address.city}
              </>
            )}
            {Boolean(company.address?.state) && (
              <>
                <br />
                {company.address.state}
              </>
            )}
            {Boolean(company.address?.country) && (
              <>
                <br />
                {company.address.country}
              </>
            )}
            {Boolean(company.address?.postcode) && (
              <>
                <br />
                {company.address.postcode}
              </>
            )}
          </Text>
        </Box>
      </Box>

      {payments.length > 0 && (
        <Stack spacing="xl" divider="neutral100">
          <Heading size="2xl" fontWeight={550}>
            Payments
          </Heading>
          {payments.map((payment) => (
            <Box key={payment} display="flex" alignItems="center">
              <Box flexShrink={0} marginRight={3}>
                <Avatar
                  size="xs"
                  name={payment.specialist?.name}
                  url={payment.specialist?.avatar}
                />
              </Box>
              <Box flex={1} minWidth={0} paddingRight={4}>
                <Box display="flex" alignItems="flex-end" mb={1}>
                  <Text fontWeight={500} fontSize="lg" mr={2}>
                    {payment.specialist?.name}
                  </Text>
                  <Text color="neutral500" fontSize="xs">
                    {DateTime.fromISO(payment.createdAt).toFormat(
                      "dd MMM, HH:mm",
                    )}
                  </Text>
                </Box>
                <Text color="neutral700" fontSize="sm" $truncate>
                  {payment.task?.name}
                </Text>
              </Box>
              <Box flexShrink={0}></Box>
              <Box flexShrink={0} textAlign="right" paddingLeft={4}>
                <Text fontSize="lg" fontWeight={500} mb={1}>
                  {currency(payment.amount)}
                </Text>
                <Text fontSize="xs" fontWeight={500} color="neutral600">
                  +{currency(payment.adminFee)} Fee
                </Text>
                {Boolean(payment.deposit) && (
                  <Text
                    fontSize="xs"
                    marginTop={1}
                    fontWeight={500}
                    color="neutral600"
                  >
                    - {currency(payment.deposit)} Deposit
                  </Text>
                )}
              </Box>
            </Box>
          ))}
          <Box textAlign="right">
            <Text mb={1} color="neutral700">
              Total
            </Text>
            <Text fontSize="3xl" fontWeight={600}>
              {currency(invoice.total)}
            </Text>
          </Box>
        </Stack>
      )}
      <Box paddingTop={6}>
        <Text mb={1} fontSize="lg" fontWeight={550}>
          Advisable
        </Text>
        <Text lineHeight="20px" fontSize="xs" color="neutral700">
          Advisable Hyper Mega Net Limited
          <br />
          1 Watermill Lawn
          <br />
          Raheny
          <br />
          Dublin 5
          <br />
          Ireland
          <br />
          VAT: IE3547116BH
        </Text>
      </Box>
    </Card>
  );
}
