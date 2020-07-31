import React from "react";
import { darken } from "polished";
import styled, { css } from "styled-components";
import { theme } from "@advisable/donut";

const StyledRequiredCharacteristicCheckbox = styled.div`
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

const StyledRequiredCharacteristic_Selected = css`
  border-color: ${theme.colors.neutral100};

  ${StyledRequiredCharacteristicCheckbox} {
    color: white;
    border-color: ${theme.colors.blue800};
    background-color: ${theme.colors.blue800};
  }
`;

const StyledRequiredCharacteristic = styled.label`
  padding: 12px;
  font-size: 15px;
  font-weight: 400;
  line-height: 20px;
  margin-bottom: 8px;
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

  ${(p) => p.$selected && StyledRequiredCharacteristic_Selected};
`;

export default function RequiredCharacteristic({ children, ...rest }) {
  return (
    <StyledRequiredCharacteristic $selected={rest.checked}>
      <input type="checkbox" {...rest} />
      <StyledRequiredCharacteristicCheckbox>
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
      </StyledRequiredCharacteristicCheckbox>
      {children}
    </StyledRequiredCharacteristic>
  );
}
