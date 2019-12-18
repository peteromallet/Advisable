import React from "react";
import { motion } from "framer-motion";
import {
  StyledCheckbox,
  StyledCheckboxInput,
  StyledCheckboxToggle,
  StyledCheckboxContent,
  StyledCheckboxInner,
  StyledCheckboxText,
} from "./styles";

const Checkbox = ({ children, m, mx, my, mt, mr, mb, ml, size, ...props }) => {
  const checkVariants = {
    checked: { scale: 1 },
    unchecked: { scale: 0 },
  };

  return (
    <StyledCheckbox m={m} mx={mx} my={my} mt={mt} mr={mr} mb={mb} ml={ml}>
      <StyledCheckboxInner>
        <StyledCheckboxInput
          {...props}
          role="checkbox"
          type="checkbox"
          aria-checked={props.checked}
        />
        <StyledCheckboxToggle aria-hidden="true" size={size}>
          <motion.svg
            width={14}
            height={14}
            fill="none"
            animate={props.checked ? "checked" : "unchecked"}
          >
            <motion.path
              d="M3 7.243L5 10l6-6"
              stroke="white"
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={checkVariants}
            />
          </motion.svg>
        </StyledCheckboxToggle>
        <StyledCheckboxContent>
          <StyledCheckboxText>{children}</StyledCheckboxText>
        </StyledCheckboxContent>
      </StyledCheckboxInner>
    </StyledCheckbox>
  );
};

Checkbox.defaultProps = {
  size: "m",
};

export default Checkbox;
