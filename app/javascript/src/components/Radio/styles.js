import styled, { css } from "styled-components";
import { theme } from "@advisable/donut";
import InputDescription from "../InputDescription";

export const Radio = styled.div`
  user-select: none;
`;

export const Circle = styled.div`
  left: 0;
  top: 50%;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  position: absolute;
  border: 2px solid #a0a4af;
  transform: translateY(-50%);
  transition: background-color 100ms;

  &::after {
    top: 0;
    left: 0;
    content: "";
    width: 100%;
    height: 100%;
    background: white;
    border-radius: 50%;
    position: absolute;
    opacity: 0;
    transition: opacity 300ms, transform 200ms;
  }
`;

export const Value = styled.div`
  font-size: 15px;
  color: ${theme.colors.neutral[8]};
`;

const borderedStyling = css`
  padding: 16px;
  border-radius: 8px;
  padding-left: 42px;
  border: 1px solid ${theme.colors.neutral[2]};

  &:hover {
    border-color: ${theme.colors.neutral[3]};
  }

  ${Circle} {
    left: 16px;
  }
`;

export const Label = styled.label`
  display: block;
  cursor: pointer;
  font-weight: 500;
  position: relative;
  padding-left: 26px;

  &:hover ${Circle} {
    background-color: #f0f2f7;
  }

  ${props => props.variation === "bordered" && borderedStyling};

  ${InputDescription} {
    padding-top: 2px;
  }
`;

export const Input = styled.input`
  opacity: 0;
  position: absolute;
  pointer-events: none;

  &:checked + ${Label} ${Circle} {
    border-color: ${theme.colors.blue[5]};
    background-color: ${theme.colors.blue[5]};
  }

  &:checked + ${Label} ${Circle}::after {
    opacity: 1;
    transform: scale(0.4);
  }
`;

export default Radio;
