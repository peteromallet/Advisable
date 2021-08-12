import React, { useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { Box, Stack } from "@advisable/donut";
import Filter from "./Filter";
import EmptyFilters from "./EmptyFilters";
import { useSchema } from "../../../components/schema";

export default function FilterDrawer({ filters, resource, open, onApply }) {
  const schemaData = useSchema();
  const attributesWithFilters = useMemo(
    () =>
      resource.attributes.filter((attr) => {
        return attr.filters.length > 0;
      }),
    [resource],
  );

  const handleNewFilter = useCallback(() => {
    onApply([
      ...filters,
      {
        attribute: attributesWithFilters[0].name,
        type: attributesWithFilters[0].filters[0].name,
        value: [],
      },
    ]);
  }, [filters, onApply, attributesWithFilters]);

  const handleUpdateFilter = useCallback(
    (index, next) => {
      onApply(
        filters.map((filter, i) => {
          if (index === i) {
            return next;
          }

          return filter;
        }),
      );
    },
    [filters, onApply],
  );

  const removeFilter = useCallback(
    (index) => {
      onApply(filters.filter((f, i) => i !== index));
    },
    [filters, onApply],
  );

  return (
    <Box
      as={motion.div}
      padding={4}
      zIndex={2}
      height="100%"
      width="400px"
      position="fixed"
      transition={{ duration: 0.2 }}
      initial={{
        opacity: 0,
        x: -400,
      }}
      animate={{
        x: open ? 0 : -400,
        opacity: open ? 1 : 0,
      }}
      css={`
        box-shadow: 2px 0 24px rgba(0, 0, 0, 0.2);
      `}
    >
      {filters.length === 0 && <EmptyFilters />}
      <Stack spacing="xs" mb={2}>
        {filters.map((filter, index) => (
          <Filter
            key={index}
            index={index}
            filter={filter}
            resource={resource}
            schemaData={schemaData}
            onRemove={removeFilter}
            onUpdate={handleUpdateFilter}
          />
        ))}
      </Stack>

      <button onClick={handleNewFilter}>+ Add</button>
    </Box>
  );
}
