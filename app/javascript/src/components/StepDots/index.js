import React from "react";
import { times } from "lodash-es";
import { motion } from "framer-motion";
import { theme } from "@advisable/donut";
import styled from "styled-components";
import { space } from "styled-system";

const Container = styled.div`
  ${space}

  width: 100%;
  display: flex;
  align-content: center;
  justify-content: ${(props) => props.justify || "center"};
`;

const Dot = styled(motion.div)`
  width: 6px;
  height: 6px;
  margin: 0 4px 0 0;
  border-radius: 3px;
`;

const StepDots = ({ total, current, justify, ...props }) => {
  const dots = times(total, (i) => {
    const isCurrent = current === i + 1;
    return (
      <Dot
        key={i}
        active={isCurrent}
        animate={{
          width: isCurrent ? 10 : 6,
        }}
        style={{
          backgroundColor: isCurrent
            ? theme.colors.blue[8]
            : theme.colors.neutral[2],
        }}
      />
    );
  });

  return (
    <Container {...props} justify={justify}>
      {dots}
    </Container>
  );
};

export default StepDots;
