import React, { useCallback } from "react";
import { useResourceData } from "../../utilities";
import Filter from "../../filters";

export function FiltersFilter({
  filter,
  resource,
  onChangeFilterAttribute,
  onChangeFilterType,
  onChangeFilterValue,
}) {
  const fieldsWithFilters = resource.attributes.filter((a) => a.filters.length);
  const filtersForField = fieldsWithFilters.find(
    (f) => f.name === filter.attribute,
  ).filters;

  return (
    <>
      Where
      <select value={filter.attribute} onChange={onChangeFilterAttribute}>
        {fieldsWithFilters.map((field) => (
          <option key={field.name}>{field.name}</option>
        ))}
      </select>
      <select onChange={onChangeFilterType}>
        {filtersForField.map((filter) => (
          <option key={filter.name}>{filter.name}</option>
        ))}
      </select>
      <Filter
        filter={filter}
        resource={resource}
        onChange={onChangeFilterValue}
      />
    </>
  );
}

export default function Filters({
  filters,
  addFilter,
  removeFilter,
  updateFilter,
}) {
  const resource = useResourceData();
  const fieldsWithFilters = resource.attributes.filter((a) => a.filters.length);

  const newFilter = useCallback(() => {
    addFilter({
      attribute: fieldsWithFilters[0].name,
      type: fieldsWithFilters[0].filters[0].name,
      value: [],
    });
  }, [addFilter, fieldsWithFilters]);

  const handleChange = (id, attribute) => (value) => {
    updateFilter(id, { [attribute]: value });
  };

  function handleChangeFilterAttribute(filter) {
    return (e) => {
      const filters = fieldsWithFilters.find((f) => f.name === e.target.value)
        .filters;
      updateFilter(filter.id, {
        attribute: e.target.value,
        type: filters[0].name,
      });
    };
  }

  return (
    <div>
      {filters.map((filter) => (
        <div key={filter.id}>
          <FiltersFilter
            filter={filter}
            resource={resource}
            onChangeFilterAttribute={handleChangeFilterAttribute(filter)}
            onChangeFilterType={(e) =>
              updateFilter(filter.id, { type: e.target.value })
            }
            onChangeFilterValue={handleChange(filter.id, "value")}
          />
          <button onClick={() => removeFilter(filter.id)}>x</button>
        </div>
      ))}
      <button onClick={newFilter}>+ Add Filter</button>
    </div>
  );
}
