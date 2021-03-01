import React from "react";
import OneOf from "./OneOf";
import Includes from "./Includes";
import StringContains from "./StringContains";

const FILTERS = {
  OneOf,
  Includes,
  StringContains,
};

export default function Filter({ resource, filter, ...props }) {
  const attribute = resource.attributes.find(
    (f) => f.name === filter.attribute,
  );
  const attributeFilter = attribute.filters.find((f) => f.name === filter.type);
  const Component = FILTERS[attributeFilter.type];
  if (!Component) return null;

  return <Component resource={resource} filter={filter} {...props} />;
}
