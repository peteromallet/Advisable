import styled from "styled-components";
import { rgba } from "polished";
import { Link } from "react-router-dom";
import { Icon } from "src/components/Icon";

export const Container = styled.div`
  padding: 30px;
  max-width: 600px;
  background: #ffffff;
  border-radius: 3px;
  position: relative;
  margin: 80px auto 80px auto;
  box-shadow: 0 4px 10px 0 rgba(208, 217, 233, 0.38);

  @media (max-width: 650px) {
    margin-top: 0;
    max-width: 100%;
    border-radius: 0;
    min-height: 100vh;
  }
`;

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
  &:hover { color: #173FCD; }
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
  position: relative;
  border-radius: 5px;
  margin-bottom: 30px;
  text-decoration: none;
  text-align: left;
  padding: 15px 20px 15px 60px;
  border: 1px solid rgba(23, 63, 205, 0.2);

  ${Icon} {
    top: 50%;
    left: 20px;
    position: absolute;
    transform: translateY(-50%);
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
`;

export const Centered = styled.div`
  text-align: center;
`;
