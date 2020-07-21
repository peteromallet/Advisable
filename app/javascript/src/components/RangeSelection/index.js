import React from "react";
import { darken } from "polished";
import { theme } from "@advisable/donut";
import { motion } from "framer-motion";
import {
  StyledRangeSelection,
  StyledRangeSelectionOption,
  StyledRangeSelectionOptionLabel,
  StyledRangeSelectionOptionCircle,
  StyledRangeSelectionOptionWrapper,
  StyledRAngeSelectionOptionBackground,
} from "./styles";

const variants = {
  background: {
    rest: {
      scaleX: 1,
      scaleY: 1,
      backgroundColor: "#F5F5F8",
    },
    hover: {
      scaleX: 1.04,
      scaleY: 1.08,
      backgroundColor: darken(0.04, "#F5F5F8"),
    },
    selected: {
      scaleX: 1.04,
      scaleY: 1.08,
      backgroundColor: theme.colors.blue100,
    },
  },
  circle: {
    rest: {
      y: 0,
      backgroundColor: "white",
      color: theme.colors.blue900,
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
    },
    hover: {
      y: -4,
      backgroundColor: "white",
      color: theme.colors.blue700,
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
    },
    selected: {
      color: "white",
      backgroundColor: theme.colors.blue700,
    },
  },
};

export default function RangeSelection({ value, onChange, options }) {
  const choices = options.map((option, index) => {
    const isSelected = value === option.value;
    return (
      <StyledRangeSelectionOptionWrapper
        as={motion.div}
        key={option.value}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.12 }}
      >
        <StyledRangeSelectionOption
          as={motion.div}
          initial={isSelected ? "selected" : "rest"}
          animate={isSelected ? "selected" : "rest"}
          whileHover={!isSelected && "hover"}
          aria-label={option.label}
          onClick={() => onChange(option.value)}
        >
          <StyledRAngeSelectionOptionBackground
            as={motion.div}
            variants={variants.background}
          />
          <StyledRangeSelectionOptionCircle
            as={motion.div}
            variants={variants.circle}
          >
            {index + 1}
          </StyledRangeSelectionOptionCircle>
          <StyledRangeSelectionOptionLabel>
            {option.label}
          </StyledRangeSelectionOptionLabel>
        </StyledRangeSelectionOption>
      </StyledRangeSelectionOptionWrapper>
    );
  });

  return <StyledRangeSelection>{choices}</StyledRangeSelection>;
}

RangeSelection.defaultProps = {
  options: [
    { label: "Not Important", value: 0 },
    { label: "Not Sure", value: 1 },
    { label: "Important", value: 2 },
    { label: "Very Important", value: 3 },
  ],
};
