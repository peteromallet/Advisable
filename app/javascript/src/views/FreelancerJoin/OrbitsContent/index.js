import React from "react";
import { Box, Text, Button } from "@advisable/donut";
import { ChevronRight } from "@styled-icons/feather";
import lambdaSchoolLogoWhite from "./logos/lambdaSchoolLogoWhite.png";
import StackOverflowLogo from "./logos/StackOverflowLogo";
import SpotifyLogo from "./logos/SpotifyLogo";
import ProductHuntLogo from "./logos/ProductHuntLogo";
import BigCommerceLogo from "./logos/BigCommerceLogo";
import WorldRemitLogo from "./logos/WorldRemitLogo";
import BabbelLogo from "./logos/BabbelLogo";
import UberAllLogo from "./logos/UberAllLogo";

function ThankYouContent() {
  return (
    <Box pb={20} mt={{ _: 10, xl: 0 }} maxWidth="560px">
      <Header mb={5}>Thank you</Header>
      <Text
        fontSize={{ _: "m", l: "l" }}
        color="white"
        lineHeight={{ _: "m", l: "l" }}
        mb={{ _: 6, xl: 8 }}
      >
        Advisable helps connect the worlds top freelance marketing talent with
        companies. Rutrum est mi nascetur nibh pellentesque mollis dignissim
        vulputate pretium ultricies.
      </Text>
      <Button
        variant="dark"
        size={{ _: "m", xl: "l" }}
        suffix={<ChevronRight />}
      >
        Get Started
      </Button>
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
      display={{ xl: "grid", _: "none" }}
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
      <UberAllLogo {...params} opacity="0.4" />
      <BigCommerceLogo {...params} opacity="0.4" />
    </Box>
  );
}

function Header({ children, ...props }) {
  return (
    <Text
      fontSize={{ _: "5xl", xl: 48 }}
      color="white"
      fontWeight="semibold"
      {...props}
    >
      {children}
    </Text>
  );
}

function FormsContent() {
  return (
    <Box>
      <Box mb={{ _: 4, xl: 20 }} pt={{ _: 9, xl: 0 }}>
        <Header>Advisable connects</Header>
        <Header color="#FEB6C8">top freelancers</Header>
        <Header mb={{ _: 4, l: 5 }}>with clients</Header>
        <Text
          fontSize={{ _: "m", l: "l" }}
          color="white"
          lineHeight={{ _: "m", l: "l" }}
        >
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
      position="relative"
      width={{ _: "100%", xl: "40%" }}
      mx={{ _: "auto", xl: 0 }}
      maxWidth={{ _: "650px", xl: "500px" }}
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      pt={4}
    >
      {step === 2 ? <ThankYouContent /> : <FormsContent />}
    </Box>
  );
}
