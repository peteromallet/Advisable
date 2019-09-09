import styled from "styled-components";
import { space } from "styled-system";

export const AlertStyles = styled.div`
  ${space}

  padding: 16px;
  border-radius: 12px;
  background: #ffecc7;
  border-top: 4px solid #ffde9d;
`;

export const IconWrapper = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  border-radius: 10px;
  background: #ffc149;
  align-items: center;
  justify-content: center;

  svg {
    color: #593b00;
  }
`;
