import React, { useState } from "react";
import { Combobox } from "@advisable/donut";
import { useSchema } from "../components/schema";
import { getType, getResource } from "../utilities";
import { FiltersFilter } from "../views/resource/Filters";

function OneOfSelection({ attribute, onChange }) {
  const [values, setValues] = useState([]);

  const options = attribute.options.map((opt) => ({
    label: opt,
    value: opt,
  }));

  const handleChange = (nextValues) => {
    setValues(nextValues);
    onChange(nextValues.map((v) => v.value));
  };

  return (
    <div>
      <Combobox
        multiple
        size="sm"
        value={values}
        options={options}
        onChange={handleChange}
      />
    </div>
  );
}

export default function OneOf({ resource, filter, attribute, onChange }) {
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

  if (attribute.options?.length > 0) {
    return (
      <OneOfSelection
        resource={resource}
        filter={filter}
        attribute={attribute}
        onChange={onChange}
      />
    );
  }

  const handleBlur = (e) => {
    const values = e.target.value
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);
    onChange(values);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
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
