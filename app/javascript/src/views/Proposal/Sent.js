import * as React from "react";
import { Box, Card, Text, Link } from "@advisable/donut";
import illustration from "./illustration.png";

const Send = ({ application }) => {
  const proposalUrl = `/applications/${application.id}/proposal`;

  return (
    <Card borderRadius="12px" padding={8} textAlign="center">
      <img src={illustration} width={280} alt="" />
      <Text paddingBottom={2} fontWeight="500" fontSize="3xl" as="h3">
        Your proposal has been sent!
      </Text>
      <Text
        paddingBottom={6}
        lineHeight="1.2"
        style={{ maxWidth: 380, margin: "0 auto" }}
      >
        Your proposal has been sent to {application.project.user.companyName}.
        We&apos;ll try to get a response from them ASAP.
      </Text>
      <Box paddingBottom="m">
        <Link to={proposalUrl}>Update proposal</Link>
      </Box>
    </Card>
  );
};

export default Send;
