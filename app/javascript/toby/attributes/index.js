import React from "react";
import IdAttribute from "./id";
import StringAttribute from "./string";
import SelectAttribute from "./select";
import HasManyAttribute from "./hasMany";
import HasOneAttribute from "./hasOne";
import CurrencyAttribute from "./currency";
import TextArrayAttribute from "./textArray";
import BelongsToAttribute from "./belongsTo";

const ATTRIBUTES = {
  IdAttribute,
  CurrencyAttribute,
  TextArrayAttribute,
  StringAttribute,
  BelongsToAttribute,
  HasManyAttribute,
  HasOneAttribute,
  HasManyThroughAttribute: HasManyAttribute,
  SelectAttribute,
};

export function Attribute({ record, attribute }) {
  const handler = ATTRIBUTES[attribute.__typename];

  if (!handler) {
    console.error("No attribute handler found", attribute);
    return null;
  }

  return <handler.render record={record} field={attribute} />;
}

export default ATTRIBUTES;
