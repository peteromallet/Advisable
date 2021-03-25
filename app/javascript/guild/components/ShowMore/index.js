import React from "react";
import { Button } from "@advisable/donut";
import { ChevronDown } from "@styled-icons/heroicons-outline/ChevronDown";
import { ChevronUp } from "@styled-icons/heroicons-outline/ChevronUp";

const ShowMore = ({ showingMore, onToggle, text }) => (
  <Button
    size="s"
    variant="subtle"
    onClick={onToggle}
    prefix={showingMore ? <ChevronUp /> : <ChevronDown />}
  >
    {showingMore ? text.less : text.more}
  </Button>
);

ShowMore.defaultProps = {
  text: { less: "Less", more: "More" },
};

export default ShowMore;
