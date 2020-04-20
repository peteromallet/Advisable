import React from "react";
import { useField } from "formik";
import { Input, Label, InputError } from "@advisable/donut";
import uniqueId from "lodash/uniqueId";

const FormField = ({ label, as: Component = Input, ...props }) => {
  const [field, meta] = useField(props);
  const id = React.useMemo(() => props.id || uniqueId("formField"), [props.id]);

  return (
    <>
      <Label htmlFor={id} mb="xs">
        {label}
      </Label>
      <Component
        {...field}
        {...props}
        id={id}
        error={meta.touched && meta.error}
      />
      {meta.touched && meta.error ? (
        <InputError mt="xs">{meta.error}</InputError>
      ) : null}
    </>
  );
};

export default FormField;
