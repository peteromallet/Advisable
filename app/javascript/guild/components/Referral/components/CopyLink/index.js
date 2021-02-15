import React, { useState } from "react";
import { css } from "styled-components";
import { motion } from "framer-motion";
import * as clipboard from "clipboard-polyfill/text";
import { Box, Text } from "@advisable/donut";

const CopyLink = ({ link }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    clipboard.writeText(link);
    setTimeout(() => setCopied(false), 5000);
  };

  const motionAnimations = {
    initial: { opacity: 0, x: -5 },
    animate: { opacity: 1, x: 0 },
    transition: { delay: 0.11 },
  };

  return (
    <Box>
      {copied ? (
        <Text as={motion.div} {...motionAnimations} size="xs" color="blue600">
          Copied to clipboard
        </Text>
      ) : (
        <Text
          size="xs"
          fontWeight="medium"
          color="blue600"
          css={css`
            text-decoration: underline;
            text-underline-offset: 4px;
            &:hover {
              cursor: pointer;
            }
          `}
          onClick={handleCopy}
        >
          Copy Link
        </Text>
      )}
    </Box>
  );
};

export default CopyLink;
