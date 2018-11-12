import React from 'react';
import styled from 'styled-components';

const Bar = styled.div`
  height: 3px;
  margin: 20px 0;
  border-radius: 2px;
  background: rgba(183, 189, 213, 0.34);
`

const Inner = styled.div`
  height: 100%;
  background: #17CDA1;
  width: ${props => `${props.amount}%`};
`

export default ({ amount }) => {
  return (
    <Bar>
      <Inner amount={amount} />
    </Bar>
  )
}