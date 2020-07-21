import React from "react";
import { rgba, darken } from "polished";
import styled, { css } from "styled-components";
import { theme } from "@advisable/donut";

const StyledPrimarySkillOptionNumber = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  color: #9999af;
  font-size: 14px;
  font-weight: 600;
  background: white;
  border-radius: 50%;
  margin-right: 12px;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px -2px ${rgba(theme.colors.blue900, 0.16)};
`;

const StyledPrimarySkillOption_Selected = css`
  border-color: ${theme.colors.blue700};

  ${StyledPrimarySkillOptionNumber} {
    color: ${theme.colors.blue600};
  }
`;

const StyledPrimarySkillOption = styled.div`
  width: 100%;
  border: none;
  display: flex;
  outline: none;
  color: #393e66;
  font-size: 16px;
  cursor: pointer;
  appearance: none;
  text-align: left;
  font-weight: 500;
  margin-bottom: 8px;
  padding: 12px 12px;
  background: #f5f5f8;
  border-radius: 16px;
  align-items: center;
  position: relative;
  letter-spacing: -0.03rem;
  border: 2px solid transparent;
  font-family: poppins, sans-serif;
  ${(props) => props.$selected && StyledPrimarySkillOption_Selected};

  &:hover {
    background: ${darken(0.02, "#f5f5f8")};
  }

  input {
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
  }
`;

export default function PrimraySkillOption({ number, children, ...rest }) {
  return (
    <StyledPrimarySkillOption $selected={rest.checked}>
      <input type="radio" {...rest} />
      <StyledPrimarySkillOptionNumber>{number}</StyledPrimarySkillOptionNumber>
      {children}
    </StyledPrimarySkillOption>
  );
}
