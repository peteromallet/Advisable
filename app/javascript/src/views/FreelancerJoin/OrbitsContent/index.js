import React from "react";
import { Box, Text, useBreakpoint } from "@advisable/donut";
import bloomtechLogoBlack from "./logos/bloomtech-black.png";
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
    fill: "black",
  };
  return (
    <Box
      display={{ xl: "grid", _: "none" }}
      gridTemplateColumns="157px 157px"
      gridTemplateRows="32px 30px 28px 26px"
      gridColumnGap="54px"
      gridRowGap={7}
    >
      <SpotifyLogo {...params} opacity="0.6" />
      <StackOverflowLogo {...params} height="96%" opacity="0.63" />
      <Box
        as="img"
        src={bloomtechLogoBlack}
        alt="bloomtech-logo"
        height="100%"
        css={`
          object-fit: scale-down;
          transform: translateY(3px);
        `}
        opacity="0.58"
      />
      <ProductHuntLogo {...params} opacity="0.55" />
      <WorldRemitLogo {...params} stroke="black" opacity="0.55" />
      <BabbelLogo {...params} opacity="0.5" height="86%" />
      <UberAllLogo {...params} opacity="0.45" />
      <BigCommerceLogo {...params} opacity="0.45" />
    </Box>
  );
}

function Title({ children, ...props }) {
  return (
    <Text
      fontSize={{ _: "5xl", xl: 48 }}
      letterSpacing="-0.016em"
      color="neutral900"
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
            background-image: linear-gradient(135deg, #c518ce, #0c3fec);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          `}
        >
          top freelancers
        </Title>
        <Title mb={{ _: 4, l: 5 }}>succeed</Title>
        <Text
          fontSize={{ _: "m", l: "l" }}
          color="neutral800"
          lineHeight={{ _: "m", l: "l" }}
        >
          We build case studies of your work and get them discovered by clients
          who need you.
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
      pr={{ _: 0, xl: 8 }}
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
