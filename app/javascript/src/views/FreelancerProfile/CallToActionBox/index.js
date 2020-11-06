import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Button, Box, Card, Text, useBreakpoint } from "@advisable/donut";
import { motion, useAnimation } from "framer-motion";
import { useLocation, Link } from "react-router-dom";

function CallToActionBox({ specialist }) {
  const location = useLocation();
  const isWidescreen = useBreakpoint("sUp");
  const controls = useAnimation();
  const [ref, inView] = useInView();
  useEffect(() => {
    inView && controls.start("visible");
  }, [controls, inView]);

  return (
    <Card
      as={motion.div}
      animate={controls}
      p={{ _: "l", s: "xl" }}
      borderRadius="12px"
      initial="hidden"
      transition={{ delay: 0.4 }}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 },
      }}
    >
      <Box
        ref={ref}
        display="flex"
        flexDirection={isWidescreen ? "row" : "column"}
      >
        <Box mb={!isWidescreen && "m"}>
          <Text
            fontSize={{ _: "l", s: "xl" }}
            color="blue900"
            fontWeight="medium"
            lineHeight="130%"
            mb="xxs"
          >
            Would you like to talk to {specialist.firstName}?
          </Text>
          <Text lineHeight="130%" color="neutral700">
            Just fill out the form and schedule a talk
          </Text>
        </Box>
        <Box ml={isWidescreen && "auto"}>
          <Link
            to={{
              ...location,
              pathname: `/request_consultation/${specialist.id}`,
            }}
          >
            <Button>Request a talk</Button>
          </Link>
        </Box>
      </Box>
    </Card>
  );
}

export default CallToActionBox;
