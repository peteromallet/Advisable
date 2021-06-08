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

function ClientContent() {
  return (
    <>
      <StyledHeader mb={3} fontSize={["3xl", "40px"]} fontWeight="semibold">
        Join Advisable
      </StyledHeader>
      <StyledDescription mb={[8, 8, 10, 14]} lineHeight="s" color="neutral800">
        You have created an account, however, you have not completed your
        application. Please submit an application in order to gain access to top
        tier projects and freelancers.
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
          header="Access to world-class projects"
          description="Get recommendations of case studies that our freelancers have executed for leading companies."
        />
        <Section
          number={2}
          header="Learn from the best"
          description="Discover the strategies that our freelancers executed to help top companies."
        />
        <Section
          number={3}
          header="Hire the best"
          description="Hire the freelancers who have executed projects at leading companies."
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
