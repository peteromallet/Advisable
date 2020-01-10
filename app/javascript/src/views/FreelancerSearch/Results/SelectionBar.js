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
      height={100}
      width="100%"
      bg="white.9"
      position="fixed"
      boxShadow="0 10px 50px rgba(0, 0, 0, 0.2)"
      as={motion.div}
      animate={{
        y: selected.length === 0 ? 80 : 0,
      }}
      initial={{
        y: selected.length === 0 ? 80 : 0,
      }}
    >
      <Box height={80} display="flex" alignItems="center" px={90}>
        <Box width="100%">You have selected {selected.length} freelancer's</Box>
        <RoundedButton
          as={Link}
          size="l"
          to={{
            ...location,
            pathname: "/freelancer_search/availability",
          }}
          suffix={<Icon icon="arrow-right" />}
        >
          Continue
        </RoundedButton>
      </Box>
    </Box>
  );
};

export default SelectionBar;
