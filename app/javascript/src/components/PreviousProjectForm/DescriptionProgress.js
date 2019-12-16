import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { theme, Box, Text, Icon } from "@advisable/donut";

const Bar = styled.div`
  width: 100%;
  height: 4px;
  border-radius: 4px;
  background: ${theme.colors.neutral[2]};
`;

const BarInner = styled.div`
  width: 0%;
  height: 100%;
  border-radius: 4px;
  background: ${theme.colors.blue[4]};
`;

const DescriptionProgress = ({ percentage, children }) => {
  const animation = {
    color: percentage === 100 ? theme.colors.white[9] : theme.colors.neutral[4],
    backgroundColor:
      percentage === 100 ? theme.colors.blue[5] : theme.colors.neutral[1],
  };

  return (
    <Box display="flex" alignItems="center">
      <Box
        mr="xs"
        width={24}
        height={24}
        flexShrink={0}
        display="flex"
        as={motion.div}
        borderRadius="50%"
        alignItems="center"
        justifyContent="center"
        initial={animation}
        animate={animation}
      >
        <Icon icon="check" width={14} height={14} />
      </Box>
      <Bar>
        <BarInner
          as={motion.div}
          initial={{
            width: `${percentage}%`,
          }}
          animate={{
            width: `${percentage}%`,
          }}
        />
      </Bar>
      <Box flexShrink={0} ml="s" width={60}>
        <Text color="neutral.4" fontSize="xs" textAlign="right">
          {children}
        </Text>
      </Box>
    </Box>
  );
};

export default DescriptionProgress;
