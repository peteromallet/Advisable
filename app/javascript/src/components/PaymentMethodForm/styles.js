import styled from "styled-components";
import { theme } from "@advisable/donut";

export const CardField = styled.div`
  border-radius: 8px;
  margin-bottom: 20px;
  background: ${theme.colors.neutral100};

  .StripeElement--webkit-autofill {
    background: transparent !important;
  }

  .StripeElement {
    width: 100%;
    padding: 10px 12px 10px 12px;
  }
`;
