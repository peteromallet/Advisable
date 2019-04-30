import React from 'react';
import styled, { css } from 'styled-components';

const ButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -10px;

  ${props => props.stack && css`
    margin-left: 0;
    flex-direction: column;
  `}
`

const stackedStyles = css`
  margin-left: 0;
  margin-bottom: 10px;
  &:last-child { margin-bottom: 0 }
`

const ButtonGroupItem = styled.div`
  flex: ${props => props.fullWidth && '1 0 0%'};
  margin-left: 10px;

  ${props => props.stack && stackedStyles}

  button, a {
    width: 100%;
  }
`

export default ({ children, ...props }) => (
  <ButtonGroup stack={props.stack}>
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
