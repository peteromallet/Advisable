import React from "react";
import { rgba, darken } from "polished";
import styled from "styled-components";
import { theme } from "@advisable/donut";

const StyledPrimarySkillOption = styled.button`
  width: 100%;
  border: none;
  display: flex;
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
  letter-spacing: -0.03rem;
  font-family: poppins, sans-serif;

  &:hover {
    background: ${darken(0.02, "#f5f5f8")};
  }
`;

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

export default function PrimraySkillOption({ number, children, ...rest }) {
  return (
    <StyledPrimarySkillOption {...rest}>
      <StyledPrimarySkillOptionNumber>{number}</StyledPrimarySkillOptionNumber>
      {children}
    </StyledPrimarySkillOption>
  );
}
