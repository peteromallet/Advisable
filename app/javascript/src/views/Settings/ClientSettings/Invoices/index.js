import React from "react";
import { Link } from "react-router-dom";
// Components
import { Box, Text, Stack, theme, StyledCard } from "@advisable/donut";
import NotFound from "../../../NotFound";
import { Badge } from "./styles";
import Loading from "./Loading";
// Queries
import { useInvoices, GET_INVOICE } from "./queries";
import styled from "styled-components";
import { rgba } from "polished";
import Breadcrumbs from "./Breadcrumbs";
import isoToLocalFormat from "../../../../utilities/isoToLocalFormat";

const StyledInvoiceCard = styled(StyledCard)`
  transition: box-shadow 0.3s, transform 0.2s;
  box-shadow: 0px 2px 10px -4px ${rgba(theme.colors.blue900, 0.12)};
  padding: 24px 26px 24px 24px;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0px 2px 13px -3px ${rgba(theme.colors.blue900, 0.24)};
  }
`;

function Invoices() {
  const formatTime = isoToLocalFormat("d MMMM yyyy");
  const { loading, error, data, client } = useInvoices();

  if (loading) return <Loading />;
  if (error) return <NotFound />;

  const invoices = data?.viewer?.invoices.map((i) => {
    return (
      <StyledInvoiceCard
        as={Link}
        key={i.id}
        to={`/settings/invoices/${i.id}`}
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
            <Text color="blue900" fontSize="17px" mb="xxs" fontWeight="medium">
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
      </StyledInvoiceCard>
    );
  });

  return (
    <Box>
      {invoices.length ? (
        <>
          <Breadcrumbs />
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
            Invoices will appear here once a specialist sent it to you.
          </Text>
        </>
      )}
    </Box>
  );
}

Invoices.propTypes = {};

export default Invoices;
