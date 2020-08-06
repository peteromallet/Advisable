import React from "react";
import Loading from "../../../../components/Loading";
import PropTypes from "prop-types";
import { Box, Text, Card, Stack, Link as DonutLink } from "@advisable/donut";
import { useInvoices } from "./queries";
import styled from "styled-components";
import { variant } from "styled-system";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";

export const Status = styled.div`
  display: inline;
  padding: 6px 11px 4px;
  border-radius: 18px;
  font-size: 14px;
  ${variant({
    variants: {
      open: { bg: "yellow100", color: "yellow800" },
      due: { bg: "neutral50", color: "neutral500" },
      paid: { bg: "cyan100", color: "cyan800" },
    },
  })};
`;

Status.defaultProps = {
  variant: "open",
};

const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const createTimeFormatter = (timezone) => (iso) =>
  DateTime.fromISO(iso).setZone(timezone).toFormat("d MMMM yyyy");

function Invoices() {
  const timezone = Intl.DateTimeFormat()?.resolvedOptions()?.timeZone;
  const formatTime = createTimeFormatter(timezone);
  const { loading, error, data } = useInvoices();

  if (loading) return <Loading />;

  const invoices = data?.viewer?.invoices.map((i) => {
    return (
      <Link key={i.id} to={`/settings/invoices/${i.id}`}>
        <Card p="24px" pr="26px">
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Box mr="auto">
              <Text color="blue900" fontSize="17px" mb="xxs">
                {formatTime(i.createdAt)}
              </Text>
              <Text color="neutral500">#{i.number}</Text>
            </Box>
            <Status variant={i.status}>{capitalize(i.status)}</Status>
            <Text ml="xs" fontSize="17px" color="neutral900">
              ${i.amount / 100}
            </Text>
          </Box>
        </Card>
      </Link>
    );
  });

  return (
    <Box>
      <Text as="h2" fontSize="xl" color="blue900" mb="m">
        Invoices
      </Text>
      <Stack spacing="xs">{invoices}</Stack>
    </Box>
  );
}

Invoices.propTypes = {};

export default Invoices;
