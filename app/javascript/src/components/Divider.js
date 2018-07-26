import styled from "styled-components";
import { withSpacing } from "./Spacing";

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: rgba(18, 35, 63, 0.15);
`;

export default withSpacing(Divider);
