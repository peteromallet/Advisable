import React from "react";
import { Card, Button, Box, Text } from "@advisable/donut";
import { Trash } from "@styled-icons/heroicons-outline";
import { Funnel } from "@styled-icons/ionicons-outline";
import NewFilterMenu from "./NewFilterMenu";
import FilterBreadcrumbs from "./FilterBreadcrumbs";
import { usePopoverState, Popover, PopoverDisclosure } from "reakit/Popover";

function NoFilters() {
  return (
    <Box
      mb={4}
      padding={4}
      bg="neutral50"
      textAlign="center"
      borderRadius="12px"
      color="neutral700"
    >
      <Text>You have not added any filters</Text>
    </Box>
  );
}

function FiltersList({ filters, removeFilter }) {
  return (
    <Box mb={2}>
      {filters.map((filter) => (
        <Box
          key={filter.id}
          paddingY={1}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <FilterBreadcrumbs filter={filter} />
          <Box
            onClick={() => removeFilter(filter.id)}
            color="neutral700"
            ml={4}
          >
            <Trash size={20} />
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default function FilterMenu({
  resource,
  filters,
  addFilter,
  removeFilter,
  ...props
}) {
  const menu = usePopoverState({ placement: "bottom" });

  const filterCount = filters.length > 0 ? filters.length : null;

  return (
    <>
      <PopoverDisclosure {...menu}>
        {(disclosure) => (
          <Button prefix={<Funnel />} variant="subtle" size="s" {...disclosure}>
            Filters {filterCount && `(${filterCount})`}
          </Button>
        )}
      </PopoverDisclosure>
      <Popover {...menu} style={{ outline: "none" }}>
        <Card
          padding={4}
          minWidth="400px"
          borderRadius="12px"
          css={`
            box-shadow: 0 24px 64px rgba(0, 0, 0, 0.2);
          `}
        >
          {filters.length === 0 && <NoFilters />}
          {filters.length > 0 && (
            <FiltersList filters={filters} removeFilter={removeFilter} />
          )}
          <NewFilterMenu
            resource={resource}
            filters={filters}
            onFinalize={addFilter}
            {...props}
          />
        </Card>
      </Popover>
    </>
  );
}
