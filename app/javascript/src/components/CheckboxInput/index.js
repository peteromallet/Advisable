import React from "react";
import { darken } from "polished";
import styled from "styled-components";
import { variant } from "styled-system";
import { theme, Box } from "@advisable/donut";
import FormField from "src/components/FormField";

const environmentWrapper = variant({
  prop: "environment",
  variants: {
    body: {
      backgroundColor: "#EAECF0",
      "&:hover": {
        background: darken(0.04, "#EAECF0"),
      },
      "&[data-selected='true']": {
        borderColor: darken(0.06, "#EAECF0"),
      },
    },
    card: {
      backgroundColor: "#f5f5f8",
      "&:hover": {
        background: darken(0.04, "#f5f5f8"),
      },
      "&[data-selected='true']": {
        borderColor: darken(0.06, "#f5f5f8"),
      },
    },
  },
});

const environmentCheckbox = variant({
  props: "environment",
  variants: {
    body: {
      backgroundColor: "#EAECF0",
    },
    card: {
      backgroundColor: "#f5f5f8",
    },
  },
});

const StyledCheckbox = styled.div`
  top: 50%;
  left: 16px;
  width: 20px;
  height: 20px;
  display: flex;
  margin-top: -10px;
  border-radius: 50%;
  position: absolute;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.neutral400};
  border: 2px solid ${theme.colors.neutral400};

  &[data-selected="true"] {
    color: white;
    border-color: ${theme.colors.blue800};
    background-color: ${theme.colors.blue800};
  }
  ${environmentCheckbox}
`;

const StyledCheckboxWrapper = styled.label`
  padding: 12px;
  font-size: 15px;
  font-weight: 400;
  line-height: 20px;
  position: relative;
  border-radius: 12px;
  padding-left: 52px;
  display: block;
  color: ${theme.colors.neutral900};
  border: 2px solid transparent;

  input {
    top: 0;
    left: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
  }

  ${environmentWrapper}
`;

function Checkbox({ children, environment, ...rest }) {
  return (
    <StyledCheckboxWrapper
      data-selected={rest.checked}
      environment={environment}
    >
      <input type="checkbox" {...rest} />
      <StyledCheckbox environment={environment} data-selected={rest.checked}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="8"
          fill="none"
          viewBox="0 0 10 8"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M9.799.243a.87.87 0 01-.016 1.131l-5.893 6.4a.66.66 0 01-.994 0L.217 4.865a.87.87 0 01-.015-1.131.662.662 0 011.01-.017l2.18 1.569L8.789.226a.662.662 0 011.01.017z"
            clipRule="evenodd"
          ></path>
        </svg>
      </StyledCheckbox>
      {children}
    </StyledCheckboxWrapper>
  );
}

function CheckboxInput({
  name,
  options,
  optionsPerRow,
  alignWidth,
  environment,
}) {
  return (
    <Box
      display="grid"
      gridTemplateColumns={`repeat(${optionsPerRow || 1}, ${
        alignWidth ? "minmax(0, 1fr)" : "auto"
      })`}
      gridColumnGap={2}
      gridRowGap={2}
    >
      {options.map((option, i) => (
        <FormField
          key={i}
          type="checkbox"
          value={option?.value || option}
          as={Checkbox}
          environment={environment}
          name={name}
          aria-label={option?.label || option}
        >
          {option?.label || option}
        </FormField>
      ))}
    </Box>
  );
}

CheckboxInput.defaultProps = {
  environment: "card",
};

export default CheckboxInput;
