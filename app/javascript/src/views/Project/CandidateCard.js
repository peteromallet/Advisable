import React from "react";
import { rgba } from "polished";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { StyledCard, Text, Box, Avatar, theme } from "@advisable/donut";
import currency from "../../utilities/currency";
import ApplicationStatus from "./ApplicationStatus";

const Card = styled(StyledCard)`
  height: 440px;
  padding: 32px;
  border-radius: 12px;
  box-shadow: 0px 4px 12px -4px ${rgba(theme.colors.neutral900, 0.04)},
    0px 4px 20px -4px ${rgba(theme.colors.neutral900, 0.08)};

  transition: box-shadow 300ms, transform 200ms;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0px 16px 32px -16px ${rgba(theme.colors.neutral900, 0.08)},
      0px 12px 64px -12px ${rgba(theme.colors.neutral900, 0.16)};
  }
`;

function Attribute({ label, children }) {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Text color="neutral700" letterSpacing="-0.02em" fontSize="15px">
        {label}
      </Text>
      <Text
        fontSize="15px"
        fontWeight="500"
        color="neutral900"
        letterSpacing="-0.02em"
      >
        {children}
      </Text>
    </Box>
  );
}

export default function CandidateCard({ application }) {
  const { id } = useParams();
  const url = `/projects/${id}/candidates/${application.id}`;

  return (
    <Card as={Link} to={url}>
      <Avatar
        size="xl"
        marginBottom="16px"
        url={application.specialist.avatar}
        name={application.specialist.name}
      />
      <Text
        fontSize="22px"
        fontWeight="500"
        color="neutral900"
        marginBottom="2px"
        letterSpacing="-0.03em"
      >
        {application.specialist.name}
      </Text>
      <Text
        fontsize="16px"
        marginBottom="24px"
        color="neutral600"
        letterSpacing="-0.02em"
      >
        {application.specialist.location}
      </Text>
      <Box my="12px" height="1px" bg="neutral100" />
      <Attribute label="Hourly rate">
        {currency(application.rate * 100)}
      </Attribute>
      <Box my="12px" height="1px" bg="neutral100" />
      <Attribute label="Available to start">
        {application.availability}
      </Attribute>
      <Box paddingTop="28px">
        <ApplicationStatus application={application} />
      </Box>
    </Card>
  );
}
