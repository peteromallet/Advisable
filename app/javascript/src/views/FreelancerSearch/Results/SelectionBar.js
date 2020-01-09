import React from "react";
import { motion } from "framer-motion";
import { useLocation, Link } from "react-router-dom";
import { Box, Icon, RoundedButton } from "@advisable/donut";

const SelectionBar = () => {
  const location = useLocation();
  const selected = location.state.freelancers || [];

  return (
    <Box
      left="0"
      bottom="-20px"
      height={80}
      width="100%"
      bg="white.9"
      position="fixed"
      boxShadow="l"
      as={motion.div}
      animate={{
        y: selected.length === 0 ? 60 : 0,
      }}
      initial={{
        y: selected.length === 0 ? 60 : 0,
      }}
    >
      <Box height={60} display="flex" alignItems="center">
        <Box width="100%" px="m">
          You have selected {selected.length} freelancer's
        </Box>
        <RoundedButton
          as={Link}
          to={{
            ...location,
            pathname: "/freelancer_search/availability",
          }}
          mr="m"
          suffix={<Icon icon="arrow-right" />}
        >
          Continue
        </RoundedButton>
      </Box>
    </Box>
  );
};

export default SelectionBar;
