import React from "react";
import PropTypes from "prop-types";
import { Info } from "@styled-icons/feather";
import { Circle, Box, Text, theme, Card } from "@advisable/donut";
import { AnimatePresence, motion } from "framer-motion";
import { rgba } from "polished";

function PromptBox({ formik, numOfWords, isActive }) {
  return (
    <AnimatePresence>
      <Box
        bg="#fff"
        initial={{ y: 48, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 5, opacity: 0 }}
        style={{ originX: "0px", originY: "0px" }}
        transition={{ duration: 0.3 }}
        borderRadius={isActive ? "4px 4px 8px 8px" : "2px"}
        boxShadow={`0 1px 2px ${rgba(theme.colors.neutral[8], 0.1)}`}
        width="calc(100% - 24px)"
        position="absolute"
        left="12px"
        bottom={formik.errors.answer && formik.touched.answer ? "30px" : "12px"}
        css={`
          pointer-events: none;
          overflow: hidden;
          transition: border-radius 0.2s;
        `}
      >
        <Box
          bg={isActive ? "#fff" : "blue200"}
          boxShadow={isActive && `inset 0 0 0px 1px ${theme.colors.blue300}`}
          height={isActive ? "6px" : "4px"}
          width="100%"
          css={`
            transition: background-color 0.4s;
          `}
        >
          <Box
            width={`${numOfWords}%`}
            height="100%"
            bg={isActive ? "blue300" : "blue400"}
            css={`
              transition: width 0.4s;
            `}
          />
        </Box>
        <AnimatePresence initial={false}>
          {isActive && (
            <Box
              as={motion.section}
              key="content"
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { opacity: 1, height: "auto" },
                collapsed: { opacity: 1, height: 0 },
              }}
              transition={{ duration: 0.6 }}
            >
              <Box
                as={motion.div}
                variants={{
                  collapsed: { opacity: 0, transition: { duration: 0.6 } },
                  open: { opacity: 1, transition: { duration: 0.7 } },
                }}
                // transition={{ duration: 0.4 }}
                alignItems="center"
                pt="10px"
                pb="12px"
                pr="s"
                pl="m"
                display="flex"
              >
                <Box
                  bg="#ECEDF1"
                  color="#404F76"
                  mr="12px"
                  ml="0"
                  mb="xxs"
                  p="xs"
                  borderRadius="50%"
                >
                  <Info size="22" strokeWidth={2} />
                </Box>
                <Box>
                  <Box display="flex">
                    <Text
                      fontSize="s"
                      fontWeight="medium"
                      // mb="xxs"
                      lineHeight="140%"
                      color="neutral800"
                    >
                      Please try to be informative
                    </Text>
                    <Text
                      ml="auto"
                      fontSize="xxs"
                      lineHeight="180%"
                      fontWeight="medium"
                      color="neutral300"
                    >
                      {numOfWords}/100
                    </Text>
                  </Box>
                  <Text color="neutral600" fontSize="xs" lineHeight="125%">
                    Provide substance when answering this question — it&apos;s
                    one of the most influential factors for clients.
                  </Text>
                </Box>
              </Box>
            </Box>
          )}
        </AnimatePresence>
      </Box>
    </AnimatePresence>
  );
}

PromptBox.propTypes = {
  numOfWords: PropTypes.number,
  formik: PropTypes.object,
};

export default PromptBox;
