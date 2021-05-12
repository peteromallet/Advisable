import React, { useState } from "react";
import { useField } from "formik";
import { useSchema } from "../components/schema";
import { useSearchResource, getNestedResource } from "../utilities";
import { Combobox } from "@advisable/donut";

export default {
  render: function RenderBelongsTo({ record, field }) {
    const value = record[field.name];
    if (!value) return null;
    return value._label;
  },
  initializeFormValue: function (record, attribute) {
    return record[attribute.name]?.id || undefined;
  },
  input: function BelongsToAttributeInput({ resource, attribute, record }) {
    const schema = useSchema();
    const [, , { setValue }] = useField(attribute.name);
    const [selection, setSelection] = useState(
      record[attribute.name]
        ? {
            value: record[attribute.name].id,
            label: record[attribute.name]._label,
          }
        : undefined,
    );

    const associatedResource = getNestedResource(
      schema,
      resource,
      attribute.name,
    );

    const search = useSearchResource(associatedResource);

    const handleSearch = async (query) => {
      const response = await search(query);
      const data = response.data?.records?.nodes || [];
      return data.map((node) => ({
        value: node.id,
        label: node._label,
      }));
    };

    const handleChange = (selection) => {
      setSelection(selection);
      setValue(selection.value);
    };

    return (
      <Combobox
        value={selection}
        loadOptions={handleSearch}
        onChange={handleChange}
      />
    );
  },
};
