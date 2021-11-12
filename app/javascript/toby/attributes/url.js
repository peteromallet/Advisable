import React from "react";
import { useField } from "formik";
import { Link, Input } from "@advisable/donut";

function UrlAttribute({ record, attribute }) {
  const value = record[attribute.name];
  if (!value) return null;

  const handleClick = (e) => {
    e.stopPropagation();
  };

  return (
    <Link.External
      href={value}
      rel="noreferrer"
      target="_blank"
      onClick={handleClick}
    >
      {value}
    </Link.External>
  );
}

function UrlAttributeInput({ attribute, record }) {
  const [field, meta] = useField(attribute.name);
  if (attribute.readonly) return record[attribute.name];

  const error = meta.touched && meta.error;

  return <Input size="sm" error={error} {...field} />;
}

export default {
  render: UrlAttribute,
  input: UrlAttributeInput,
  copy: function (attribute, record) {
    return record[attribute.name] || "";
  },
  initializeFormValue: function (record, attribute) {
    return record[attribute.name] || "";
  },
};
