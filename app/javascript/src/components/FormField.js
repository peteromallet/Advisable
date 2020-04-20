import React from "react";
import { useField } from "formik";
import { Input, Label, InputError } from "@advisable/donut";

const FormField = ({ label, as: Component = Input, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <Label htmlFor={props.id || props.name} mb="xs">
        {label}
      </Label>
      <Component {...field} {...props} error={meta.touched && meta.error} />
      {meta.touched && meta.error ? (
        <InputError mt="xs">{meta.error}</InputError>
      ) : null}
    </>
  );
};

export default FormField;
