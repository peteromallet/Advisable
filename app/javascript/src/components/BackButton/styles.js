import styled from "styled-components";
import { margin } from "styled-system";
import { theme } from "@advisable/donut";

export const StyledBackButton = styled.div`
  ${margin};

  width: 40px;
  height: 40px;
  border-radius: 50%;
  position: relative;
  display: inline-flex;
  background: ${theme.colors.neutral100};

  a {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    position: absolute;
  }
`;
