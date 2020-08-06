import React from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router";
import { Box, Card, Text, Button, Link } from "@advisable/donut";
import { useGetInvoices } from "../queries";
import Loading from "../../../../../components/Loading";
import { DateTime } from "luxon";

const createTimeFormatter = (timezone) => (iso) =>
  DateTime.fromISO(iso).setZone(timezone).toFormat("d MMMM yyyy");

function Invoice() {
  const timezone = Intl.DateTimeFormat()?.resolvedOptions()?.timeZone;
  const formatTime = createTimeFormatter(timezone);
  const { invoice_id } = useParams();
  const { loading, error, data } = useGetInvoices(invoice_id);

  if (loading) return <Loading />;

  const {
    amount,
    createdAt,
    customerAddress,
    customerName,
    description,
    downloadUrl,
    lineItems,
    number,
    paymentUrl,
    status,
  } = data?.invoice;

  console.log("invoice", data);

  const items =
    lineItems &&
    lineItems.map((item) => (
      <tr key={item.id}>
        <Text as="th" textAlign="left" p="m">
          {item.title}
        </Text>
        <Text as="th" textAlign="right" p="m">
          {item.quantity} x ${item.unitPrice / 100}
        </Text>
        <Text as="th" textAlign="right" p="m">
          ${(item.quantity * item.unitPrice) / 100}
        </Text>
      </tr>
    ));

  return (
    <Box>
      <Box display="flex" mb="m">
        <Link to="/settings/invoices/">
          <Text mr="xs">Invoices</Text>
        </Link>
        <Text mr="xs">&gt;</Text>
        <Text>#{number}</Text>
      </Box>
      <Card p="24px">
        <Box display="flex" alignItems="center" justifyContent="flex-end">
          <Box mr="auto" mb="l">
            <Text>{formatTime(createdAt)}</Text>
            <Text>#{number}</Text>
          </Box>
          <Text>{status}</Text>
        </Box>
        <Box mb="l">
          <Text>Billed To</Text>
          <Text>{customerName}</Text>
          {customerAddress && (
            <>
              <Text>{customerAddress.line1}</Text>
              <Text>{customerAddress.line2}</Text>
            </>
          )}
        </Box>
        <Box mb="l">
          <Text>Note</Text>
          <Text>{description}</Text>
        </Box>

        <Box as="table" width="100%">
          <colgroup>
            <col span="1" style={{ width: "65%" }} />
            <col span="1" style={{ width: "20%" }} />
            <col span="1" style={{ width: "15%" }} />
          </colgroup>
          <Box as="thead">
            <tr>
              <Text as="th" textAlign="left" p="m">
                Title
              </Text>
              <Text as="th" textAlign="right" p="m">
                Unit Price
              </Text>
              <Text as="th" textAlign="right" p="m">
                Amount
              </Text>
            </tr>
          </Box>
          <tbody>{items}</tbody>
          <tfoot>
            <tr>
              <th />
              <Text as="th" textAlign="right" p="m">
                Amount Due
              </Text>
              <Text as="th" textAlign="right" p="m">
                ${amount / 100}
              </Text>
            </tr>
          </tfoot>
        </Box>
        <Box>
          {status === "due" && (
            <Link.External href={paymentUrl}>
              <Button mr="s">Pay Invoice</Button>
            </Link.External>
          )}
          <Link.External href={downloadUrl}>
            <Button variant="subtle">Download PDF</Button>
          </Link.External>
        </Box>
      </Card>
    </Box>
  );
}

Invoice.propTypes = {};

export default Invoice;
