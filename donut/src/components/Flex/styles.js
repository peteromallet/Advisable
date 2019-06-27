import styled, { css } from "styled-components";
import SPACING from "../../spacing";
import responsiveProp from "../../utilities/responsiveProp";

const DIRECTION = {
  horizontal: "row",
  vertical: "column",
};

// Calculates the correct amount of spacing to be applied based on the
// spacing prop.
function calculateSpacing(props) {
  const prop = responsiveProp(props, "spacing", null);
  let amount = SPACING[prop];
  if (!amount) return null;
  return amount / 2;
}

// Applys the correct amount of negative spacing to Flex container.
function applyNegativeSpacing(props) {
  let amount = calculateSpacing(props);
  let direction = responsiveProp(props, "direction");

  if (direction === "vertical") {
    return {
      marginTop: -amount,
      marginBottom: -amount,
    };
  }

  return {
    marginLeft: -amount,
    marginRight: -amount,
  };
}

// Applys the correct amount of spacing to each flex item.
function applyItemSpacing(props) {
  let amount = calculateSpacing(props);
  let direction = responsiveProp(props, "direction");

  if (direction === "vertical") {
    return { marginTop: amount, marginBottom: amount };
  }

  return { marginLeft: amount, marginRight: amount };
}

const distribution = {
  evenly: "1 0 0%",
};

const align = {
  center: "center",
};

export const Flex = styled.div`
  width: 100%;
  display: flex;
  align-items: ${props => align[responsiveProp(props, "align")]};
  ${props => applyNegativeSpacing(props)};
  flex-direction: ${props => DIRECTION[responsiveProp(props, "direction")]};
`;

export const FlexItem = styled.div`
  display: inline-block;
  ${props => applyItemSpacing(props)};
  flex: ${props => distribution[props.distribute]};

  ${props =>
    props.fill &&
    css`
      flex: 1 1 auto;
    `}
`;

FlexItem.displayName = "FlexItem";

export default Flex;
