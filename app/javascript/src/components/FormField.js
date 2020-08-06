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
  isRequired,
  as: Component = Input,
  prefix,
  suffix,
  labelHint,
  caption,
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

  const hasError = meta.touched && meta.error;

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
        <Box display="flex" alignItems="baseline" mb="xs">
          <Box flexGrow="1">
            <Label htmlFor={id}>
              {label}
              {isRequired && (
                <Text pl="4px" as="span" color="red300" fontWeight="medium">
                  *
                </Text>
              )}
            </Label>
          </Box>
          {labelHint && (
            <Box>
              <Text
                fontSize="xs"
                lineHeight="s"
                color="neutral400"
                paddingLeft="20px"
                letterSpacing="-0.01em"
              >
                {labelHint}
              </Text>
            </Box>
          )}
        </Box>
      )}
      {description && (
        <Text
          fontSize="14px"
          lineHeight="s"
          color="neutral600"
          my="-4px"
          mb="8px"
        >
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
      {hasError ? <InputError mt="xs">{meta.error}</InputError> : null}
      {!hasError && caption ? (
        <Text
          fontSize="14px"
          letterSpacing="-0.02em"
          lineHeight="s"
          color="neutral600"
          marginTop="8px"
        >
          {caption}
        </Text>
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
