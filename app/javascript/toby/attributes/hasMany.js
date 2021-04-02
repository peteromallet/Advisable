import React from "react";
import { useField } from "formik";
import { useSchema } from "../components/schema";
import { resourceByType, resourceAttribute } from "../utilities";
import { Attribute } from "./index";
import TagsInput from "../components/TagsInput";

export default {
  render: function RenderHasMany({ record, field }) {
    const schemaData = useSchema();

    const items = record[field.name].map((r) => {
      const resource = resourceByType(schemaData, r.__typename);
      const attribute = resourceAttribute(resource, field.labeledBy || "id");
      return <Attribute key={r.id} record={r} attribute={attribute} />;
    });

    return items.map((item, i) => {
      return [i > 0 && ", ", item];
    });
  },
  initializeFormValue: function (record, attribute) {
    return record[attribute.name].map((n) => n.id) || [];
  },
  input: function HasManyInput({ attribute }) {
    const [field, , helpers] = useField(attribute.name);

    return (
      <TagsInput
        value={field.value}
        onChange={(value) => helpers.setValue(value)}
      />
    );
  },
};
