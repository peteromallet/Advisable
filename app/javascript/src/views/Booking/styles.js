import styled from "styled-components";
import colors from "../../colors";

export const Skill = styled.h5`
  color: ${colors.neutral.s7};
  font-size: 15px;
  line-height: 20px;
`;

export const Detail = styled.div`
  display: flex;
  padding: 16px 0;
  align-items: center;
  border-top: 1px solid #d7ddec;
  border-bottom: 1px solid #d7ddec;
`;

export const DetailLabel = styled.span`
  flex-grow: 1;
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
  color: ${colors.neutral.s7};
`;

export const DetailValue = styled.span`
  font-size: 14px;
  font-weight: 600;
  line-height: 19px;
  color: ${colors.neutral.s9};
`;
