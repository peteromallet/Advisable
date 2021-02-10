import styled, { css } from "styled-components";
import { theme } from "../../../../../donut/src";
import tick from "./tick.svg";

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
  background: ${theme.colors.neutral300};
  transition: background-color 300ms;
`;

export const Step = styled.div`
  display: flex;
  font-size: 14px;
  font-weight: 400;
  user-select: none;
  align-items: center;
  text-decoration: none;
  border-bottom: 1px solid #d8dded;
  cursor: ${(props) => (props.isDisabled ? "default" : "pointer")};

  > div,
  > a {
    width: 100%;
    display: flex;
    padding: 15px 0;
    align-items: center;
    text-decoration: none;
  }

  &:last-child {
    border-bottom: none;
  }

  span {
    transition: color 300ms;
    color: ${theme.colors.neutral600};
  }

  &:hover {
    span {
      color: ${theme.colors.neutral800};
    }

    ${Number} {
      background: ${theme.colors.neutral500};
    }
  }

  ${(props) =>
    props.isDisabled &&
    css`
      opacity: 0.7;

      ${Number}, &:hover ${Number} {
        color: white;
        background: ${theme.colors.neutral300};
      }

      &:hover span {
        color: ${theme.colors.neutral600};
      }
    `}

  > div, > a {
    &.active {
      span {
        font-weight: 500;
        color: ${theme.colors.neutral900};
      }

      ${Number} {
        color: white;
        background: ${theme.colors.green500};
      }
    }
  }

  ${(props) =>
    props.isComplete &&
    css`
      > div,
      > a {
        ${Number}, &:hover ${Number} {
          color: transparent;
          background: url(${tick}) no-repeat center;
          background-color: ${theme.colors.green500};
        }
      }
    `};
`;
