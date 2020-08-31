import React from "react";
import PropTypes from "prop-types";
import { Card } from "@advisable/donut";

function StepCard({ children }) {
  return (
    <Card
      padding={{ _: "0", m: "52px" }}
      elevation={{ _: "none", m: "m" }}
      variant={["transparent", "default"]}
    >
      {children}
    </Card>
  );
}

StepCard.propTypes = {
  children: PropTypes.node,
};

export default StepCard;
