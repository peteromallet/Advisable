import styled from "styled-components";
import { withSpacing } from "./Spacing";

const Card = styled.div`
  background: #FFFFFF;
  border-radius: 3px;
  box-shadow: 0 4px 10px 0 rgba(208,217,233,0.38);
`

Card.Section = styled.div`
  padding: 25px;
`

export default withSpacing(Card)
