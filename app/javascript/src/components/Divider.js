import { rgba } from "polished";
import styled from "styled-components";
import { withSpacing } from "./Spacing";

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: ${rgba("#0A2248", 0.1)};
`;

export default withSpacing(Divider);
