import React from "react";
import { Box, Text, Tag } from "@advisable/donut";

function resolveAttributeBreadcrumb(filter, prefix = null) {
  let output = prefix ? `${prefix} > ${filter.attribute}` : filter.attribute;

  if (filter.value?.attribute) {
    return resolveAttributeBreadcrumb(filter.value, output);
  }

  return output;
}

function FilterBreadcrumbAttribute({ filter }) {
  if (!filter.attribute) return null;

  const label = resolveAttributeBreadcrumb(filter);
  return <Tag>{label}</Tag>;
}

function resolveFilterType(filter) {
  const isNested = !Array.isArray(filter.value) && filter.value !== undefined;

  if (isNested) {
    return resolveFilterType(filter.value);
  }

  return filter.type;
}

function FilterBreadcrumbType({ filter }) {
  const label = resolveFilterType(filter);
  if (!label) return null;

  return (
    <Text mx={2} as="span" fontWeight="500" color="neutral700">
      {label}
    </Text>
  );
}

function resolveFilterValue(filter) {
  const isNested = !Array.isArray(filter.value) && filter.value !== undefined;

  if (isNested) {
    return resolveFilterValue(filter.value);
  }

  return filter.value?.[0];
}

function FilterBreadcrumbValue({ filter }) {
  const label = resolveFilterValue(filter);
  if (!label) return null;
  return <Tag>{label}</Tag>;
}

export default function FilterBreadcrumbs({ filter }) {
  return (
    <Box
      css={`
        white-space: nowrap;
      `}
    >
      <Text as="span" fontWeight="500" color="neutral700" mr={2}>
        Where
      </Text>
      <FilterBreadcrumbAttribute filter={filter} />
      <FilterBreadcrumbType filter={filter} />
      <FilterBreadcrumbValue filter={filter} />
    </Box>
  );
}
