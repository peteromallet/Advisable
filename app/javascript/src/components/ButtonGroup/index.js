import { Children } from "react";
import styled, { css } from "styled-components";

const StyledButtonGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-left: -10px;

  ${(props) =>
    props.stack &&
    css`
      margin-left: 0;
      flex-direction: column;
    `}
`;

const stackedStyles = css`
  margin-left: 0;
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const ButtonGroupItem = styled.div`
  flex: ${(props) => props.fullWidth && "1 0 0%"};
  margin-left: 10px;

  ${(props) => props.stack && stackedStyles}

  button, a {
    width: 100%;
  }
`;

export default function ButtonGroup({ children, ...props }) {
  return (
    <StyledButtonGroup stack={props.stack}>
      {Children.map(children, (child, i) => {
        // If the child is null then return null
        if (child === null) return null;

        return (
          <ButtonGroupItem key={i} {...props}>
            {child}
          </ButtonGroupItem>
        );
      })}
    </StyledButtonGroup>
  );
}
