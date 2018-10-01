import styled from "styled-components";

export const Choices = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const Choice = styled.div`
  flex: 1 0 0%;
  margin-left: 10px;
  margin-right: 10px;

  &:first-child { margin-left: 0; }
  &:last-child { margin-right: 0; }

  input {
    width: 0;
    height: 0;
    opacity: 0;
    appearance: none;
    position: absolute;
  }

  label {
    width: 100%;
    display: block;
    cursor: pointer;
    border-radius: 8px;
    position: relative;
    background: #ffffff;
    border: 1px solid #e4e9f5;
    padding: 14px 15px 16px 50px;
  }

  label::before {
    top: 50%;
    left: 15px;
    content: "";
    width: 18px;
    height: 18px;
    position: absolute;
    border-radius: 100%;
    background: #e7edf7;
    transform: translateY(-50%);
    transition: background 400ms;
  }

  label::after {
    top: 50%;
    left: 20px;
    width: 8px;
    opacity: 0;
    height: 8px;
    content: "";
    background: white;
    position: absolute;
    border-radius: 100%;
    transform: translateY(-50%) scale(0);
    transition: opacity 400ms, transform 400ms;
  }

  input:checked + label::before {
    background-color: #0064ff;
  }

  input:checked + label::after {
    opacity: 1;
    transform: translateY(-50%) scale(1);
  }

  strong {
    display: block;
    color: #0a2248;
    font-size: 16px;
    font-weight: 600;
    line-height: 16px;
    margin-bottom: 2px;
    letter-spacing: -0.03em;
  }

  small {
    display: block;
    color: #5f7290;
    font-size: 14px;
    line-height: 14px;
    letter-spacing: -0.03em;
  }

  input:checked + label {
    color: red;
    border-color: #f4f7fc;
    background-color: #f4f7fc;
  }
`;
