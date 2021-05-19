import React from "react";
import { Box, Text } from "@advisable/donut";
import StyledChevronInputOption, { Loading } from "./styles";
import { ChevronForward } from "@styled-icons/ionicons-outline/ChevronForward";
import { useFormikContext } from "formik";

function ChevronButtonInput({ value, options, alignWidth, size = "m", name }) {
  const formik = useFormikContext();

  const handleClick = (value) => (e) => {
    formik.setFieldValue(name, value);
    formik.submitForm();
    e.preventDefault();
    return;
  };

  return (
    <Box>
      <Box
        display="grid"
        gridTemplateColumns={`1, ${alignWidth ? "minmax(0, 1fr)" : "auto"})`}
        gridColumnGap={2}
        gridRowGap={2}
        css={formik.isSubmitting && "cursor: wait;"}
      >
        {options.map((option) => (
          <StyledChevronInputOption
            size={size}
            type="submit"
            key={option.value}
            data-selected={value === option.value}
            data-submitting={formik.isSubmitting}
            disabled={value !== option.value && formik.isSubmitting}
            // disabled={true}
            aria-label={option.label}
            onClick={handleClick(option.value)}
          >
            <Text
              as="span"
              fontSize={["xs", "m"]}
              fontWeight="light"
              lineHeight={["16px", "normal"]}
            >
              {option.label}
            </Text>
            <Box
              width="24px"
              height="24px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {formik.isSubmitting && value === option.value ? (
                <Loading />
              ) : (
                <ChevronForward />
              )}
            </Box>
          </StyledChevronInputOption>
        ))}
      </Box>
    </Box>
  );
}

export default ChevronButtonInput;
