import { rgba } from "polished";
import styled from "styled-components";
import { theme } from "@advisable/donut";

export const Choices = styled.div`
  display: flex;
  flex-wrap: wrap;

  @media screen and (max-width: 500px) {
    display: block;
  }
`;

export const Circle = styled.span`
  top: 50%;
  left: 16px;
  width: 18px;
  height: 18px;
  margin-right: 8px;
  position: absolute;
  border-radius: 10px;
  display: inline-block;
  transform: translateY(-50%);
  border: 2px solid rgba(34, 40, 66, 0.2);

  &:after {
    top: 50%;
    left: 50%;
    content: "";
    width: 10px;
    height: 10px;
    margin-top: -5px;
    margin-left: -5px;
    border-radius: 5px;
    position: absolute;
    background-color: #173fcd;

    opacity: 0;
    transform: scale(0);
    transition: opacity 300ms, transform 300ms;
  }
`;

export const Choice = styled.div`
  flex: 1 0 0%;
  margin-left: 4px;
  margin-right: 4px;
  position: relative;

  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }

  @media screen and (max-width: 500px) {
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 8px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  input {
    width: 0;
    height: 0;
    opacity: 0;
    appearance: none;
    position: absolute;
  }

  label {
    width: 100%;
    display: flex;
    cursor: pointer;
    border-radius: 8px;
    position: relative;
    align-items: center;
    padding: 14px 15px 16px 46px;
    border: 2px solid transparent;
    background: ${rgba(theme.colors.neutral100, 0.7)};

    &:hover {
      background: ${rgba(theme.colors.neutral100, 0.8)};
    }
  }

  input:checked + label {
    border-color: ${theme.colors.neutral200};

    ${Circle} {
      border-color: #173fcd;

      &:after {
        opacity: 1;
        transform: scale(1);
      }
    }
  }
`;
