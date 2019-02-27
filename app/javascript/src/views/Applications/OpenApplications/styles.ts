import styled from "styled-components";
import { default as CardStyles } from "../../../components/Card";
import { Icon } from "../../../components/Icon/styles";
import { Status } from "../../../components/Status/styles";

export const Card = styled(CardStyles)`
  position: relative;

  ${Status} {
    top: 26px;
    right: 20px;
    position: absolute;
  }
`

export const Notice = styled.div`
  position: relative;
  background: #F2F3F7;
  border-radius: 10px;
  padding: 16px 16px 16px 50px;

  ${Icon} {
    top: 50%;
    left: 16px;
    color: #A7ADC1;
    position: absolute;
    transform: translateY(-50%);
  }
`