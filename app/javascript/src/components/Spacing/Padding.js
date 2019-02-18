import styled from "styled-components";
import sizes from "./sizes";

const getSize = (props, side) => {
  const amount = sizes[props[side] || props.size];
  return amount ? `${amount}px` : null;
}

const Padding = styled.div`
  padding-top: ${props => getSize(props, 'top')};
  padding-left: ${props => getSize(props, 'left')};
  padding-right: ${props => getSize(props, 'right')};
  padding-bottom: ${props => getSize(props, 'bottom')};
`;

export default Padding;
