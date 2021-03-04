import React, { useState } from "react";
import { useSchema } from "../components/schema";
import { getType, getResource } from "../utilities";
import { FiltersFilter } from "../views/resource/Filters";

export default function OneOf({ resource, filter, onChange }) {
  const schemaData = useSchema();
  const resourceType = getType(schemaData.schema, resource.type);
  const field = resourceType.fields.find((f) => f.name === filter.attribute);
  const isScalar = field.type.kind === "SCALAR";
  const isNested = !Array.isArray(filter.value);
  const [value, setValue] = useState("");

  const nextResource = getResource(schemaData.resources, field.type.name);
  const nextFieldsWithFilters = nextResource?.attributes.filter(
    (a) => a.filters.length,
  );

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleBlur = (e) => {
    const values = e.target.value
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);
    onChange(values);
  };

  const handleCreateNested = () => {
    onChange({
      attribute: nextFieldsWithFilters[0].name,
      type: nextFieldsWithFilters[0].filters[0].name,
      value: [],
    });
  };

  const handleChangeNestedAttribute = (e) => {
    const attr = e.target.value;
    const filters = nextResource.attributes.find((a) => a.name === attr)
      .filters;
    onChange({
      ...filter.value,
      attribute: attr,
      type: filters[0].name,
    });
  };

  const handleChangeFilterType = (e) => {
    onChange({
      ...filter.value,
      type: e.target.value,
    });
  };

  const handleChangeFilterValue = (value) => {
    onChange({
      ...filter.value,
      value,
    });
  };

  if (isNested) {
    return (
      <FiltersFilter
        resource={nextResource}
        filter={filter.value}
        onChangeFilterAttribute={handleChangeNestedAttribute}
        onChangeFilterType={handleChangeFilterType}
        onChangeFilterValue={handleChangeFilterValue}
      />
    );
  }

  return (
    <>
      <input
        value={value}
        onBlur={handleBlur}
        onChange={handleChange}
        type="text"
      />
      {!isScalar && <button onClick={handleCreateNested}>+</button>}
    </>
  );
}
