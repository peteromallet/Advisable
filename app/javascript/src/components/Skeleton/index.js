// This component is used to render a loading indicator that represents a
// heading
import styled, { keyframes } from "styled-components";

const animation = keyframes`
  from {
    opacity: 0.05;
  }

  to {
    opacity: 0.1;
  }
`

const Skeleton = styled.div`
  background: #3C466A;
  animation: ${animation} 0.6s linear infinite alternate;
`

Skeleton.Card = styled(Skeleton)`
  border-radius: 4px;
`

export default Skeleton;