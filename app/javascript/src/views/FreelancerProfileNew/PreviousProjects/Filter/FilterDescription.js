import React from "react";
import { Info } from "@styled-icons/feather";
import { Box, Text, Button, theme } from "@advisable/donut";
import { rgba } from "polished";
import queryString from "query-string";
import { useHistory, useLocation } from "react-router";
import { AnimatePresence, motion } from "framer-motion";

function arrayToSentence(array) {
  return (
    array.slice(0, -2).join(", ") +
    (array.slice(0, -2).length ? ", " : "") +
    array.slice(-2).join(" and ")
  );
}

function FilterDescription({ firstName, clearFilters, filtering }) {
  const location = useLocation();

  const queryParams = queryString.parse(location.search, {
    arrayFormat: "bracket",
  });

  const skills = queryParams?.skills || [];
  const industries = queryParams?.industries || [];

  if (skills.length === 0 && industries.length === 0) return null;

  let output = "";

  if (skills.length > 0) {
    output = `Showing ${arrayToSentence(skills)} projects`;
  }

  if (industries.length > 0) {
    if (industries.length === 1) {
      output += ` with ${industries[0]} companies`;
    } else {
      output += " in multiple industries";
    }
  }
  return (
    <AnimatePresence initial={false}>
      {filtering && (
        <Box
          as={motion.div}
          initial="collapsed"
          animate="open"
          exit="collapsed"
          variants={{
            open: { opacity: 1, height: "auto" },
            collapsed: { opacity: 0, height: 0 },
          }}
          overflow="hidden"
          width="100%"
        >
          <Box
            display="flex"
            alignItems="center"
            borderRadius="8px"
            mx="xs"
            bg={rgba(theme.colors.neutral100, 0.9)}
            pl="s"
            py="xxs"
            pr="xxs"
          >
            <Box color="neutral600" mr="s" mb="2px">
              <Info size={18} strokeWidth={2} />
            </Box>
            <Text mr="auto" color="neutral600">
              {output}
            </Text>
            <Button size="s" variant="ghost" onClick={clearFilters}>
              Clear Filters
            </Button>
          </Box>
        </Box>
      )}
    </AnimatePresence>
  );
}

export default FilterDescription;
