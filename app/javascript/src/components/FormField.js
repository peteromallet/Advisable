import React from "react";
import { useField } from "formik";
import {
  Columns,
  Text,
  Input,
  Label,
  InputError,
  InputDecorations,
} from "@advisable/donut";
import { uniqueId } from "lodash-es";

const FormField = ({
  label,
  as: Component = Input,
  prefix,
  suffix,
  optional,
  description,
  isRequired,
  ...props
}) => {
  const [field, meta] = useField(props);
  const id = React.useMemo(() => props.id || uniqueId("formField"), [props.id]);

  return (
    <>
      {label && (
        <Columns align="top" mb="xs">
          <Columns.Column expand>
            <Label htmlFor={id}>
              {label}
              {isRequired && (
                <Text as="span" color="red300">
                  *
                </Text>
              )}
            </Label>
          </Columns.Column>
          {optional && (
            <Text
              fontSize="xs"
              fontWeight="medium"
              color="neutral400"
              paddingLeft="20px"
              letterSpacing="-0.01em"
              lineHeight="s"
            >
              Optional
            </Text>
          )}
        </Columns>
      )}
      {description && (
        <Text fontSize="s" lineHeight="s" color="neutral600" my="-4px" mb="s">
          {description}
        </Text>
      )}
      <InputDecorations prefix={prefix} suffix={suffix}>
        <Component
          {...field}
          id={id}
          error={meta.touched && meta.error}
          placeholder={props.placeholder || label}
          {...props}
        />
      </InputDecorations>
      {meta.touched && meta.error ? (
        <InputError mt="xs">{meta.error}</InputError>
      ) : null}
    </>
  );
};

export default FormField;
