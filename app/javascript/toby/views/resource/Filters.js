import React, { useCallback, useEffect } from "react";
import { useResourceData } from "../../utilities";

export default function Filters({
  refetch,
  filters,
  addFilter,
  removeFilter,
  updateFilter,
}) {
  const resource = useResourceData();
  const fields = resource.attributes.map((attr) => attr.name);

  const newFilter = useCallback(() => {
    addFilter({
      attribute: fields[0],
      type: "contains",
      value: "",
    });
  }, [addFilter, fields]);

  const handleChange = (id, attribute) => (e) => {
    updateFilter(id, attribute, e.target.value);
  };

  useEffect(() => {
    refetch({
      filters: filters.map((f) => ({
        attribute: f.attribute,
        type: f.type,
        value: f.value,
      })),
    });
  }, [refetch, filters]);

  return (
    <div>
      {filters.map((filter) => (
        <div key={filter.id}>
          Where
          <select
            value={filter.attribute}
            onChange={handleChange(filter.id, "attribute")}
          >
            {fields.map((field) => (
              <option key={field}>{field}</option>
            ))}
          </select>
          <select>
            <option>contains</option>
          </select>
          <input onChange={handleChange(filter.id, "value")} type="text" />
          <button onClick={() => removeFilter(filter.id)}>x</button>
        </div>
      ))}
      <button onClick={newFilter}>+ Add Filter</button>
    </div>
  );
}
