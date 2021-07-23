import React from "react";
import { DateTime } from "luxon";
import css from "@styled-system/css";
import { Badge, Box, Text } from "@advisable/donut";
import { ChevronRight } from "@styled-icons/heroicons-solid/ChevronRight";
import currency from "src/utilities/currency";
import { Link } from "react-router-dom";

export default function InvoiceSummary({ invoice }) {
  const date = DateTime.fromObject({
    year: invoice.year,
    month: invoice.month,
  });

  return (
    <Box
      as={Link}
      to={`/settings/invoices/${invoice.id}`}
      height="58px"
      display="flex"
      borderRadius="12px"
      alignItems="center"
      paddingX={4}
      marginX="-16px"
      justifyContent="space-between"
      color="neutral900"
      css={css({
        cursor: "pointer",
        "&:hover": {
          bg: "neutral50",
        },
      })}
    >
      <Text fontWeight={500} fontSize="lg">
        {date.toFormat("MMMM yyyy")}
      </Text>
      <Box display="flex" alignItems="center">
        <Badge variant="cyan" marginRight={3}>
          Paid
        </Badge>
        <Text fontSize="lg" fontWeight={500} marginX={1}>
          {currency(invoice.total)}
        </Text>
        <Box color="neutral500">
          <ChevronRight size={20} />
        </Box>
      </Box>
    </Box>
  );
}
