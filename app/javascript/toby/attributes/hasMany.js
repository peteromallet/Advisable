import React, { useState } from "react";
import { useField } from "formik";
import { useSchema } from "../components/schema";
import { useSearchResource, getNestedResource } from "../utilities";
import { Stack, Combobox } from "@advisable/donut";
import LinkToRecord from "../components/LinkToRecord";

export default {
  render: function RenderHasMany({ record, attribute }) {
    const items = record[attribute.name].map((r) => {
      return r._label;
    });

    return items.map((item, i) => {
      return [i > 0 && ", ", item];
    });
  },
  renderDetail: function RenderHasManyDetail({ record, attribute }) {
    const records = record[attribute.name] || [];

    return (
      <Stack spacing={3}>
        {records.map((record) => (
          <LinkToRecord key={record.id} record={record} />
        ))}
      </Stack>
    );
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

    const records = record[attribute.name] || [];

    return (
      <Stack spacing={3}>
        <Combobox
          multiple
          value={selections}
          loadOptions={handleSearch}
          onChange={handleChange}
        />
        {records.map((record) => (
          <LinkToRecord key={record.id} record={record} />
        ))}
      </Stack>
    );
  },
};
