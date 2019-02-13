import styled, { css } from "styled-components";
import { rgba } from "polished";
import tick from "./tick.svg";

export const Steps = styled.div``;

export const Number = styled.div`
  width: 25px;
  height: 25px;
  color: white;
  font-size: 12px;
  font-weight: 600;
  margin-right: 8px;
  align-items: center;
  background: #d2d7e7;
  border-radius: 20px;
  display: inline-flex;
  justify-content: center;
  transition: background-color 300ms;
`;

export const Step = styled.div`
  border-bottom: 1px solid #d8dded;

  > div,
  > a {
    display: flex;
    font-size: 15px;
    padding: 15px 0;
    font-weight: 500;
    user-select: none;
    align-items: center;
    text-decoration: none;
    cursor: ${props => (props.isDisabled ? "default" : "pointer")};

    span {
      color: #8991af;
      transition: color 300ms;
    }

    &:hover {
      color: #5B637E;
      ${Number} {
        color: white;
        background: #C4C9DB; 
      }
    }

    &.active {
      ${Number} {
        color: #173fcd;
        background: white;
        box-shadow: 0px 2px 6px rgba(1, 14, 60, 0.08);
      }

      span {
        color: #0a1745;
      }
    }
  }

  ${props => props.isComplete && css`
    > div,
    > a {
      color: ${rgba("#173FCD", 0.5)};

      ${Number} {
        color: transparent;
        background: url(${tick}) no-repeat center;
        background-color: ${rgba("#173FCD", 0.5)};
      }
    }
  `};
`;
