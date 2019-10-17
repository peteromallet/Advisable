import styled from "styled-components";
import { Card } from "@advisable/donut";

export const StyledSpecialist = styled(Card.Styled)`
  width: 320px;
  height: 480px;
  padding: 25px;
  margin-right: 28px;
  border-radius: 12px;
  position: relative;
  box-shadow: 0px 4px 50px rgba(23, 23, 34, 0.08),
    0px 4px 8px rgba(65, 66, 81, 0.02);
`;

export const Header = styled.div`
  height: 52px;
  display: flex;
  padding: 0 20px;
  background: white;
  margin-bottom: 20px;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 1px 2px rgba(23, 23, 34, 0.08);

  > svg {
    margin-top: -4px;
  }
`;
