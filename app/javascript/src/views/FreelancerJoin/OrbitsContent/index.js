import React from "react";
import { Box, Text, Button, Link } from "@advisable/donut";
import { ChevronRight } from "@styled-icons/feather";
import lambdaSchoolLogoWhite from "./logos/lambdaSchoolLogoWhite.png";
import StackOverflowLogo from "./logos/StackOverflowLogo";
import SpotifyLogo from "./logos/SpotifyLogo";
import ProductHuntLogo from "./logos/ProductHuntLogo";
import logo from "./logo.svg";
import BigCommerceLogo from "./logos/BigCommerceLogo";
import WorldRemitLogo from "./logos/WorldRemitLogo";
import SapLogo from "./logos/SapLogo";
import BabbelLogo from "./logos/BabbelLogo";

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

function Logos() {
  const params = {
    width: "100%",
    height: "100%",
    preserveAspectRatio: "xMinYMin meet",
    fill: "white",
  };
  return (
    <Box
      display="grid"
      gridTemplateColumns="157px 157px"
      gridTemplateRows="32px 30px 28px 26px"
      gridColumnGap="54px"
      gridRowGap="22px"
    >
      <SpotifyLogo {...params} />
      <StackOverflowLogo {...params} height="96%" />
      <Box
        as="img"
        src={lambdaSchoolLogoWhite}
        alt="lambda-school-logo"
        height="100%"
        css={`
          object-fit: scale-down;
        `}
        opacity="0.6"
      />
      <ProductHuntLogo {...params} opacity="0.8" height="98%" />
      <WorldRemitLogo {...params} fill="none" opacity="0.6" />
      <BabbelLogo {...params} opacity="0.6" height="88%" />
      <SapLogo {...params} opacity="0.4" />
      <BigCommerceLogo {...params} opacity="0.4" />
    </Box>
  );
}

function FormsContent() {
  return (
    <Box>
      <Box mb={16}>
        <Text fontSize={48} color="white" fontWeight="semibold">
          Advisable connects
        </Text>
        <Text fontSize={48} color="#FEB6C8" fontWeight="semibold">
          top freelancers
        </Text>
        <Text fontSize={48} color="white" fontWeight="semibold" mb={5}>
          with clients
        </Text>
        <Text fontSize="l" color="white" lineHeight="l">
          Advisable helps connect the worlds top freelance marketing talent with
          companies. Rutrum est mi nascetur nibh pellentesque mollis dignissim
          vulputate pretium ultricies.
        </Text>
      </Box>
      <Logos />
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
