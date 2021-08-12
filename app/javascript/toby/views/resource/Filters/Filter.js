import css from "@styled-system/css";
import React, { useMemo, useCallback } from "react";
import { Text, Box, Select } from "@advisable/donut";
import { XCircle } from "@styled-icons/heroicons-solid/XCircle";
import FilterValue from "./filters";
import { StyledFilter } from "./styles";

function FilterAttribute({ value, resource, onChange }) {
  const withFilters = useMemo(
    () => resource.attributes.filter((a) => a.filters.length),
    [resource],
  );

  const handleChange = useCallback(
    (e) => {
      const attribute = withFilters.find((a) => a.name === e.target.value);
      onChange(attribute);
    },
    [withFilters, onChange],
  );

  return (
    <Select value={value} onChange={handleChange}>
      {withFilters.map((attr) => (
        <option key={attr.name}>{attr.name}</option>
      ))}
    </Select>
  );
}

function FilterType({ filter, resource, onChange }) {
  const attribute = useMemo(() => {
    return resource.attributes.find((a) => a.name === filter.attribute);
  }, [filter.attribute, resource]);

  const handleChange = useCallback(
    (e) => {
      const filter = attribute.filters.find((f) => f.name === e.target.value);
      onChange(filter);
    },
    [attribute, onChange],
  );

  return (
    <Select size="s" value={filter.type} onChange={handleChange}>
      {attribute.filters.map((filter) => (
        <option key={filter.name}>{filter.name}</option>
      ))}
    </Select>
  );
}

export default function Filter({
  index,
  resource,
  schemaData,
  filter,
  onUpdate,
  onRemove,
}) {
  const handleChangeAttribute = useCallback(
    (attribute) => {
      onUpdate(index, {
        attribute: attribute.name,
        type: attribute.filters[0].name,
        value: [],
      });
    },
    [onUpdate, index],
  );

  const handleChangeType = useCallback(
    (attributeFilter) => {
      onUpdate(index, {
        ...filter,
        type: attributeFilter.name,
        value: [],
      });
    },
    [onUpdate, filter, index],
  );

  const handleChangeValue = useCallback(
    (value) => {
      onUpdate(index, {
        ...filter,
        value,
      });
    },
    [onUpdate, filter, index],
  );

  const handleRemove = () => {
    onRemove(index);
  };

  return (
    <StyledFilter borderRadius="12px" bg="neutral100" padding={3}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Text fontSize="sm" fontWeight={550}>
          {index > 0 ? "and" : "Where"}
        </Text>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="24px"
          height="24px"
          margin="-4px"
          borderRadius="8px"
          onClick={handleRemove}
          css={css({
            color: "neutral500",
            "&:hover": {
              color: "neutral800",
              bg: "neutral200",
            },
          })}
        >
          <XCircle size={20} />
        </Box>
      </Box>
      <Box display="flex" mb={2}>
        <Box pr={1} width="50%">
          <FilterAttribute
            value={filter.attribute}
            resource={resource}
            onChange={handleChangeAttribute}
          />
        </Box>
        <Box pl={1} width="50%">
          <FilterType
            filter={filter}
            resource={resource}
            onChange={handleChangeType}
          />
        </Box>
      </Box>
      <FilterValue
        schemaData={schemaData}
        resource={resource}
        filter={filter}
        onChange={handleChangeValue}
      />
    </StyledFilter>
  );
}
