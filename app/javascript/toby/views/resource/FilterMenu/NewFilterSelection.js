import React, { useState } from "react";
import Filter from "./filters";
import { Box } from "@advisable/donut";
import FilterBreadcrumbs from "./FilterBreadcrumbs";
import { getNestedResource } from "../../../utilities";
import { useSchema } from "../../../components/schema";
import { StyledMenu, StyledMenuItem } from "./styles";

const BLANK_FILTER = {
  attribute: undefined,
  type: undefined,
  value: undefined,
};

function SelectAttribute({ onSelect, resource }) {
  const attributesWithFilters = resource.attributes.filter((attribute) => {
    return attribute.filters.length > 0;
  });

  return (
    <StyledMenu>
      {attributesWithFilters.map((attribute) => (
        <StyledMenuItem
          tabindex={0}
          key={attribute.name}
          onClick={() => onSelect(attribute.name)}
        >
          {attribute.name}
        </StyledMenuItem>
      ))}
    </StyledMenu>
  );
}

function SelectFilterType({ onSelect, filter, resource }) {
  const attribute = resource.attributes.find(
    (attr) => attr.name === filter.attribute,
  );

  return (
    <StyledMenu>
      {attribute.filters.map((f) => (
        <StyledMenuItem key={f.name} onClick={() => onSelect(f.name)}>
          {f.name}
        </StyledMenuItem>
      ))}
    </StyledMenu>
  );
}

function FilterStep({ filter, setFilter, finalize, resource }) {
  const schemaData = useSchema();

  const handleSelectAttribute = (attribute) => {
    setFilter({
      ...filter,
      attribute,
    });
  };

  const handleSelectType = (type) => {
    let value = [];

    const selectedAttribute = resource.attributes.find(
      (attr) => attr.name === filter.attribute,
    );
    const selectedFilter = selectedAttribute.filters.find(
      (f) => f.name === type,
    );

    // If the filter is a nested filter then we need to handle that.
    if (selectedFilter.nested) {
      value = BLANK_FILTER;
    }

    // The value will need to also be set here to handle nested filters. Some
    // filters will also not need a value and so at this point we can trigger
    // adddFilter and close the menu.
    setFilter({
      ...filter,
      type,
      value,
    });
  };

  const handleSetValue = (value) => {
    setFilter({ ...filter, value });
  };

  if (!filter.attribute) {
    return (
      <SelectAttribute onSelect={handleSelectAttribute} resource={resource} />
    );
  }

  if (!filter.type) {
    return (
      <SelectFilterType
        onSelect={handleSelectType}
        filter={filter}
        resource={resource}
      />
    );
  }

  if (!Array.isArray(filter.value)) {
    return (
      <FilterStep
        filter={filter.value}
        setFilter={handleSetValue}
        finalize={finalize}
        resource={getNestedResource(schemaData, resource, filter.attribute)}
      />
    );
  }

  return (
    <Box padding={4}>
      <Filter
        resource={resource}
        onChange={handleSetValue}
        filter={filter}
        finalize={finalize}
      />
    </Box>
  );
}

export default function NewFilterSelection({ onFinalize, resource }) {
  const [filter, setFilter] = useState(BLANK_FILTER);

  const finalize = () => {
    onFinalize(filter);
    setFilter(BLANK_FILTER);
  };

  return (
    <>
      <Box
        paddingX={4}
        height="50px"
        fontSize="sm"
        display="flex"
        flexWrap="nowrap"
        alignItems="center"
        borderBottom="1px solid"
        borderColor="neutral100"
      >
        <FilterBreadcrumbs filter={filter} />
      </Box>
      <Box maxHeight="400px" overflowY="scroll">
        <FilterStep
          filter={filter}
          finalize={finalize}
          resource={resource}
          setFilter={setFilter}
        />
      </Box>
    </>
  );
}
