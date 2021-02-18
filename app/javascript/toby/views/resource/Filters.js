import React, { useCallback, useEffect } from "react";
import { useResourceData } from "../../utilities";
import FiltersRenderer from "../../filters";

export default function Filters({
  refetch,
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
      contents: [],
    });
  }, [addFilter, fieldsWithFilters]);

  const handleChange = (id, attribute) => (value) => {
    updateFilter(id, { [attribute]: value });
  };

  useEffect(() => {
    refetch({
      filters: filters.map((f) => ({
        attribute: f.attribute,
        type: f.type,
        contents: f.contents,
      })),
    });
  }, [refetch, filters]);

  function filtersForField(field) {
    return fieldsWithFilters.find((f) => f.name === field).filters;
  }

  function handleChangeFilterAttribute(filter) {
    return (e) => {
      const filters = filtersForField(e.target.value);
      updateFilter(filter.id, {
        attribute: e.target.value,
        type: filters[0].name,
      });
    };
  }

  function renderFilter(filter) {
    const field = fieldsWithFilters.find((f) => f.name === filter.attribute);
    const fieldFilter = field.filters.find((f) => f.name === filter.type);
    const Component = FiltersRenderer[fieldFilter.type];
    if (!Component) return null;

    return (
      <Component
        filter={filter}
        onChange={handleChange(filter.id, "contents")}
      />
    );
  }

  return (
    <div>
      {filters.map((filter) => (
        <div key={filter.id}>
          Where
          <select
            value={filter.attribute}
            onChange={handleChangeFilterAttribute(filter)}
          >
            {fieldsWithFilters.map((field) => (
              <option key={field.name}>{field.name}</option>
            ))}
          </select>
          <select
            onChange={(e) => updateFilter(filter.id, { type: e.target.value })}
          >
            {filtersForField(filter.attribute).map((filter) => (
              <option key={filter.name}>{filter.name}</option>
            ))}
          </select>
          {renderFilter(filter)}
          <button onClick={() => removeFilter(filter.id)}>x</button>
        </div>
      ))}
      <button onClick={newFilter}>+ Add Filter</button>
    </div>
  );
}
