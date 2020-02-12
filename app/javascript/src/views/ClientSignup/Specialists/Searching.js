import React from "react";
import { Box, Text } from "@advisable/donut";
import SearchingIndicator from "../../../components/SearchingIndicator";

function Searching() {
  return (
    <Box maxWidth={560} margin="0 auto" px="m" py="xl">
      <Box
        padding="xl"
        borderRadius={12}
        border="1px solid"
        textAlign="center"
        borderColor="neutral.1"
      >
        <Box mt="m" mb="xl">
          <SearchingIndicator />
        </Box>

        <Text fontSize="xl" color="blue.8" mb="xs" fontWeight="medium">
          Looking for specialists...
        </Text>

        <Text lineHeight="s" color="neutral.8">
          Please wait while we find specialists matching your criteria. This
          should only take a few seconds.
        </Text>
      </Box>
    </Box>
  );
}

export default Searching;
