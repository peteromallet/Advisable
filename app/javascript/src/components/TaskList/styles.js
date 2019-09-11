import styled, { css, keyframes } from "styled-components";
import { Icon } from "../Icon/styles";
import { Status } from "../Status/styles";
import colors from "../../colors";

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

  ${props =>
    props.showPrompt &&
    css`
      padding-left: 55px;
    `}

  @media (max-width: 900px) {
    display: block;
    padding-left: ${props => (props.showPrompt ? "45px" : "20px")};
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
    opacity: 0;
  }

  50% {
    opacity: 0.5;
  }

  100% {
    opacity: 0;
  }
`;

export const Prompt = styled.div`
  top: 50%;
  width: 6px;
  left: 30px;
  height: 6px;
  border-radius: 50%;
  position: absolute;
  transform: translateY(-50%);
  background: ${colors.blue.base};

  @media (max-width: 900px) {
    left: 20px;
  }

  &::before {
    content: "";
    top: -3px;
    left: -3px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    position: absolute;
    border: 1px solid ${colors.blue.base};
    animation: ${promptAnimation} 2s infinite;
  }
`;
