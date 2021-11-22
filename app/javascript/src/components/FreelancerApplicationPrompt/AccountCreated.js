import React from "react";
import styled from "styled-components";
import { Card, Box, Text, Circle, Button, Link } from "@advisable/donut";
import { ArrowRight } from "@styled-icons/feather/ArrowRight";

export const StyledHeader = styled(Text)`
  background: linear-gradient(90deg, #00199b, #00cbbf);
  letter-spacing: -0.04em;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const StyledDescription = styled(Text)`
  max-width: 540px;
`;

function Section({ number, header, description }) {
  return (
    <Box display="flex" flexDirection={{ _: "row", m: "column" }}>
      <Box>
        <Circle
          bg="orange200"
          size={40}
          color="orange800"
          mb={4}
          mr={{ _: 4, m: 0 }}
        >
          <Text fontWeight="bold" fontSize="m">
            {number}
          </Text>
        </Circle>
      </Box>
      <Box>
        <Text
          fontWeight="medium"
          fontSize="17px"
          lineHeight="s"
          mb={2}
          color="neutral900"
        >
          {header}
        </Text>
        <Text fontSize="sm" lineHeight="xs" color="neutral600">
          {description}
        </Text>
      </Box>
    </Box>
  );
}

export default function AccountCreated() {
  return (
    <Card
      as={Box}
      mb={10}
      elevation="l"
      borderRadius="12px"
      p={[6, 10, 12, 14]}
      pb={[10, 12, 14, 20]}
    >
      <Box
        display="flex"
        alignItems={{ _: "start", m: "center" }}
        flexDirection="column"
        textAlign={{ _: "left", m: "center" }}
      >
        <StyledHeader mb={3} fontSize={["3xl", "40px"]} fontWeight="semibold">
          Join our freelance network
        </StyledHeader>
        <StyledDescription
          mb={[8, 8, 10, 14]}
          lineHeight="s"
          color="neutral800"
        >
          You&apos;ve created an account but you have not yet been accepted into
          our network. Begin your application to get started.
        </StyledDescription>
        <Box
          display="grid"
          gridTemplateColumns={{ m: "repeat(3, 25.3%)" }}
          gridTemplateRows={{ s: "repeat(3, auto)" }}
          justifyContent="space-around"
          gridRowGap={{ m: 0, _: 8 }}
          mb={[9, 10, 12, 16]}
        >
          <Section
            number={1}
            header="Be Discovered For Opportunities"
            description="We recommend you to clients who need your expertise for meaningful projects."
          />
          <Section
            number={2}
            header="Join A Network Of Brilliant Peers"
            description="Access a private network featuring talented peers from across hundreds of skills."
          />
          <Section
            number={3}
            header="Show Off Your Best Achievements"
            description="Our profiles help tell the story of the most impressive projects you've executed."
          />
        </Box>
        <Button
          as={Link}
          size={{ _: "m", m: "l" }}
          variant="gradient"
          suffix={<ArrowRight />}
          to="/freelancers/apply"
          width={{ _: "100%", m: "auto" }}
        >
          Start Application
        </Button>
      </Box>
    </Card>
  );
}
