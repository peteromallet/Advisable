import React from "react";
import { Badge, Box, Circle, Text } from "@advisable/donut";
import { Download } from "@styled-icons/heroicons-solid";

function DownloadInvoice({ url }) {
  return (
    <Box
      display="flex"
      padding={4}
      border="2px solid"
      alignItems="center"
      borderRadius="24px"
      borderColor="neutral100"
    >
      <Circle size={40} bg="blue100" marginRight={4} color="blue900">
        <Download size={20} />
      </Circle>
      <Box fontWeight={520}>Download Invoice</Box>
    </Box>
  );
}

export default function PaymentRequestPaid({ paymentRequest }) {
  return (
    <>
      <Box
        padding={4}
        border="2px solid"
        alignItems="center"
        borderRadius="24px"
        borderColor="neutral100"
      >
        <Badge marginBottom={3}>Paid</Badge>
        <Text>This payment request has been paid</Text>
      </Box>
      <DownloadInvoice url={paymentRequest.payment.pdfUrl} />
    </>
  );
}
