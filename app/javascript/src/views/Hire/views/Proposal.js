import React from "react";
import { DateTime } from "luxon";
import { useParams, useHistory } from "react-router-dom";
import { Card, Box, Text, Avatar, Paragraph, Heading } from "@advisable/donut";
import { useProposal } from "../queries";
import ProposalTasks from "../components/ProposalTasks";
import MoneyBackGuarantee from "../components/MoneyBackGuarantee";
import renderLineBreaks from "src/utilities/renderLineBreaks";
import BackButton from "src/components/BackButton";
import HireAction from "../components/HireAction";
import MessageAction from "../components/MessageAction";
import RemoveApplication from "../components/RemoveApplication";

export default function Proposal() {
  const { id } = useParams();
  const history = useHistory();
  const { loading, data } = useProposal({ variables: { id } });

  if (loading) return null;

  const application = data.application;
  const specialist = application.specialist;
  const proposedAt = DateTime.fromISO(application.proposedAt);

  const handleRemove = () => {
    history.push("/hire");
  };

  return (
    <Card padding={8} borderRadius="12px">
      <BackButton to="/hire" marginBottom={4} />
      <Box maxWidth="720px">
        <Heading
          fontSize="4xl"
          marginBottom={2}
          color="neutral900"
          letterSpacing="-0.04em"
        >
          {specialist.name} sent you a proposal.
        </Heading>
        <Text lineHeight="20px" fontSize="17px" marginBottom={8}>
          {specialist.firstName} has suggested some tasks to get started.
          Accepting this proposal won&apos;t assign any tasks. You’ll have the
          opportunity to assign and add more tasks once you start working
          together.
        </Text>
      </Box>
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
            marginRight="8px"
            url={specialist.avatar}
            name={specialist.name}
          />
          <Box>
            <Text
              color="neutral900"
              marginBottom="4px"
              fontWeight="medium"
              letterSpacing="-0.02em"
            >
              {specialist.name}
            </Text>
            <Text fontSize="xs" color="neutral600">
              {proposedAt.toFormat("dd MMM yyyy, HH:mma")}
            </Text>
          </Box>
        </Box>
        <Paragraph autoLink fontStyle="italic" letterSpacing="0.01em">
          {renderLineBreaks(application.proposalComment)}
        </Paragraph>
      </Box>
      <ProposalTasks tasks={application.tasks} />
      <MoneyBackGuarantee />
      <Box display="flex" marginTop={8} alignItems="center">
        <HireAction application={application} size="md" />
        <Box height="40px" width="1px" bg="neutral200" mx={3} />
        <MessageAction application={application} size="md" />
        <Box height="40px" width="1px" bg="neutral200" mx={3} />
        <RemoveApplication
          application={application}
          size="md"
          onRemove={handleRemove}
        />
      </Box>
    </Card>
  );
}
