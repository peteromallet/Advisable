import { motion } from "framer-motion";
import { StyledProgress, StyledProgressBar } from "./styles";

function Progress({ value, ...props }) {
  return (
    <StyledProgress {...props}>
      <StyledProgressBar
        as={motion.div}
        initial={{
          width: 0,
          opacity: 0,
        }}
        animate={{
          width: `${value}%`,
          opacity: 1,
        }}
        transition={{
          duration: 0.7,
        }}
      />
    </StyledProgress>
  );
}

Progress.defaultProps = {
  value: 0,
  size: "md",
  color: "blue",
};

export default Progress;
