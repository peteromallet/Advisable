import React from "react";
import IdAttribute from "./id";
import StringAttribute from "./string";
import SelectAttribute from "./select";
import HasManyAttribute from "./hasMany";
import TextArrayAttribute from "./textArray";
import BelongsToAttribute from "./belongsTo";

const ATTRIBUTES = {
  IdAttribute,
  TextArrayAttribute,
  StringAttribute,
  BelongsToAttribute,
  HasManyAttribute,
  SelectAttribute,
};

export function Attribute({ record, attribute }) {
  const handler = ATTRIBUTES[attribute.__typename];
  return <handler.render record={record} field={attribute} />;
}

export default ATTRIBUTES;
