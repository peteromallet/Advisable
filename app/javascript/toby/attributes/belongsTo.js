import React, { useState } from "react";
import { useField } from "formik";
import { useSchema } from "../components/schema";
import { useSearchResource, getNestedResource } from "../utilities";
import { Combobox } from "@advisable/donut";
import LinkToRecord from "../components/LinkToRecord";

export default {
  render: function RenderBelongsTo({ record, attribute }) {
    const value = record[attribute.name];
    if (!value) return null;
    return value._label;
  },
  renderDetail: function RenderDetail({ record, attribute }) {
    const value = record[attribute.name];
    if (!value) return null;
    return <LinkToRecord record={value} />;
  },
  initializeFormValue: function (record, attribute) {
    return record[attribute.name]?.id || undefined;
  },
  copy: function (attribute, record) {
    return record[attribute.name]?._label || "";
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
      <>
        <Combobox
          value={selection}
          loadOptions={handleSearch}
          onChange={handleChange}
          marginBottom={3}
        />
        {record[attribute.name] && (
          <LinkToRecord record={record[attribute.name]} />
        )}
      </>
    );
  },
};
