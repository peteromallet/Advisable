import React from "react";
import OneOf from "./OneOf";
import Equals from "./Equals";
import Includes from "./Includes";

const FILTERS = {
  OneOf,
  Equals,
  Includes,
};

export function getValueComponentForFilter(resource, filter) {
  const attribute = resource.attributes.find(
    (f) => f.name === filter.attribute,
  );
  const attributeFilter = attribute.filters.find((f) => f.name === filter.type);
  return FILTERS[attributeFilter.type];
}

export default function Filter({ resource, filter, onChange, finalize }) {
  const attribute = resource.attributes.find(
    (f) => f.name === filter.attribute,
  );
  const attributeFilter = attribute.filters.find((f) => f.name === filter.type);
  let Component = FILTERS[attributeFilter.type];

  if (!Component) {
    console.error(
      "No filter handler found. Falling back to basic input",
      filter,
    );
    Component = Equals;
  }

  return (
    <Component
      resource={resource}
      attribute={attribute}
      value={filter.value}
      onChange={onChange}
      finalize={finalize}
    />
  );
}
