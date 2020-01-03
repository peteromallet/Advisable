import styled, { css, keyframes } from "styled-components";
import { Icon } from "../Icon/styles";
import { Status } from "../Status/styles";
import colors from "../../colors";
import { theme } from "@advisable/donut";

export const Title = styled.h5`
  color: #0a153d;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  margin-bottom: 2px;
`;

export const Description = styled.p`
  color: #565e7d;
  font-size: 13px;
  line-height: 17px;
`;

export const Detail = styled.div`
  font-size: 13px;
  font-weight: 500;
  margin-right: 20px;
  align-items: center;
  display: inline-flex;
  margin-left: -5px;
  color: #747a93;

  strong {
    color: #363a4c;
  }

  ${Icon} {
    color: #747a93;
  }
`;

export const Row = styled.div`
  display: flex;
  margin-top: -1px;
  user-select: none;
  padding: 10px 30px;
  position: relative;
  align-items: center;
  min-height: 60px;
  border-top: 1px solid #eceff8;
  border-bottom: 1px solid #eceff8;

  @media (max-width: 900px) {
    display: block;
    padding-left: 20px;
    padding-right: 20px;
  }
`;

export const Task = styled(Row)`
  &:hover {
    cursor: pointer;
    background: #fafbfe;

    ${Title} {
      color: ${colors.blue.base};
    }
  }

  ${Status} {
    top: 50%;
    right: 20px;
    position: absolute;
    transform: translateY(-50%);

    @media (max-width: 900px) {
      top: auto;
      right: auto;
      margin-top: 8px;
      position: static;
      transform: translateY(0);
    }
  }
`;

export const TaskContent = styled.div``;

export const TaskList = styled.div``;

const promptAnimation = keyframes`
  0% {
    transform: translateX(-8px) translateY(-50%);
  }

  50% {
    transform: translateX(0) translateY(-50%);
  }
  
  100% {
    transform: translateX(-8px) translateY(-50%);
  }
`;

export const StyledTaskPrompt = styled.div`
  top: 50%;
  left: 8px;
  color: #ff7a00;
  position: absolute;
  transform: translateY(-50%);
  animation: ${promptAnimation} 1s infinite;
`;
