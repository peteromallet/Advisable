import React from "react";
import { Box, Text, Button, Link } from "@advisable/donut";
import { ChevronRight } from "@styled-icons/feather";
import logo from "./logo.svg";

function ThankYouContent() {
  return (
    <Box pb={20}>
      <Text fontSize={48} color="white" fontWeight="semibold" mb={5}>
        Thank you
      </Text>
      <Text fontSize="l" color="white" lineHeight="l" mb={8}>
        Advisable helps connect the worlds top freelance marketing talent with
        companies. Rutrum est mi nascetur nibh pellentesque mollis dignissim
        vulputate pretium ultricies.
      </Text>
      <Button variant="dark" size="l" suffix={<ChevronRight />}>
        Get Started
      </Button>
    </Box>
  );
}

function Footer() {
  return (
    <Box display="flex">
      <Text fontWeight="medium" color="blue900" mr="xs">
        &#169; Advisable
      </Text>
      <Text mr="xs" color="blue900">
        •
      </Text>
      <Link.External to="/" color="blue900">
        Privacy & Terms
      </Link.External>
    </Box>
  );
}

function FormsContent() {
  return (
    <Box pb={20}>
      <Text fontSize={48} color="white" fontWeight="semibold">
        Advisable connects
      </Text>
      <Text fontSize={48} color="#FEB6C8" fontWeight="semibold">
        top freelancers
      </Text>
      <Text fontSize={48} color="white" fontWeight="semibold">
        with clients
      </Text>
      <Text fontSize="l" color="white" lineHeight="l">
        Advisable helps connect the worlds top freelance marketing talent with
        companies. Rutrum est mi nascetur nibh pellentesque mollis dignissim
        vulputate pretium ultricies.
      </Text>
    </Box>
  );
}

export default function OrbitsContent({ step }) {
  return (
    <Box
      zIndex={2}
      position="relative"
      px="70px"
      py={12}
      maxWidth="620px"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="flex-start"
      alignContent="center"
    >
      <img src={logo} alt="" />
      {step === 2 ? <ThankYouContent /> : <FormsContent />}
      <Footer />
    </Box>
  );
}
