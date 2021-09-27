import React from "react";
import { Box, Text } from "@advisable/donut";
import { AlertCircle } from "@styled-icons/feather/AlertCircle";

export const TRUNCATE_LIMIT = 280;

function BioLengthWiget({ meta }) {
  const numOfSymbols = meta.value.length;
  const exceeded = numOfSymbols > TRUNCATE_LIMIT;
  return (
    <Box width="100%" display="flex" mt="xs">
      {exceeded && (
        <Box display="flex" maxWidth="500px" pr="m" pl="xxs">
          <Box color="red500" mr="xs" mt="xxs">
            <AlertCircle size={26} strokeWidth="2px" />
          </Box>
          <Box>
            <Text color="red800" fontSize="m" mb="xxs" fontWeight="medium">
              You exceeded the suggested amount of symbols.
            </Text>
            <Text color="neutral700">
              We highly recommend you to keep biography simple and short.
            </Text>
          </Box>
        </Box>
      )}
      <Box ml="auto" borderRadius="8px">
        <Text
          color="neutral700"
          ml="auto"
          bg={exceeded && "red100"}
          p="xxs"
          borderRadius={9}
        >
          {numOfSymbols}/{TRUNCATE_LIMIT}
        </Text>
      </Box>
    </Box>
  );
}

export default BioLengthWiget;
