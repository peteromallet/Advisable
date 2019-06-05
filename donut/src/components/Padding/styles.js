import styled from "styled-components";
import SPACING from "../../spacing";

const getSize = (props, side) => {
  const responsiveProp = props.theme.responsiveProp;
  const amount =
    SPACING[responsiveProp(props[side]) || responsiveProp(props.size)];
  return amount ? `${amount}px` : null;
};

export const Padding = styled.div`
  padding-top: ${props => getSize(props, "top")};
  padding-left: ${props => getSize(props, "left")};
  padding-right: ${props => getSize(props, "right")};
  padding-bottom: ${props => getSize(props, "bottom")};
`;

export default Padding;
