import React from 'react';
import { Spring } from "react-spring";
import styled from 'styled-components';

const Bar = styled.div`
  height: 3px;
  margin: 20px 0;
  border-radius: 2px;
  background: rgba(183, 189, 213, 0.34);
`

const Inner = styled.div.attrs({
  style: (props) => {
    return { width: `${props.width}%` }
  }
})`
  height: 100%;
  background: #17CDA1;
`

export default ({ amount }) => {
  return (
    <Spring from={{ width: 0 }} to={{ width: amount }}>
      {styles => (
        <Bar>
          <Inner {...styles} />
        </Bar>
      )}
    </Spring>
  )
}