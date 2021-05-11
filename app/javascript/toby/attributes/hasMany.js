import React, { useState } from "react";
import { useField } from "formik";
import TagsInput from "../components/TagsInput";
import { useSchema } from "../components/schema";
import { useSearchResource, getNestedResource } from "../utilities";
import { Combobox } from "@advisable/donut";

export default {
  render: function RenderHasMany({ record, field }) {
    const items = record[field.name].map((r) => {
      return r._label;
    });

    return items.map((item, i) => {
      return [i > 0 && ", ", item];
    });
  },
  initializeFormValue: function (record, attribute) {
    return record[attribute.name].map((n) => n.id) || [];
  },
  input: function HasManyInput({ resource, record, attribute }) {
    const schema = useSchema();
    const [, , { setValue }] = useField(attribute.name);
    const [selections, setSelections] = useState(
      record[attribute.name].map((v) => ({
        value: v.id,
        label: v._label,
      })),
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

    const handleChange = (next) => {
      setSelections(next);
      setValue(next.map((v) => v.value));
    };

    return (
      <Combobox
        multiple
        value={selections}
        loadOptions={handleSearch}
        onChange={handleChange}
      />
    );
  },
};
