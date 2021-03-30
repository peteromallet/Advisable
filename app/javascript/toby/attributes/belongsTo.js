import React from "react";
import { useField } from "formik";
import { useSchema } from "../components/schema";
import { resourceByType, resourceAttribute } from "../utilities";
import { Attribute } from "./index";
import { Input } from "@advisable/donut";

export default {
  render: function RenderBelongsTo({ record, field }) {
    const schemaData = useSchema();
    const value = record[field.name];
    if (!value) return null;
    const resource = resourceByType(schemaData, value.__typename);
    const attribute = resourceAttribute(resource, field.labeledBy || "id");
    return <Attribute record={value} attribute={attribute} />;
  },
  initializeFormValue: function (record, attribute) {
    return record[attribute.name]?.id || undefined;
  },
  input: function BelongsToAttributeInput({ attribute, record }) {
    const [field] = useField(attribute.name);
    return <Input size="sm" {...field} />;
  },
};
