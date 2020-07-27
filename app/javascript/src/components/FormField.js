import React from "react";
import PropTypes from "prop-types";
import { useField } from "formik";
import { margin } from "styled-system";
import styled from "styled-components";
import { Box, Text, Input, Label, InputError } from "@advisable/donut";
import { uniqueId } from "lodash-es";

const StyledFormField = styled.div`
  ${margin}
`;

const FormField = ({
  label,
  as: Component = Input,
  prefix,
  suffix,
  labelHint,
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
        </Box>
      )}
      {description && (
        <Text fontSize="s" lineHeight="s" color="neutral600" my="-4px" mb="s">
          {description}
        </Text>
      )}
      <Component
        {...field}
        id={id}
        prefix={prefix}
        suffix={suffix}
        error={meta.touched && meta.error}
        placeholder={props.placeholder || label}
        {...props}
      />
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
