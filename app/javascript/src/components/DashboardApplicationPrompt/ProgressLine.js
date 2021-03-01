import React from "react";
import { theme, Box } from "@advisable/donut";
import CheckIcon from "src/components/CheckIcon";
import styled from "styled-components";

const StyledCheckCircle = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #c6b5a7;
  color: ${theme.colors.white};

  &[data-active="true"] {
    background: #2ebcc0;
  }
`;

const LineBase = styled.div`
  flex: 1;
  position: relative;
  background: #e9d8cb;
  height: 4px;
  margin: 12px;
  border-radius: 2px;
`;

const LineFilled = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 2px;
  height: 4px;
  background: #2ebcc0;
`;

const Line = ({ width }) => (
  <LineBase>
    <LineFilled width={width} />
  </LineBase>
);

const CheckPoint = ({ active }) => (
  <StyledCheckCircle data-active={active}>
    <CheckIcon />
  </StyledCheckCircle>
);

export default function ProgressLine({ progress }) {
  return (
    <Box
      display="flex"
      width="100%"
      height="32px"
      justifyContent="space-between"
      alignItems="center"
      bg="#EBE4DF"
      borderRadius="16px"
      flexWrap="nowrap"
      p="5px"
    >
      <CheckPoint active={progress > 0} />
      <Line width={(progress == 2 && "50%") || (progress > 2 && "100%")} />
      <CheckPoint active={progress >= 3} />
      <Line width={(progress == 4 && "50%") || (progress > 4 && "100%")} />
      <CheckPoint active={progress === 5} />
    </Box>
  );
}
