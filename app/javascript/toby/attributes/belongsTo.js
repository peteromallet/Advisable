import React from "react";
import { useSchemaIntrospection } from "../components/schema";
import { useResources, getResourceColumn } from "../components/resources";
import { getType } from "../utilities/schema";
import { getColumnRenderComponent } from "./index";

export default {
  render: function RenderBelongsTo({ record, field }) {
    return record[field.name].id;
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
