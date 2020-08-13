import React from "react";
import { useParams } from "react-router";
import { DateTime } from "luxon";
// Components
import { Box, Card, Text, Button, Link, useBreakpoint } from "@advisable/donut";
import { Badge } from "../styles";
import NotFound from "../../../../NotFound";
import Loading from "./Loading";
import { StyledTable, StyledTitle } from "./styles";
// Queries
import { useGetInvoices } from "../queries";

const createTimeFormatter = (timezone) => (iso) =>
  DateTime.fromISO(iso).setZone(timezone).toFormat("d MMMM yyyy");

function Invoice() {
  const timezone = Intl.DateTimeFormat()?.resolvedOptions()?.timeZone;
  const formatTime = createTimeFormatter(timezone);
  const { invoice_id } = useParams();
  const { loading, error, data } = useGetInvoices(invoice_id);
  const isWidescreen = useBreakpoint("sUp");

  if (loading) return <Loading />;
  if (error) return <NotFound />;

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

  const items =
    lineItems &&
    lineItems.map((item) => (
      <StyledTitle key={item.id}>
        <Text as="th" textAlign="left" lineHeight="120%" color="neutral700">
          {item.title}
        </Text>
        {isWidescreen && (
          <Text
            as="th"
            textAlign="right"
            lineHeight="normal"
            fontSize="s"
            color="neutral700"
          >
            {item.quantity} x ${item.unitPrice / 100}
          </Text>
        )}
        <Text
          as="th"
          textAlign="right"
          fontWeight="medium"
          fontSize="s"
          lineHeight="normal"
          color="neutral900"
        >
          ${(item.quantity * item.unitPrice) / 100}
        </Text>
      </StyledTitle>
    ));

  return (
    <Box>
      <Box display="flex" mb="m" fontSize="s">
        <Link to="/settings/invoices/">
          <Text mr="xs" color="neutral400" fontWeight="medium" fontSize="s">
            Invoices
          </Text>
        </Link>
        <Text mr="xs" color="neutral400" fontSize="s">
          &gt;
        </Text>
        <Text color="neutral700" fontWeight="medium" fontSize="s">
          #{number}
        </Text>
      </Box>
      <Card p="24px">
        <Box display="flex" alignItems="flex-start" justifyContent="flex-end">
          <Box mr="auto" mb="l">
            <Text fontSize="xl" color="blue800" mb="xxs" fontWeight="medium">
              {formatTime(createdAt)}
            </Text>
            <Text
              color="neutral500"
              fontWeight="medium"
              fontSize="xs"
              lineHeight="140%"
            >
              #{number}
            </Text>
          </Box>
          <Badge variant={status}>{status}</Badge>
        </Box>
        {(customerName || customerAddress) && (
          <Box mb="l">
            <Text
              color="#252C4D"
              lineHeight="140%"
              fontWeight="medium"
              fontSize="s"
            >
              Billed To
            </Text>
            {customerName && (
              <Text color="neutral700" lineHeight="140%" fontSize="s">
                {customerName}
              </Text>
            )}
            {customerAddress && (
              <>
                <Text color="neutral700" lineHeight="140%" fontSize="s">
                  {customerAddress.line1 || "Ranchview, CA, United States"}
                </Text>
                <Text color="neutral700" lineHeight="140%" fontSize="s">
                  {customerAddress.line2}
                </Text>
              </>
            )}
          </Box>
        )}

        {description && (
          <Box mb="l">
            <Text
              color="#252C4D"
              fontWeight="medium"
              lineHeight="140%"
              fontSize="s"
            >
              Note
            </Text>
            <Text fontSize="s" color="neutral700" lineHeight="140%">
              {description}
            </Text>
          </Box>
        )}

        <Box as={StyledTable} width="100%">
          {isWidescreen ? (
            <colgroup>
              <col span="1" style={{ width: "65%" }} />
              <col span="1" style={{ width: "20%" }} />
              <col span="1" style={{ width: "15%" }} />
            </colgroup>
          ) : (
            <colgroup>
              <col span="1" style={{ width: "90%" }} />
              <col span="1" style={{ width: "10%" }} />
            </colgroup>
          )}
          {isWidescreen && (
            <Box as="thead">
              <tr>
                <Text
                  as="th"
                  textAlign="left"
                  fontWeight="medium"
                  color="#252C4D"
                  fontSize="s"
                >
                  Title
                </Text>
                <Text
                  as="th"
                  textAlign="right"
                  fontWeight="medium"
                  color="#252C4D"
                  fontSize="s"
                >
                  Unit Price
                </Text>
                <Text
                  as="th"
                  textAlign="right"
                  fontSize="s"
                  fontWeight="medium"
                  color="#252C4D"
                >
                  Amount
                </Text>
              </tr>
            </Box>
          )}
          <tbody>{items}</tbody>
          <tfoot>
            <tr>
              {isWidescreen && <th />}
              <Text as="th" textAlign="right" color="neutral700" fontSize="s">
                Amount Due
              </Text>
              <Text
                as="th"
                textAlign="right"
                fontWeight="medium"
                fontSize="17px"
                color="neutral900"
              >
                ${amount / 100}
              </Text>
            </tr>
          </tfoot>
        </Box>
        <Box display="flex" flexDirection={["column", "row"]}>
          {status === "due" && (
            <Link.External href={paymentUrl} notInline>
              <Button mr={[0, "s"]} mb={["xs", 0]} width={[1, "auto"]}>
                Pay Invoice
              </Button>
            </Link.External>
          )}
          <Link.External href={downloadUrl} notInline>
            <Button variant="subtle" width={[1, "auto"]}>
              Download PDF
            </Button>
          </Link.External>
        </Box>
      </Card>
    </Box>
  );
}

export default Invoice;
