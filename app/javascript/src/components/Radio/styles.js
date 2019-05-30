import styled, { css } from "styled-components";
import colors from "../../colors";
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
  font-weight: 500;
  color: ${colors.neutral.s10};
  letter-spacing: -0.01rem;
`;

const borderedStyling = css`
  padding: 16px;
  border-radius: 8px;
  padding-left: 42px;
  border: 1px solid ${colors.neutral.s2};

  &:hover {
    border-color: ${colors.neutral.s3};
  }

  ${Circle} {
    left: 16px;
  }
`;

export const Label = styled.label`
  display: block;
  cursor: pointer;
  position: relative;
  padding-left: 28px;

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
    border-color: ${colors.blue.base};
    background-color: ${colors.blue.base};
  }

  &:checked + ${Label} ${Circle}::after {
    opacity: 1;
    transform: scale(0.4);
  }
`;

export default Radio;
