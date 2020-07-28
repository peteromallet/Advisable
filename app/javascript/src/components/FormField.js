import React from "react";
import PropTypes from "prop-types";
import { useField } from "formik";
import { margin } from "styled-system";
import styled from "styled-components";
import {
  Columns,
  Text,
  Input,
  Label,
  InputError,
  InputDecorations,
} from "@advisable/donut";
import { uniqueId } from "lodash-es";

const StyledFormField = styled.div`
  ${margin}
`;

const FormField = ({
  label,
  as: Component = Input,
  prefix,
  suffix,
  optional,
  description,
  margin,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  marginX,
  marginY,
  ...props
}) => {
  const [field, meta] = useField(props);
  const id = React.useMemo(() => props.id || uniqueId("formField"), [props.id]);

  return (
    <StyledFormField
      margin={margin}
      marginX={marginX}
      marginY={marginY}
      marginTop={marginTop}
      marginLeft={marginLeft}
      marginRight={marginRight}
      marginBottom={marginBottom}
    >
      {label && (
        <Columns align="top" mb="xs">
          <Columns.Column expand>
            <Label htmlFor={id}>{label}</Label>
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
    </StyledFormField>
  );
};

FormField.propTypes = {
  label: PropTypes.string,
  prefix: PropTypes.string,
  suffix: PropTypes.string,
  description: PropTypes.string,
};

export default FormField;
