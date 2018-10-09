import React from 'react';
import styled from 'styled-components';

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -10px;
`

const ButtonGroupItem = styled.div`
  flex: ${props => props.fullWidth && '1 0 0%'};
  margin-left: 10px;

  button {
    width: 100%;
  }
`

export default ({ children, ...props }) => (
  <ButtonGroup>
      {React.Children.map(children, (child, i) => {
        // If the child is null then return null
        if (child === null) return null;

        return (
          <ButtonGroupItem key={i} {...props}>
            {child}
          </ButtonGroupItem>
        );
      })}
  </ButtonGroup>
)
