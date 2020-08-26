import React from "react";
import PropTypes from "prop-types";
import { Info } from "@styled-icons/feather";
import { Circle, Box, Text, theme, Card } from "@advisable/donut";
import { AnimatePresence, motion } from "framer-motion";
import { rgba } from "polished";
import styled from "styled-components";

const Wrapper = styled.div`
  &:hover {
    min-height: 16px;
    background-color: white;
  }
`;

function PromptBox({ formik, numOfWords, isActive }) {
  return (
    <AnimatePresence>
      <Wrapper
        as={Box}
        bg={isActive ? "#fff" : "#fff"}
        initial={{ y: 48, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 5, opacity: 0 }}
        style={{ originX: "0px", originY: "0px" }}
        transition={{ duration: 0.3 }}
        borderRadius={isActive ? "4px" : "2px"}
        boxShadow={`0 1px 2px ${rgba(theme.colors.neutral[8], 0.1)}`}
        width="calc(100% - 24px)"
        position="absolute"
        left="12px"
        minHeight="4px"
        bottom={formik.errors.answer && formik.touched.answer ? "30px" : "12px"}
        css={`
          overflow: hidden;
          transition: border-radius 0.2s, background-color 0.4s, min-height 0.4s;
        `}
      >
        <Box
          position="absolute"
          width={`${numOfWords}%`}
          height="100%"
          zIndex="4"
          bg={isActive ? "blue400" : "blue400"}
          css={`
            transition: height 0.4s, width 0.4s, opacity 1s,
              background-color 0.2s;
            mix-blend-mode: multiply;
          `}
        />
        <AnimatePresence initial={false}>
          {isActive && (
            <Box
              as={motion.section}
              zIndex="6"
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
                pr="xs"
                pl="xs"
                display="flex"
              >
                <Box>
                  <Text
                    mr="12px"
                    fontSize="xs"
                    fontWeight="medium"
                    color="blue900"
                    lineHeight="180%"
                  >
                    {numOfWords}/100
                  </Text>
                </Box>
                {/* <Box
                  bg="#ECEDF1"
                  color="#404F76"
                  mr="12px"
                  ml="0"
                  mb="xxs"
                  p="xs"
                  borderRadius="50%"
                >
                  <Info size="22" strokeWidth={2} />
                </Box> */}
                <Box ml="auto">
                  <Text
                    fontSize="xs"
                    // fontWeight="medium"
                    // mb="xxs"
                    lineHeight="180%"
                    color="neutral800"
                  >
                    Please try to be informative
                  </Text>
                </Box>
              </Box>
            </Box>
          )}
        </AnimatePresence>
      </Wrapper>
    </AnimatePresence>
  );
}

PromptBox.propTypes = {
  numOfWords: PropTypes.number,
  formik: PropTypes.object,
};

export default PromptBox;
