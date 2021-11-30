import React from "react";
import { Box, Text, useBreakpoint } from "@advisable/donut";
import bloomtechLogoWhite from "./logos/bloomtech-white.png";
import StackOverflowLogo from "./logos/StackOverflowLogo";
import SpotifyLogo from "./logos/SpotifyLogo";
import ProductHuntLogo from "./logos/ProductHuntLogo";
import BigCommerceLogo from "./logos/BigCommerceLogo";
import WorldRemitLogo from "./logos/WorldRemitLogo";
import BabbelLogo from "./logos/BabbelLogo";
import UberAllLogo from "./logos/UberAllLogo";
import { AnimatePresence, motion } from "framer-motion";
import { transitionVariants } from "../transitionVariants";

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
      gridRowGap={7}
    >
      <SpotifyLogo {...params} />
      <StackOverflowLogo {...params} height="96%" />
      <Box
        as="img"
        src={bloomtechLogoWhite}
        alt="bloomtech-logo"
        height="100%"
        css={`
          object-fit: scale-down;
          transform: translateY(3px);
        `}
        opacity="0.8"
      />
      <ProductHuntLogo {...params} opacity="0.8" />
      <WorldRemitLogo {...params} fill="none" opacity="0.6" />
      <BabbelLogo {...params} opacity="0.6" height="86%" />
      <UberAllLogo {...params} opacity="0.4" />
      <BigCommerceLogo {...params} opacity="0.4" />
    </Box>
  );
}

function Title({ children, ...props }) {
  return (
    <Text
      fontSize={{ _: "5xl", xl: 48 }}
      letterSpacing="-0.016em"
      color="white"
      fontWeight={560}
      {...props}
    >
      {children}
    </Text>
  );
}

function FormsContent() {
  return (
    <>
      <Box mb={{ xl: 20 }}>
        <Title>Advisable helps</Title>
        <Title
          css={`
            background-image: linear-gradient(
              135deg,
              #b782fc,
              #dec3ff 50%,
              #8f97fc
            );
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          `}
        >
          ambitious companies
        </Title>
        <Title mb={{ _: 4, l: 5 }}>succeed</Title>
        <Text
          fontSize={{ _: "m", l: "l" }}
          color="white"
          lineHeight={{ _: "m", l: "l" }}
        >
          Get recommended brilliant talent and learn about them by exploring
          case studies of their work.
        </Text>
      </Box>
      <Logos />
    </>
  );
}

export default function OrbitsContent({ step, custom }) {
  const isMobile = useBreakpoint("s");
  const framerParams = {
    variants: transitionVariants,
    initial: "enter",
    animate: "center",
    exit: "exit",
    custom,
  };
  return (
    <Box
      position="relative"
      gridArea="orbits-content"
      alignSelf={{ _: "start", xl: "center" }}
      maxWidth={{ _: "640px", xl: "500px" }}
      pt={{ _: 0, xl: 14 }}
      pb={{ xl: 14 }}
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
    >
      <AnimatePresence exitBeforeEnter initial={false} custom={custom}>
        {isMobile && step === 1 ? (
          <motion.div {...framerParams} />
        ) : (
          <motion.div {...framerParams} key="forms">
            <FormsContent />
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}
