import css from "@styled-system/css";
import React, { useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { Box, Text, Stack } from "@advisable/donut";
import { PlusCircle } from "@styled-icons/heroicons-solid";
import Filter from "./Filter";
import EmptyFilters from "./EmptyFilters";
import { useToby } from "../../../components/TobyProvider";

export default function FilterDrawer({ filters, resource, open, onApply }) {
  const toby = useToby();
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
            schemaData={toby}
            onRemove={removeFilter}
            onUpdate={handleUpdateFilter}
          />
        ))}
      </Stack>

      <Box
        onClick={handleNewFilter}
        bg="neutral100"
        display="flex"
        paddingY={5}
        paddingX={3}
        justifyContent="center"
        borderRadius="12px"
        color="neutral800"
        css={css({
          cursor: "default",
          "&:hover": {
            bg: "neutral200",
          },
        })}
      >
        <PlusCircle size={16} />
        <Text ml={1} fontWeight={500} fontSize="sm">
          Add Filter
        </Text>
      </Box>
    </Box>
  );
}
