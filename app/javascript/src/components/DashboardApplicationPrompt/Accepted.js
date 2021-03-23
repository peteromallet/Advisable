import React from "react";
import { Card, Box, Text, Button, Link } from "@advisable/donut";
import { StyledDescription, StyledHeader } from "./styles";
import { Briefcase, UserGroup } from "@styled-icons/heroicons-outline";
import { ArrowRight } from "@styled-icons/feather";
import { usePreviousProjects } from "./queries";

export default function Accepted() {
  const previousProjects = usePreviousProjects();
  const hasValidated = previousProjects.find(
    (proj) => proj.validationStatus === "Validated",
  );
  if (hasValidated) return null;

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
        <Text fontSize="40px" display={{ _: "none", m: "block" }} mb={3}>
          🎊
        </Text>
        <StyledHeader mb={3} fontSize={["3xl", "40px"]} fontWeight="semibold">
          Welcome to Advisable!
        </StyledHeader>
        <StyledDescription
          mb={[8, 8, 15, 15]}
          lineHeight="s"
          color="neutral800"
        >
          Congratulations! You have been accepted into the Advisable freelance
          network. We are delighted to have you onboard!
        </StyledDescription>
        <Box
          display="grid"
          textAlign="left"
          gridTemplateColumns={{ m: "repeat(2, 280px)" }}
          gridTemplateRows={{ s: "repeat(2, auto)" }}
          justifyContent="space-evenly"
          width="100%"
          gridRowGap={{ m: 0, _: 12 }}
        >
          <Box>
            <Box
              width={{ _: "42px", m: "48px" }}
              height={{ _: "42px", m: "48px" }}
              borderRadius="12px"
              bg="orange100"
              display="flex"
              alignItems="center"
              justifyContent="center"
              color="orange800"
              mb={[2, 2, 4]}
            >
              <Briefcase size="24px" />
            </Box>
            <Text
              fontWeight="medium"
              fontSize="l"
              lineHeight="s"
              mb={[1, 1, 2]}
              color="neutral900"
            >
              Build your profile and get access to new opportunities
            </Text>
            <Text
              fontSize="sm"
              lineHeight="s"
              color="neutral600"
              mb={[3, 3, 6]}
            >
              In order to get access to opportunities from Advisable you need to
              have a profile. Add some of your previous work and we&apos;ll
              start searching for new opportunities that match your skillset.
            </Text>
            <Button
              as={Link}
              to="/profile"
              suffix={<ArrowRight />}
              size="s"
              variant="subtle"
            >
              Build Your Profile
            </Button>
          </Box>
          <Box>
            <Box
              width={{ _: "42px", m: "48px" }}
              height={{ _: "42px", m: "48px" }}
              borderRadius="12px"
              bg="cyan100"
              display="flex"
              alignItems="center"
              justifyContent="center"
              color="cyan800"
              mb={[2, 2, 4]}
            >
              <UserGroup size="24px" />
            </Box>
            <Text
              fontWeight="medium"
              fontSize="l"
              lineHeight="s"
              mb={[1, 1, 2]}
              color="neutral900"
            >
              Start building your freelance network with Guild
            </Text>
            <Text
              fontSize="sm"
              lineHeight="s"
              color="neutral600"
              mb={[3, 3, 6]}
            >
              Start building your freelance network with Guild. You can post,
              connect with other freelancers or visit the events tab to find out
              when our next Guild event is happening.
            </Text>
            <Button
              as={Link.External}
              href="/guild"
              suffix={<ArrowRight />}
              size="s"
              variant="subtle"
            >
              Explore Guild
            </Button>
          </Box>
        </Box>
      </Box>
    </Card>
  );
}
