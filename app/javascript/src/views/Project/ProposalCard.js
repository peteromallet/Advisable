import React from "react";
import { rgba } from "polished";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { ChatbubbleEllipses, ArrowForward } from "@styled-icons/ionicons-solid";
import { StyledCard, Circle, Text, Box, Button, theme } from "@advisable/donut";

const Card = styled(StyledCard)`
  padding: 24px;
  display: flex;
  border-radius: 12px;
  align-items: center;
  box-shadow: 0px 4px 12px -4px ${rgba(theme.colors.neutral900, 0.04)},
    0px 4px 20px -4px ${rgba(theme.colors.neutral900, 0.08)};
`;

const Comment = styled(Text)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export default function ProposalCard({ application }) {
  const { id } = useParams();
  const url = `/projects/${id}/candidates/${application.id}/proposal`;

  return (
    <Card as={Link} to={url} marginBottom="24px">
      <Box>
        <Circle bg="blue100" size="40px" color="blue900">
          <ChatbubbleEllipses size="22px" />
        </Circle>
      </Box>
      <Box paddingX="12px" flex={1} minWidth={0}>
        <Text
          mb="4px"
          fontSize="lg"
          fontWeight="500"
          color="neutral900"
          letterSpacing="-0.02em"
        >
          {application.specialist.firstName} sent you a proposal.
        </Text>
        <Comment color="neutral600" fontSize="sm">
          {application.proposalComment}
        </Comment>
      </Box>
      <Button size="s" variant="primary" suffix={<ArrowForward />}>
        View
      </Button>
    </Card>
  );
}
