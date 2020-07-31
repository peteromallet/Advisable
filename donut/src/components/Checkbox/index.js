import React from "react";
import { motion } from "framer-motion";
import {
  StyledCheckbox,
  StyledCheckboxInput,
  StyledCheckboxToggle,
  StyledCheckboxContent,
  StyledCheckboxInner,
  StyledCheckboxToggleCheck,
  StyledCheckboxText,
} from "./styles";

const Checkbox = React.forwardRef(function Checkbox(
  { children, m, mx, my, mt, mr, mb, ml, size, ...props },
  ref,
) {
  const checkVariants = {
    checked: { scale: 1 },
    unchecked: { scale: 0 },
  };

  return (
    <StyledCheckbox m={m} mx={mx} my={my} mt={mt} mr={mr} mb={mb} ml={ml}>
      <StyledCheckboxInner>
        <StyledCheckboxInput
          {...props}
          ref={ref}
          role="checkbox"
          type="checkbox"
          aria-checked={props.checked}
        />
        <StyledCheckboxToggle
          as={motion.div}
          aria-hidden="true"
          size={size}
          animate={props.checked ? "checked" : "unchecked"}
        >
          <StyledCheckboxToggleCheck as={motion.div} variants={checkVariants}>
            <svg width={14} height={14} fill="none">
              <path
                d="M3 7.243L5 10l6-6"
                stroke="white"
                strokeWidth={1.6}
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={checkVariants}
              />
            </svg>
          </StyledCheckboxToggleCheck>
        </StyledCheckboxToggle>
        <StyledCheckboxContent>
          <StyledCheckboxText>{children}</StyledCheckboxText>
        </StyledCheckboxContent>
      </StyledCheckboxInner>
    </StyledCheckbox>
  );
});

Checkbox.defaultProps = {
  size: "m",
};

export default Checkbox;
