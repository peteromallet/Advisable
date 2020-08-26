import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Info } from "@styled-icons/feather";
import { Box, Text, theme, useBreakpoint } from "@advisable/donut";
import { AnimatePresence, motion } from "framer-motion";
import { rgba } from "polished";

function PromptBox({ meta, widgetIsActive }) {
  const isWidescreen = useBreakpoint("sUp");
  const [numOfWords, setNumOfWords] = useState();
  const [show, setShow] = useState();

  useEffect(() => {
    setShow(widgetIsActive || !isWidescreen);
  }, [isWidescreen, widgetIsActive]);

  useEffect(() => {
    const answer = meta?.value;
    answer && setNumOfWords(answer.match(/\S+/g)?.length || 0);
  }, [meta?.value]);

  return (
    <Box
      position={isWidescreen ? "absolute" : "relative"}
      left={isWidescreen && "12px"}
      bottom={isWidescreen && "12px"}
      width={isWidescreen ? "calc(100% - 24px)" : "100%"}
      mt="s"
    >
      <Box
        position="absolute"
        zIndex="4"
        top="-8px"
        left="0"
        right="72px"
        bottom="-12px"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(widgetIsActive)}
      />
      <Box
        bg="#fff"
        border={!isWidescreen && `1px solid ${theme.colors.neutral100}`}
        initial={{ y: 48, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 5, opacity: 0 }}
        style={{ originX: "0px", originY: "0px" }}
        transition={{ duration: 0.3 }}
        borderRadius={show ? (isWidescreen ? "2px 2px 8px 8px" : "8px") : "2px"}
        boxShadow={`0 1px 2px ${rgba(theme.colors.neutral[8], 0.1)}`}
        minHeight="4px"
        width="100%"
        css={`
          pointer-events: none;
          overflow: hidden;
          transition: border-radius 0.2s;
        `}
      >
        {isWidescreen && (
          <Box
            position="absolute"
            bg={show ? "neutral200" : "neutral200"}
            height={show ? "4px" : "4px"}
            width="100%"
            borderRadius={show ? "2px 2px 0 0" : "2px"}
            css={`
              overflow: hidden;
              transition: background-color 0.6s;
            `}
          >
            <Box
              width={`${numOfWords > 100 ? 100 : numOfWords}%`}
              height="100%"
              // bg="blue800"
              // opacity={0.7}
              bg="blue400"
              css={`
                transition: width 0.4s;
              `}
            />
          </Box>
        )}
        <AnimatePresence initial={false}>
          {show && (
            <Box
              as={isWidescreen && motion.section}
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
                pt="12px"
                pb="10px"
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
                      lineHeight="140%"
                      color="neutral800"
                    >
                      Please try to be informative
                    </Text>
                    {isWidescreen && (
                      <Text
                        ml="auto"
                        fontSize="xxs"
                        lineHeight="180%"
                        fontWeight="medium"
                        color="neutral400"
                      >
                        {numOfWords}/100
                      </Text>
                    )}
                  </Box>
                  <Text color="neutral600" fontSize="xs" lineHeight="125%">
                    Provide substance when answering this question — it&apos;s
                    one of the most influential factors for clients when making
                    their selection.
                  </Text>
                </Box>
              </Box>
            </Box>
          )}
        </AnimatePresence>
      </Box>
    </Box>
  );
}

PromptBox.propTypes = {
  meta: PropTypes.object,
  widgetIsActive: PropTypes.bool,
};

export default PromptBox;
