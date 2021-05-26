import React from "react";
import PropTypes from "prop-types";
import { useField } from "formik";
import { margin } from "styled-system";
import styled from "styled-components";
import { Box, Text, Input, Label, InputError } from "@advisable/donut";
import uniqueId from "lodash/uniqueId";

const StyledFormField = styled.div`
  ${margin}
`;

const FormField = ({
  label,
  isRequired,
  as: Component = Input,
  widget: Widget,
  prefix,
  suffix,
  labelHint,
  caption,
  description,
  charLimit,
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

  // Characters counter
  const isCountable = typeof meta?.value === "string" && charLimit;
  const charLeft = isCountable && charLimit - meta.value.length;
  const limitExceeded = charLeft < 0;

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
      <Box display="flex" alignItems="flex-end" width="100%">
        <Box width="100%">
          {label && (
            <Box display="flex" alignItems="baseline" mb={2}>
              <Box flexGrow="1">
                <Label htmlFor={id}>
                  {label}
                  {isRequired && (
                    <Text pl={1} as="span" color="red300" fontWeight="medium">
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
                    paddingLeft={5}
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
              fontSize="15px"
              lineHeight="18px"
              color="neutral600"
              my="-4px"
              mb={2}
            >
              {description}
            </Text>
          )}
        </Box>
        {isCountable ? (
          <Box
            display="flex"
            justifyContent="flex-end"
            ml="auto"
            mb={description ? 2 : 1}
            minWidth="60px"
          >
            <Text
              bg={limitExceeded && "red100"}
              color={limitExceeded ? "red400" : "neutral400"}
              p={1}
            >
              {charLeft}
            </Text>
          </Box>
        ) : null}
      </Box>
      <Box position="relative">
        <Component
          {...field}
          id={id}
          prefix={prefix}
          suffix={suffix}
          error={meta.touched && meta.error}
          placeholder={props.placeholder || label}
          {...props}
        />
        {Widget && <Widget field={field} meta={meta} {...props} />}
      </Box>
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
  widget: PropTypes.func,
};

export default FormField;
