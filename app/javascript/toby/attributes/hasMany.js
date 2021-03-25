import React from "react";
import { useSchema } from "../components/schema";
import { resourceByType, resourceAttribute } from "../utilities";
import { Attribute } from "./index";

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
};
