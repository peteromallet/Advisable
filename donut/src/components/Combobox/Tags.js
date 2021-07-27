import React from "react";
import css from "@styled-system/css";
import { X } from "@styled-icons/heroicons-solid/X";
import { Box } from "@advisable/donut";

export default function ComboboxTags({ value, removeOption }) {
  return (
    <Box paddingTop={4}>
      {value.map((v) => (
        <Box
          size="s"
          key={v.value}
          marginRight={2}
          marginBottom={2}
          display="inline-flex"
          height="32px"
          bg="blue50"
          border="1px solid"
          color="blue800"
          borderColor="blue200"
          paddingLeft={3}
          fontSize="15px"
          borderRadius="12px"
          alignItems="Center"
        >
          <Box marginTop="-1px">{v.label}</Box>
          <Box
            width="32px"
            height="32px"
            display="inline-flex"
            justifyContent="center"
            alignItems="center"
            opacity="0.4"
            onClick={() => removeOption(v.value)}
            css={css({
              "&:hover": {
                opaciy: 1,
              },
            })}
          >
            <X size={16} />
          </Box>
        </Box>
      ))}
    </Box>
  );
}
