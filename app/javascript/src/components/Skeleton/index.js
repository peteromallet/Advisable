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
  border-radius: 4px;
  background: #3C466A;
  animation: ${animation} 0.6s linear infinite alternate;
`

Skeleton.Card = styled(Skeleton)`
`

export default Skeleton;