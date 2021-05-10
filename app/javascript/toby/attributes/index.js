import React from "react";
import { useField } from "formik";
import { FieldError } from "@advisable/donut";
import IdAttribute from "./id";
import StringAttribute from "./string";
import SelectAttribute from "./select";
import HasManyAttribute from "./hasMany";
import HasOneAttribute from "./hasOne";
import DateAttribute from "./date";
import BooleanAttribute from "./boolean";
import DateTimeAttribute from "./dateTime";
import CurrencyAttribute from "./currency";
import TextArrayAttribute from "./textArray";
import BelongsToAttribute from "./belongsTo";
import IntegerAttribute from "./integer";
import LongTextAttribute from "./longText";

const ATTRIBUTES = {
  IdAttribute,
  CurrencyAttribute,
  TextArrayAttribute,
  StringAttribute,
  BelongsToAttribute,
  HasManyAttribute,
  HasOneAttribute,
  DateAttribute,
  DateTimeAttribute,
  BooleanAttribute,
  IntegerAttribute,
  HasManyThroughAttribute: HasManyAttribute,
  SelectAttribute,
  LongTextAttribute,
};

export function Attribute({ record, attribute }) {
  const handler = ATTRIBUTES[attribute.__typename];

  if (!handler) {
    console.error("No attribute handler found", attribute);
    return <div>{record[attribute.name]}</div>;
  }

  return <handler.render record={record} field={attribute} />;
}

// each attribute needs to be able to tell the UI how it's value should be
// initialized in the form. e.g a belogns to attribute needs to be stored in
// form state as the associated resource id.
export function attributeFormValueInitializer(attribute) {
  const handler = ATTRIBUTES[attribute.__typename];
  return handler?.initializeFormValue;
}

function AttributeField({ component: Component, record, attribute, ...props }) {
  const [, meta] = useField(attribute.name);
  const error = meta.touched && meta.error;

  return (
    <>
      <Component record={record} attribute={attribute} {...props} />
      {error && <FieldError mt={2}>{error}</FieldError>}
    </>
  );
}

export function AttributeInput({ record, attribute, ...props }) {
  const handler = ATTRIBUTES[attribute.__typename];

  if (attribute.readonly || !handler?.input) {
    return <Attribute record={record} attribute={attribute} />;
  }

  return (
    <AttributeField
      component={handler.input}
      record={record}
      attribute={attribute}
      {...props}
    />
  );
}

export default ATTRIBUTES;
