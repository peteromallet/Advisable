import * as React from "react";
import { Box, Card, Text, Link } from "@advisable/donut";
import illustration from "./illustration.png";

const Empty = props => {
  return (
    <Card borderRadius={8} p="xxl">
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box maxWidth={{ _: "100%", m: 420 }}>
          <Box display={{ _: "block", m: "none" }} css="text-align: center;">
            <img src={illustration} alt="" width={300} />
          </Box>
          <Text
            mb="s"
            size="xxl"
            weight="medium"
            lineHeight="xxl"
            colour="neutral.9"
          >
            You have not applied to any projects yet
          </Text>
          <Text size="s" color="neutral.7" lineHeight="s" mb="xl">
            Whenever relevant opportunities come up that match your skillset,
            we’ll reach out and give you the opportunity to fill out a tailored
            application that we present directly to clients.
          </Text>
          <Text weight="medium" color="neutral.9" mb="xxs">
            What more projects from Advisable?
          </Text>
          <Text color="neutral.6" size="s" lineHeight="s" mb="m">
            Here are some things you can do to increase your chances of getting
            matched with a project.
          </Text>
          <Box mb="s">
            <Link to="/profile">Update your profile →</Link>
          </Box>
          <Link target="_blank" as="a" href={props.featuredURL}>
            Become a featured freelancer →
          </Link>
        </Box>
        <Box display={{ _: "none", m: "block" }}>
          <img src={illustration} alt="" width={400} />
        </Box>
      </Box>
    </Card>
  );
};

export default Empty;
