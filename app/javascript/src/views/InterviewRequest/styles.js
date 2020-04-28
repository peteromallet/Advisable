import styled from "styled-components";
import { rgba } from "polished";
import { Link } from "react-router-dom";
import { theme } from "@advisable/donut";

export const Day = styled(Link)`
  display: block;
  padding: 15px 20px;
  border-radius: 5px;
  position: relative;
  margin-bottom: 10px;
  text-decoration: none;
  border: 1px solid rgba(23, 63, 205, 0.2);

  &:hover {
    border: 1px solid rgba(23, 63, 205, 1);
  }

  h4 {
    color: #142150;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 4px;
    letter-spacing: -0.01em;
  }

  span {
    color: #4c5a8c;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: -0.01em;
  }

  svg {
    top: 50%;
    right: 20px;
    position: absolute;
    transform: translateY(-50%);
  }
`;

export const RequestMore = styled.a`
  color: #202a4e;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  letter-spacing: -0.04em;
  &:hover {
    color: #173fcd;
  }
`;

export const Times = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -15px;
  margin-top: 30px;
`;

export const Time = styled(Link)`
  flex: 1 1 200px;
  color: #173fcd;
  font-size: 15px;
  padding: 10px 0;
  font-weight: 600;
  margin-left: 15px;
  text-align: center;
  border-radius: 5px;
  margin-bottom: 15px;
  text-decoration: none;
  display: inline-block;
  letter-spacing: -0.01em;
  border: 1px solid rgba(23, 63, 205, 0.2);

  &:hover {
    border-color: ${rgba("#173fcd", 0.5)};
  }
`;

export const Event = styled.div`
  display: block;
  text-align: left;
  position: relative;
  border-radius: 12px;
  text-decoration: none;
  padding: 15px 20px 15px 60px;
  background: ${theme.colors.neutral100};

  svg {
    top: 50%;
    left: 20px;
    position: absolute;
    transform: translateY(-50%);
  }

  h4 {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 4px;
    letter-spacing: -0.01em;
    color: ${theme.colors.neutral900};
  }

  span {
    color: #4c5a8c;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: -0.01em;
  }
`;

export const Centered = styled.div`
  text-align: center;
`;
