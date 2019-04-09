import styled, { css } from "styled-components";
import { rgba } from "polished";
import tick from "./tick.svg";
import colors from "../../colors";

export const Steps = styled.div``;

export const Number = styled.div`
  width: 25px;
  height: 25px;
  color: white;
  font-size: 12px;
  font-weight: 600;
  line-height: 25px;
  margin-right: 10px;
  text-align: center;
  border-radius: 20px;
  display: inline-block;
  background: ${colors.neutral.s3};
  transition: background-color 300ms;
`;

export const Step = styled.div`
  display: flex;
  font-size: 14px;
  padding: 15px 0;
  font-weight: 400;
  user-select: none;
  align-items: center;
  text-decoration: none;
  border-bottom: 1px solid #d8dded;
  cursor: ${props => (props.isDisabled ? "default" : "pointer")};

  &:last-child {
    border-bottom: none;
  }

  span {
    transition: color 300ms;
    color: ${colors.neutral.s6};
  }

  &:hover {
    span {
      color: ${colors.neutral.s8};
    }

    ${Number} {
      background: ${colors.neutral.s5};
    }
  }

  ${props => props.isDisabled && css`
    opacity: 0.7;

    ${Number}, &:hover ${Number} {
      color: white;
      background: ${colors.neutral.s3};
    }

    &:hover span {
      color: ${colors.neutral.s6};
    }
  `}

  ${props => props.isComplete && css`
    ${Number}, &:hover ${Number} {
      color: transparent;
      background: url(${tick}) no-repeat center;
      background-color: ${colors.teal.base};
    }
  `};

  &.active {
    ${Number} {
      color: white;
      background: ${colors.teal.base};
    }

    span {
      color: ${colors.neutral.s10};
      font-weight: 500;
    }
  }
`;
