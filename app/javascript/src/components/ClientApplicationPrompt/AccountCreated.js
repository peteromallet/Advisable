import React from "react";
import styled from "styled-components";
import useViewer from "src/hooks/useViewer";
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
          bg="orange100"
          size={52}
          color="orange700"
          mb={4}
          mr={{ _: 4, m: 0 }}
        >
          <Text fontWeight={600} fontSize="xl">
            {number}
          </Text>
        </Circle>
      </Box>
      <Box>
        <Text
          fontWeight={550}
          fontSize="17px"
          lineHeight="s"
          mb={1}
          color="neutral900"
          letterSpacing="-0.02em"
        >
          {header}
        </Text>
        <Text fontSize="sm" lineHeight="20px" color="neutral700">
          {description}
        </Text>
      </Box>
    </Box>
  );
}

function ClientContent() {
  return (
    <>
      <StyledHeader mb={3} fontSize={["3xl", "40px"]} fontWeight="semibold">
        Discover unique talent
      </StyledHeader>
      <StyledDescription
        mb={[8, 8, 10, 14]}
        fontSize="lg"
        lineHeight="24px"
        color="neutral800"
      >
        We&apos;re currently only giving relevant companies access to our
        Discover tool. You can apply below if you&apos;re interested!
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
          header="Discover the best"
          description="Get recommendations of unique people and explore their best projects."
        />
        <Section
          number={2}
          header="Learn from the best"
          description="Learn from the strategies that our talent has executed for top companies."
        />
        <Section
          number={3}
          header="Hire the best"
          description="Hire the freelancers you discover to help you achieve your mission."
        />
      </Box>
      <Button
        as={Link}
        size={{ _: "m", m: "l" }}
        variant="gradient"
        suffix={<ArrowRight />}
        to="/clients/apply"
        width={{ _: "100%", m: "auto" }}
      >
        Start Application
      </Button>
    </>
  );
}

function FreelancerContent() {
  return (
    <>
      <StyledHeader mb={3} fontSize={["3xl", "40px"]} fontWeight="semibold">
        Join our freelance network
      </StyledHeader>
      <StyledDescription mb={[8, 8, 10, 14]} lineHeight="s" color="neutral800">
        You have created an account, however, you have not yet been accepted
        into our Network. Please submit an application to join our freelance
        network and get access to top tier projects
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
          header="Priority Access To Opportunities"
          description="Get access to opportunities in your skill set with companies that value your brilliance."
        />
        <Section
          number={2}
          header="A Trusted Network Of Brilliant Peers"
          description="Join our freelance community and build a trusted network of people you love to work with."
        />
        <Section
          number={3}
          header="A Beautiful Profile To Represent Your Work"
          description="Show off your best work with a profile specifically built for freelancers."
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
    </>
  );
}

export default function AccountCreated() {
  const viewer = useViewer();

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
        {viewer.isSpecialist ? <FreelancerContent /> : <ClientContent />}
      </Box>
    </Card>
  );
}
