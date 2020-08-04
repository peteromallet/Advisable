import React from "react";
import { Box, Text } from "@advisable/donut";
import ProcessingApplicationWrapper from "./styles";
import Loading from "../../../../../components/Loading";
import { motion } from "framer-motion";

function ProcessingApplication() {
  return (
    <ProcessingApplicationWrapper
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ x: -100, opacity: 0, transition: { duration: 0.1 } }}
      position="absolute"
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
      zIndex="2"
    >
      <Box mt="-35%">
        <Loading />
        <Text mt="-30%" fontSize="xs" color="neutral400">
          Processing your application
        </Text>
      </Box>
    </ProcessingApplicationWrapper>
  );
}

export default ProcessingApplication;
