import React from "react";
import OneOf from "./OneOf";
import Equals from "./Equals";
import Includes from "./Includes";
import NumberInput from "./NumberInput";
import DateInput from "./DateInput";
import StringContains from "./StringContains";

const FILTERS = {
  OneOf,
  NotOneOf: OneOf,
  Equals,
  Includes,
  LessThan: NumberInput,
  DateEquals: DateInput,
  DateAfter: DateInput,
  DateBefore: DateInput,
  GreaterThan: NumberInput,
  StringContains,
};

export function getValueComponentForFilter(resource, filter) {
  const attribute = resource.attributes.find(
    (f) => f.name === filter.attribute,
  );
  if (!attribute) return null;

  const attributeFilter = attribute.filters.find((f) => f.name === filter.type);
  return FILTERS[attributeFilter.type];
}

export default function Filter({ resource, filter, onChange }) {
  const attribute = resource.attributes.find(
    (f) => f.name === filter.attribute,
  );

  if (!attribute) return null;

  const attributeFilter = attribute.filters.find((f) => f.name === filter.type);
  let Component = FILTERS[attributeFilter?.type];

  if (!Component) {
    console.error("No filter handler found.", filter);
    return null;
  }

  return (
    <Component
      resource={resource}
      attribute={attribute}
      filter={attributeFilter}
      value={filter.value}
      onChange={onChange}
    />
  );
}
