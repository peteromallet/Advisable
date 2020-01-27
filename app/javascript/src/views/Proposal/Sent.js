import * as React from "react";
import { Card, Text, Link, Box } from "@advisable/donut";
import illustration from "./illustration.png";

const Send = ({ application }) => {
  const proposalUrl = `/applications/${application.airtableId}/proposal`;

  return (
    <Card padding="l" pb="xxl">
      <Box textAlign="center">
        <img src={illustration} width={280} alt="" />
        <Text as="h3" mb="s" fontSize="xl" fontWeight="semibold" color="blue.9">
          Your proposal has been sent!
        </Text>
        <Box maxWidth={380} mx="auto">
          <Text mb="l" fontize="s">
            Your proposal has been sent to{" "}
            {application.project.user.companyName}. We'll try to get a response
            from them ASAP.
          </Text>
        </Box>
        <Link to={proposalUrl}>Update proposal</Link>
      </Box>
    </Card>
  );
};

export default Send;
