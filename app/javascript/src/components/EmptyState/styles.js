import styled from "styled-components";
import { Icon } from "src/components/Icon/styles";

export const Wrapper = styled.div`
  margin: 0 auto;
  padding: 100px 0;
  max-width: 400px;
  text-align: center;

  ${Icon} {
    color: #8798b3;
    display: block;
    margin-bottom: 15px;
  }
`;
