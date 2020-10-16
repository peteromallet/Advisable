import styled from "styled-components";
import { Text } from "@advisable/donut";
import { motion, transform } from "framer-motion";

const StyledApplicantScore = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  border-radius: 50%;
  background: #eafafa;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  border: 4px solid white;
`;

const StyledApplicantScoreCircle = styled.svg`
  top: 50%;
  left: 50%;
  width: 50px;
  height: 50px;
  position: absolute;
  transform: translate(-50%, -50%);

  path {
    stroke: #24a2a6;
  }
`;

function ApplicantScore({ score }) {
  const range = transform(score, [0, 100], [0.25, 1]);

  return (
    <StyledApplicantScore>
      <StyledApplicantScoreCircle viewerBox="0 0 50 50">
        <motion.path
          as={motion.path}
          fill="none"
          strokeWidth="2"
          strokeDasharray="0 1"
          d="M 0, 24 a 24, 24 0 1,0 48,0 a 24, 24 0 1,0 -48,0"
          transition={{ duration: 1 }}
          style={{
            rotate: 90,
            translateX: 1,
            translateY: 1,
            scaleX: -1, // Reverse direction of line animation
          }}
          initial={{
            pathLength: 0,
          }}
          animate={{
            pathLength: range,
          }}
        />
      </StyledApplicantScoreCircle>
      <Text
        fontSize="16px"
        color="neutral900"
        marginBottom="1px"
        fontWeight="medium"
        letterSpacing="-0.04em"
      >
        {score}%
      </Text>
      <Text
        fontSize="9px"
        color="neutral600"
        fontWeight="medium"
        letterSpacing="-0.04em"
        textTransform="uppercase"
      >
        Match
      </Text>
    </StyledApplicantScore>
  );
}

export default ApplicantScore;
