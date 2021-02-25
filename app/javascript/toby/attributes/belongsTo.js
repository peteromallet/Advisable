import React from "react";
import { Tag } from "@advisable/donut";
import { useSchema } from "../components/schema";
import { resourceByType, resourceAttribute } from "../utilities";

function resolveFieldLabel(schemaData, record, field, iteration = 1) {
  if (field.labelledBy) {
    const value = record[field.name];
    const resource = resourceByType(schemaData, value.__typename);
    const attribute = resourceAttribute(resource, field.labelledBy);
    return resolveFieldLabel(
      schemaData,
      record[field.name],
      attribute,
      iteration + 1,
    );
  } else {
    const result = record[field.name || "id"];
    if (typeof result === "object") {
      return result.id;
    }

    return result;
  }
}

export default {
  render: function RenderBelongsTo({ record, field }) {
    const schemaData = useSchema();
    return <Tag>{resolveFieldLabel(schemaData, record, field)}</Tag>;
    // const resources = useResources();
    // const schema = useSchemaIntrospection();
    // const type = getType(schema, record.__typename);
    // const field = type.fields.find((c) => c.name === column.field);

    // const columnConfig = getResourceColumn(
    //   resources,
    //   field.type.name,
    //   column.labeledBy || "id",
    // );

    // const Component = getColumnRenderComponent(columnConfig);
    // return <Component record={record[column.field]} column={columnConfig} />;
  },
  input: function BelongsToInput() {
    return <>div</>;
  },
};

// const stringAttribute = {
//   columnType: "StringColumnType",
//   query: (resource) => {
//     return attribute;
//   },
//   inputValue: (resource, attribute) => {
//     return resource[attribute.name];
//   },
//   render: function ReadStringAttribute(resource, attribute) {
//     return resource[attribute.name];
//   },
//   renderInput: function WriteSingleSelect(resource, attribute, formikField) {
// return <input {...formikField.field} />;
//   },
// };

// export default stringAttribute;
