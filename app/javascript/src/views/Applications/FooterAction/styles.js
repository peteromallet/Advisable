import styled from "styled-components";
import colors from "../../../colors";

export const FooterAction = styled.div`
  padding: 20px;
  font-size: 15px;
  padding-left: 60px;
  border-radius: 30px;
  position: relative;
  color: ${colors.neutral.s9};
  border: 1px solid ${colors.neutral.s2};

  svg {
    top: 50%;
    left: 20px;
    margin-top: -12px;
    position: absolute;
    color: ${colors.neutral.s4};
  }
`;
