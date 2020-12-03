import React from "react";
import { X } from "@styled-icons/heroicons-outline";
import { Box, Circle } from "@advisable/donut";
import { Link } from "react-router-dom";

export default function MobileNavigation({ mobileNavOpen, setMobileNavOpen }) {
  if (!mobileNavOpen) return null;

  return (
    <Box
      top="0"
      left="0"
      bg="white"
      zIndex="10"
      width="100%"
      padding={12}
      height="100vh"
      position="absolute"
    >
      <Circle
        top="20px"
        size={40}
        right="20px"
        bg="neutral200"
        color="blue900"
        position="absolute"
        onClick={() => setMobileNavOpen(false)}
      >
        <X size={20} />
      </Circle>
      <Box as={Link} display="block" py={6} to="/feed" color="neutral900">
        Feed
      </Box>
      <Box height={1} bg="neutral100" />
      <Box as={Link} display="block" py={6} to="/messages" color="neutral900">
        Messages
      </Box>
      <Box height={1} bg="neutral100" />
    </Box>
  );
}
