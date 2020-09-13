import React from "react";
import { Search } from "@styled-icons/feather";
import { Box, Text, Circle } from "@advisable/donut";

function NotFound({ id }) {
  return (
    <Box
      py="xl"
      height="100%"
      display="flex"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
    >
      <Box maxWidth={400} textAlign="center">
        <Circle size={50} bg="yellow50" color="yellow600">
          <Search size={24} strokeWidth={2} />
        </Circle>
        <Text
          color="blue900"
          textAlign="center"
          mb="xs"
          mt="m"
          fontWeight="medium"
        >
          Project not found
        </Text>
        <Text fontSize="s" lineHeight="s" color="neutral700" textAlign="center">
          Could not find a project with the id &quot;{id}&quot;
        </Text>
      </Box>
    </Box>
  );
}

export default NotFound;
