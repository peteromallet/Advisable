import React, { useEffect, useState } from "react";
import { Box, Card, Button } from "@advisable/donut";
import { Popover, usePopoverState, PopoverDisclosure } from "reakit/Popover";
import { StyledMenu, StyledMenuItem } from "./styles";
import { getNestedResource } from "../../../utilities";
import FilterBreadcrumbs from "./FilterBreadcrumbs";

function lastFilterInChain(filter) {
  // if there is a filter value and it isn't an array then its a nested filter
  if (filter.value && !Array.isArray(filter.value)) {
    return lastFilterInChain(filter.value);
  }

  return filter;
}

function filterIsNested(filter) {
  return filter.value && !Array.isArray(filter.value);
}

function resolveFilter(filterChain, lastFilter) {
  if (filterIsNested(filterChain)) {
    return {
      ...filterChain,
      value: resolveFilter(filterChain.value, lastFilter),
    };
  }

  return {
    ...filterChain,
    ...lastFilter,
  };
}

function resolveAttributeFromFilterChain(schemaData, resource, filter) {
  if (filterIsNested(filter)) {
    const nextResource = getNestedResource(
      schemaData,
      resource,
      filter.attribute,
    );
    return resolveAttributeFromFilterChain(
      schemaData,
      nextResource,
      filter.value,
    );
  }

  return resource.attributes.find((attr) => attr.name === filter.attribute);
}

function resolveResourceFromFilterChain(schemaData, resource, filter) {
  if (filterIsNested(filter)) {
    const nextResource = getNestedResource(
      schemaData,
      resource,
      filter.attribute,
    );
    return resolveResourceFromFilterChain(
      schemaData,
      nextResource,
      filter.value,
    );
  }

  return resource;
}

function SelectFilterAttribute({ resource, onSelect }) {
  const attributes = resource.attributes.filter((a) => a.filters.length > 0);

  return attributes.map((attr) => {
    return (
      <StyledMenuItem
        tabindex={0}
        key={attr.name}
        onClick={() => onSelect(attr)}
      >
        {attr.name}
      </StyledMenuItem>
    );
  });
}

function SelectFilterType({ attribute, onSelect }) {
  return attribute.filters.map((filter) => {
    return (
      <StyledMenuItem
        tabindex={0}
        key={filter.id}
        onClick={() => onSelect(filter)}
      >
        {filter.name}
      </StyledMenuItem>
    );
  });
}

function SelectionMenu({ filter, setFilter, schemaData, resource, onSelect }) {
  const lastFilter = lastFilterInChain(filter);

  const updateFilterChain = (values) => {
    setFilter(
      resolveFilter(filter, {
        ...lastFilter,
        ...values,
      }),
    );
  };

  const handleSelectAttribute = (attribute) => {
    updateFilterChain({
      attribute: attribute.name,
    });
  };

  const handleSelectType = (next) => {
    if (next.nested) {
      updateFilterChain({
        filter: next.name,
        value: {},
      });
    } else {
      onSelect(
        resolveFilter(filter, {
          ...lastFilter,
          type: next.name,
          value: [],
        }),
      );
    }
  };

  const attribute = resolveAttributeFromFilterChain(
    schemaData,
    resource,
    filter,
  );
  const resolvedResource = resolveResourceFromFilterChain(
    schemaData,
    resource,
    filter,
  );

  return (
    <>
      <StyledMenu>
        {!lastFilter.attribute ? (
          <SelectFilterAttribute
            resource={resolvedResource}
            onSelect={handleSelectAttribute}
          />
        ) : (
          <SelectFilterType attribute={attribute} onSelect={handleSelectType} />
        )}
      </StyledMenu>
    </>
  );
}

export default function NewFilterMenu({ resource, schemaData, onSelect }) {
  const popover = usePopoverState({ placement: "bottom-start" });
  const [filter, setFilter] = useState({});

  useEffect(() => {
    if (!popover.visible) {
      setFilter({});
    }
  }, [popover.visible]);

  const handleSelect = (filter) => {
    popover.hide();
    onSelect(filter);
  };

  return (
    <>
      <PopoverDisclosure {...popover}>
        {(disclosure) => (
          <Button {...disclosure} variant="subtle" size="xs">
            + Add Filter
          </Button>
        )}
      </PopoverDisclosure>
      <Popover {...popover} style={{ outline: "none" }}>
        <Card
          borderRadius="12px"
          minWidth="320px"
          css={`
            box-shadow: 0 24px 64px rgba(0, 0, 0, 0.2);
          `}
        >
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
          <Box maxHeight="300px" overflowY="scroll">
            <SelectionMenu
              filter={filter}
              setFilter={setFilter}
              resource={resource}
              schemaData={schemaData}
              onSelect={handleSelect}
            />
          </Box>
        </Card>
      </Popover>
    </>
  );
}
