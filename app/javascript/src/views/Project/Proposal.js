import { DateTime } from "luxon";
import { Link, useParams } from "react-router-dom";
import { Box, Button, Text, Avatar, Paragraph } from "@advisable/donut";
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
        fontSize="3xl"
        marginBottom="8px"
        color="neutral900"
        fontWeight="medium"
        letterSpacing="-0.03em"
      >
        {specialist.name} sent you a proposal.
      </Text>
      <Paragraph marginBottom="32px">
        {specialist.firstName} has suggested some tasks to get started.
        Accepting this proposal won&apos;t assign any tasks. You’ll have the
        opportunity to assign and add more tasks once you start working
        together.
      </Paragraph>
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
    </Card>
  );
}
