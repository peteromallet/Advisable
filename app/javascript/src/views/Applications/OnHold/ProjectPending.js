import React from "react";
import { withRouter } from "react-router-dom";
import { Alert, Box, Card, Text, Button } from "@advisable/donut";

const OnHold = ({ invitation, history }) => {
  const apply = () => {
    history.push(`/invites/${invitation.airtableId}/apply`);
  };

  return (
    <Box maxWidth={600} margin="50px auto">
      <Alert
        mb="m"
        icon="refresh-ccw"
        title="Your account is currently on hold"
      >
        We evaluate and accept freelancers as they apply for projects. To get
        accepted to Advisable, please apply to the project below.
      </Alert>
      <Card padding="xl" borderRadius={8} elevation="m">
        <Text
          mb="s"
          size="xxl"
          lineHeight="xxl"
          weight="medium"
          color="neutral.9"
        >
          Good news! We found a project that might be suitable for you.
        </Text>
        <Text size="m" lineHeight="m" color="neutral.7">
          We have an open project that we think might be suitable for you. To
          get accepted to Advisable and get priority access to projects, please
          apply below.
        </Text>
        <Box height={1} bg="neutral.1" my="l" />
        <Text size="l" weight="medium" mb="xxs">
          {invitation.project.primarySkill}
        </Text>
        <Text size="m" color="neutral.6" mb="m">
          {invitation.project.estimatedBudget}
        </Text>
        <Text size="s" lineHeight="s" color="neutral.7" mb="l">
          {invitation.project.companyDescription}
        </Text>
        <Button appearance="primary" intent="success" onClick={apply}>
          Apply Now
        </Button>
      </Card>
    </Box>
  );
};

export default withRouter(OnHold);
