import React from "react";
import OneOf from "./OneOf";
import Equals from "./Equals";
import Includes from "./Includes";
import StringContains from "./StringContains";

const FILTERS = {
  OneOf,
  Equals,
  Includes,
  StringContains,
};

export default function Filter({ resource, filter, ...props }) {
  const attribute = resource.attributes.find(
    (f) => f.name === filter.attribute,
  );
  const attributeFilter = attribute.filters.find((f) => f.name === filter.type);
  let Component = FILTERS[attributeFilter.type];

  if (!Component) {
    console.error("No filter handler found. Falling back to equals", filter);
    Component = Equals;
  }

  return (
    <Component
      resource={resource}
      filter={filter}
      attribute={attribute}
      {...props}
    />
  );
}
