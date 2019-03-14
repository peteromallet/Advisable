import styled, { keyframes } from "styled-components";
import { default as CardStyles } from "../../../components/Card";
import Text from "../../../components/Text";
import { Icon } from "../../../components/Icon/styles";
import { Status } from "../../../components/Status/styles";

export const Card = styled(CardStyles)`
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
`

export const Notice = styled.div`
  position: relative;
  background: #F2F3F7;
  border-radius: 10px;
  padding: 16px 16px 16px 55px;

  ${Icon} {
    top: 50%;
    left: 16px;
    color: #A7ADC1;
    position: absolute;
    transform: translateY(-50%);
  }

  ${Text} {
    margin-bottom: 2px;
  }
`

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
  background: #3C466A;
  margin-bottom: 16px;
  animation: ${loadingAnimation} 0.6s linear infinite alternate;
`;