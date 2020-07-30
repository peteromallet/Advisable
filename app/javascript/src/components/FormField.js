import React from "react";
import { useField } from "formik";
import styled from "styled-components";
import { margin } from "styled-system";
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
        <Box display="flex" alignItems="baseline" mb="xs">
          <Box flexGrow="1">
            <Label htmlFor={id}>{label}</Label>
            {isRequired && (
              <Text pl="4px" as="span" color="red300" fontWeight="medium">
                *
              </Text>
            )}
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

export default FormField;
