import React from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { Box, Icon, RoundedButton } from "@advisable/donut";

const SelectionBar = () => {
  const location = useLocation();
  const selected = location.state.freelancers || [];

  return (
    <Box
      left="0"
      bottom="0"
      height={60}
      width="100%"
      bg="white.9"
      position="fixed"
      boxShadow="l"
      as={motion.div}
      display="flex"
      alignItems="center"
      animate={{
        y: selected.length === 0 ? 60 : 0,
      }}
      initial={{
        y: selected.length === 0 ? 60 : 0,
      }}
    >
      <Box width="100%" px="m">
        You have selected {selected.length} freelancer's
      </Box>
      <RoundedButton mr="m" suffix={<Icon icon="arrow-right" />}>
        Continue
      </RoundedButton>
    </Box>
  );
};

export default SelectionBar;
