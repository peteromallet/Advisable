import styled from "styled-components";
import {Icon} from "../../components/Icon/styles";

export const Message = styled.div`
  padding: 20px;
  color: #2b3169;
  font-size: 14px;
  line-height: 18px;
  border-radius: 8px;
  background: #fff3dc;
`;

export const Title = styled.div`
  color: #e49600;
  font-weight: 500;
  margin-bottom: 4px;
  font-size: 14px;
  display: flex;
  align-items: center;

  ${Icon} {
    margin-left: -4px;
  }
`;
