import React from "react";
import { Box, Stack, Text } from "@advisable/donut";

function Row({ children }) {
  return (
    <Box
      alignItems="center"
      justifyContent="space-between"
      display={{ _: null, m: "flex" }}
    >
      {children}
    </Box>
  );
}

function Label({ children }) {
  return (
    <Box width="200px">
      <Text textTransform="uppercase" fontSize="12px" fontWeight={500}>
        {children}
      </Text>
    </Box>
  );
}

function Value({ children }) {
  return (
    <Box paddingTop={{ _: 0.5, m: null }}>
      <Text
        fontSize="sm"
        lineHeight="20px"
        color="neutral700"
        textAlign={{ _: null, m: "right" }}
      >
        {children}
      </Text>
    </Box>
  );
}

export default function BankTransferPending({ payment }) {
  return (
    <>
      <Text lineHeight="24px">
        Please send the total amount listed above via bank transfer using one of
        the details below.
      </Text>
      <Stack spacing={6} divider="neutral100">
        <Text fontSize="xl" fontWeight={500} mb={1} marginTop={12}>
          EUR bank transfers
        </Text>
        <Row>
          <Label>Reference number:</Label>
          <Value>{payment.id}</Value>
        </Row>
        <Row>
          <Label>Account name:</Label>
          <Value>Hyper Mega Net</Value>
        </Row>
        <Row>
          <Label>BIC Number</Label>
          <Value>CPAYIE2D</Value>
        </Row>
        <Row>
          <Label>IBAN</Label>
          <Value>IE40 CPAY 9911 9900 7566 69</Value>
        </Row>
      </Stack>

      <Stack spacing={6} divider="neutral100">
        <Text fontSize="xl" fontWeight={500} mb={1} marginTop={12}>
          USD bank transfers
        </Text>
        <Row>
          <Label>Reference number:</Label>
          <Value>{payment.id}</Value>
        </Row>
        <Row>
          <Label>Account holder:</Label>
          <Value>TransferWise FBO Advisable Hyper Mega Net Limited</Value>
        </Row>
        <Row>
          <Label>Account number:</Label>
          <Value>8310111553</Value>
        </Row>
        <Row>
          <Label>Wire routing number:</Label>
          <Value>026073008</Value>
        </Row>
        <Row>
          <Label>ACH routing number</Label>
          <Value>026073150</Value>
        </Row>
        <Row>
          <Label>Bank code</Label>
          <Value>CMFGUS33</Value>
        </Row>
        <Row>
          <Label>Address</Label>
          <Value>
            TransferWise, 19 W 24th Street, New York, 10010, United States
          </Value>
        </Row>
      </Stack>

      <Stack spacing={6} divider="neutral100">
        <Text fontSize="xl" fontWeight={500} mb={1} marginTop={12}>
          GBP bank transfers
        </Text>
        <Row>
          <Label>Reference number:</Label>
          <Value>{payment.id}</Value>
        </Row>
        <Row>
          <Label>Account name:</Label>
          <Value>Advisable Hyper Mega Net Limited</Value>
        </Row>
        <Row>
          <Label>Account number:</Label>
          <Value>68022542</Value>
        </Row>
        <Row>
          <Label>Sort code:</Label>
          <Value>232221</Value>
        </Row>
      </Stack>
    </>
  );
}
