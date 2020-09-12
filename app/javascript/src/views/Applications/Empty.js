import * as React from "react";
import { Box, Text, Paragraph, Link } from "@advisable/donut";
import illustration from "./illustration.png";

const Empty = () => {
  return (
    <Box
      height="calc(100vh - 200px)"
      marginX="auto"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Box maxWidth={{ _: "100%", m: 460 }}>
        <Box display={{ _: "block", m: "none" }} css="text-align: center;">
          <img src={illustration} alt="" width={300} />
        </Box>
        <Text
          fontSize="5xl"
          marginBottom="sm"
          fontWeight="medium"
          lineHeight="32px"
          colour="neutral900"
          letterSpacing="-0.03em"
        >
          You have not applied to any projects yet
        </Text>
        <Paragraph mb="xl">
          Whenever relevant opportunities come up that match your skillset,
          we’ll reach out and give you the opportunity to fill out a tailored
          application that we present directly to clients.
        </Paragraph>
        <Text fontSize="lg" fontWeight="medium" color="neutral900" mb="xxs">
          What more projects from Advisable?
        </Text>
        <Paragraph marginBottom="sm">
          Try adding some more information to your profile to increase your
          chances of being matched with a project.
        </Paragraph>
        <Box mb="s">
          <Link to="/profile">Update your profile →</Link>
        </Box>
      </Box>
      <Box display={{ _: "none", m: "block" }}>
        <img src={illustration} alt="" width={460} />
      </Box>
    </Box>
  );
};

export default Empty;
