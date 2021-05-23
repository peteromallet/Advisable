import React from "react";
import { darken } from "polished";
import styled, { css } from "styled-components";
import { theme, Box } from "@advisable/donut";
import FormField from "src/components/FormField";

const StyledCheckbox = styled.div`
  top: 50%;
  left: 16px;
  width: 20px;
  height: 20px;
  display: flex;
  margin-top: -10px;
  background: white;
  border-radius: 50%;
  position: absolute;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.neutral400};
  border: 2px solid ${theme.colors.neutral400};
`;

const StyledCheckboxWrapper_Selected = css`
  border-color: ${theme.colors.neutral100};

  ${StyledCheckbox} {
    color: white;
    border-color: ${theme.colors.blue800};
    background-color: ${theme.colors.blue800};
  }
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
  background-color: #f5f5f8;
  color: ${theme.colors.neutral900};
  border: 2px solid transparent;

  &:hover {
    background: ${darken(0.04, "#f5f5f8")};
  }

  input {
    top: 0;
    left: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
  }

  ${(p) => p.$selected && StyledCheckboxWrapper_Selected};
`;

function Checkbox({ children, ...rest }) {
  return (
    <StyledCheckboxWrapper $selected={rest.checked}>
      <input type="checkbox" {...rest} />
      <StyledCheckbox>
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

export default function CheckboxInput({
  name,
  options,
  optionsPerRow,
  alignWidth,
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
          name={name}
          aria-label={option?.label || option}
        >
          {option?.label || option}
        </FormField>
      ))}
    </Box>
  );
}
