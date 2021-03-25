import React from "react";
import { useSchema } from "../components/schema";
import { resourceByType, resourceAttribute } from "../utilities";
import { Attribute } from "./index";

export default {
  render: function RenderBelongsTo({ record, field }) {
    const schemaData = useSchema();
    const value = record[field.name];
    if (!value) return null;
    const resource = resourceByType(schemaData, value.__typename);
    const attribute = resourceAttribute(resource, field.labeledBy || "id");
    return <Attribute record={value} attribute={attribute} />;
  },
};
