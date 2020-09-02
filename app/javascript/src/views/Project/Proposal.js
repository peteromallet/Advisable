import React from "react";
import { DateTime } from "luxon";
import { Link, useParams } from "react-router-dom";
import { Box, Button, Text, Avatar } from "@advisable/donut";
import { ArrowBack } from "@styled-icons/ionicons-outline";
import { Card } from "./styles";
import { useProposal } from "./queries";
import ProposalTasks from "./ProposalTasks";
import MoneyBackGuarantee from "./MoneyBackGuarantee";
import renderLineBreaks from "../../utilities/renderLineBreaks";

export default function Proposal() {
  const { id, applicationId } = useParams();
  const { loading, data } = useProposal({ variables: { id: applicationId } });

  if (loading) return null;

  const application = data.application;
  const specialist = application.specialist;
  const proposedAt = DateTime.fromISO(application.proposedAt);

  return (
    <Card>
      <Link to={`/projects/${id}/candidates/${applicationId}`}>
        <Button
          prefix={<ArrowBack />}
          size="s"
          variant="subtle"
          marginBottom="24px"
        >
          Back
        </Button>
      </Link>
      <Text
        fontSize="24px"
        fontWeight="500"
        marginBottom="8px"
        color="neutral900"
        letterSpacing="-0.05em"
      >
        {specialist.name} sent you a proposal.
      </Text>
      <Text marginBottom="32px" color="neutral700" lineHeight="20px">
        {specialist.firstName} has suggested some tasks to get started.
        Accepting this proposal wont assign any tasks. You’ll have the
        opportunity to assign and add more tasks once you start working
        together.
      </Text>
      <Box
        padding="16px"
        borderRadius="12px"
        bg="neutral100"
        marginBottom="48px"
      >
        <Box display="flex" alignItems="center" marginBottom="s">
          <Avatar
            size="s"
            bg="neutral200"
            marginRight="12px"
            url={specialist.avatar}
            name={specialist.name}
          />
          <Box>
            <Text
              color="neutral900"
              fontWeight="500"
              lineHeight="20px"
              letterSpacing="-0.02em"
            >
              {specialist.name}
            </Text>
            <Text fontSize="14px" color="neutral600">
              {proposedAt.toFormat("dd MMM yyyy, HH:mma")}
            </Text>
          </Box>
        </Box>
        <Text
          autoLink
          fontSize="15px"
          fontWeight="300"
          lineHeight="20px"
          color="neutral800"
          fontStyle="italic"
          letterSpacing="0.01em"
        >
          {renderLineBreaks(application.proposalComment)}
        </Text>
      </Box>
      <ProposalTasks tasks={application.tasks} />
      <MoneyBackGuarantee />
    </Card>
  );
}
