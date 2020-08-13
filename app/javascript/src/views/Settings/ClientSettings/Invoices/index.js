import React from "react";
import { DateTime } from "luxon";
import { Link } from "react-router-dom";
// Components
import { Box, Text, Card, Stack } from "@advisable/donut";
import NotFound from "../../../NotFound";
import { Badge } from "./styles";
import Loading from "./Loading";
// Queries
import { useInvoices, GET_INVOICE } from "./queries";

const createTimeFormatter = (timezone) => (iso) =>
  DateTime.fromISO(iso).setZone(timezone).toFormat("d MMMM yyyy");

function Invoices() {
  const timezone = Intl.DateTimeFormat()?.resolvedOptions()?.timeZone;
  const formatTime = createTimeFormatter(timezone);
  const { loading, error, data, client } = useInvoices();

  if (loading) return <Loading />;
  if (error) return <NotFound />;

  const invoices = data?.viewer?.invoices.map((i) => {
    return (
      <Link key={i.id} to={`/settings/invoices/${i.id}`}>
        <Card
          p="24px"
          pr="26px"
          onMouseOver={() =>
            client.query({
              query: GET_INVOICE,
              variables: { id: i.id },
            })
          }
        >
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Box mr="auto">
              <Text
                color="blue900"
                fontSize="17px"
                mb="xxs"
                fontWeight="medium"
              >
                {formatTime(i.createdAt)}
              </Text>
              <Text color="neutral500" fontWeight="medium" fontSize="xs">
                #{i.number}
              </Text>
            </Box>
            <Badge variant={i.status}>{i.status}</Badge>
            <Text
              ml={["xs", "s"]}
              fontSize="17px"
              color="neutral900"
              fontWeight="medium"
            >
              ${i.amount / 100}
            </Text>
          </Box>
        </Card>
      </Link>
    );
  });

  return (
    <Box>
      {invoices.length ? (
        <>
          <Text
            as="h2"
            fontSize="xl"
            color="blue900"
            mb="m"
            fontWeight="medium"
          >
            Invoices
          </Text>
          <Stack spacing="xs">{invoices}</Stack>
        </>
      ) : (
        <>
          <Text
            fontSize="xxxl"
            fontWeight="semibold"
            color="blue900"
            lineHeight="normal"
            mb="xxs"
          >
            You have no invoices yet
          </Text>
          <Text color="blue900" lineHeight="21px">
            Invoices will appear here once a specialist sends it to you.
          </Text>
        </>
      )}
    </Box>
  );
}

Invoices.propTypes = {};

export default Invoices;
