import styled, { keyframes } from "styled-components";
import { StyledCard } from "@advisable/donut";
import Text from "../../../components/Text";
import { Status } from "../../../components/Status/styles";

export const Card = styled(StyledCard)`
  position: relative;

  ${Status} {
    top: 26px;
    right: 20px;
    position: absolute;
  }

  @media (max-width: 900px) {
    ${Status} {
      top: auto;
      right: auto;
      margin-top: 8px;
      position: relative;
    }
  }
`;

export const Notice = styled.div`
  position: relative;
  background: #f2f3f7;
  border-radius: 10px;
  padding: 16px 16px 16px 55px;

  svg {
    top: 50%;
    left: 16px;
    color: #a7adc1;
    position: absolute;
    transform: translateY(-50%);
  }

  ${Text} {
    margin-bottom: 2px;
  }
`;

const loadingAnimation = keyframes`
  from {
    opacity: 0.05;
  }

  to {
    opacity: 0.1;
  }
`;

export const SkeletonApplication = styled.div`
  height: 90px;
  border-radius: 6px;
  background: #3c466a;
  margin-bottom: 16px;
  animation: ${loadingAnimation} 0.6s linear infinite alternate;
`;
