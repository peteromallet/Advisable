import React from "react";
import css from "@styled-system/css";
import { Box, Text, theme } from "@advisable/donut";
import { Field } from "formik";
import styled from "styled-components";
import { Check } from "@styled-icons/heroicons-solid";

const GOALS = [
  "Generate Leads",
  "Increase Brand Awareness",
  "Improve Conversion",
  "Rebranding",
  "Increase Web Traffic",
  "Improve Retention",
  "Improve Profitability",
  "Improve Processes",
  "Analyse Existing Activities",
  "Improve Efficiency",
];

const StyledGoalCheckbox = styled.div(
  css({
    width: "24px",
    height: "24px",
    marginRight: 2,
    display: "flex",
    border: "2px solid",
    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "neutral200",

    svg: {
      width: "16px",
      color: "neutral300",
    },
  }),
);

const StyledGoal = styled.label(
  css({
    padding: 5,
    display: "flex",
    cursor: "pointer",
    borderRadius: "12px",
    alignItems: "center",
    position: "relative",
    transition: "transform 200ms, box-shadow 200ms",
    boxShadow: `0 0 0 1px ${theme.colors.neutral200}`,
    "&:hover": {
      transform: "translateY(-1px)",
      boxShadow: `0 0 0 2px ${theme.colors.neutral200}, 0 4px 28px -4px rgba(0, 0, 0, 0.16)`,
    },

    input: {
      opacity: 0.00001,
      position: "absolute",
      [`&:checked + ${StyledGoalCheckbox}`]: {
        bg: "blue500",
        borderColor: "blue500",
        svg: {
          color: "white",
        },
      },
    },
  }),
);

export default function GoalsFields() {
  return (
    <Box
      display="grid"
      gridGap={{
        _: "12px",
      }}
      gridTemplateColumns={{
        _: "1fr",
        m: "1fr 1fr",
      }}
    >
      {GOALS.map((g) => (
        <StyledGoal key={g}>
          <Field name="goals" type="checkbox" value={g} />
          <StyledGoalCheckbox>
            <Check />
          </StyledGoalCheckbox>
          <Text fontWeight={500} letterSpacing="-0.02em">
            {g}
          </Text>
        </StyledGoal>
      ))}
    </Box>
  );
}
