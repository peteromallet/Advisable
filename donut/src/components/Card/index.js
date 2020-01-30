import React from "react";
import StyledCard from "./styles";

const Card = props => {
  return <StyledCard {...props} />;
};

Card.defaultProps = {
  borderRadius: "2px",
  elevation: "m",
};

export default Card;
