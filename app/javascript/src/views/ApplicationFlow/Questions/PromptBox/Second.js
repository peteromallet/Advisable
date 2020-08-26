import React from "react";
import { Info } from "@styled-icons/feather";
import { Box, Text, theme } from "@advisable/donut";
import { AnimatePresence, motion } from "framer-motion";

function PromptBox({ formik }) {
  return (
    <AnimatePresence>
      <Box
        bg="#fff"
        as={motion.div}
        initial={{ y: 48, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 5, opacity: 0 }}
        style={{ originX: "0px", originY: "0px" }}
        transition={{ duration: 0.3 }}
        borderRadius="8px"
        width="calc(100% - 24px)"
        position="absolute"
        display="flex"
        alignItems="center"
        left="12px"
        bottom={formik.errors.answer && formik.touched.answer ? "30px" : "12px"}
        pt="s"
        pb="xs"
        px="s"
        css={`
          pointer-events: none;
        `}
      >
        <Box
          as={motion.div}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          color="blue400"
          mr="20px"
          ml="0"
          mb="xs"
        >
          <Info size="28" strokeWidth={2} />
        </Box>
        <Box
          as={motion.div}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
        >
          <Text fontSize="s" fontWeight="medium" mb="xxs" color="blue900">
            Please try to be informative
          </Text>
          <Text color="blue900" fontSize="xs" lineHeight="125%">
            Provide substance when answering this question — it&apos;s one of
            the most influential factors for clients when making their
            selection.
          </Text>
        </Box>
      </Box>
    </AnimatePresence>
  );
}

export default PromptBox;
