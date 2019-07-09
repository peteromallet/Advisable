import styled from "styled-components";
import { theme } from "@advisable/donut";

export const PaymentMethod = styled.div`
  display: flex;
  border-radius: 6px;
  position: relative;
  align-items: center;
  padding: 20px 20px 20px 70px;
  background: ${theme.colors.neutral[0]};

  img {
    top: 50%;
    left: 20px;
    position: absolute;
    transform: translateY(-50%);
  }
`;

export default PaymentMethod;
