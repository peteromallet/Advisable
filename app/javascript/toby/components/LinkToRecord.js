import React from "react";
import { ChevronRight } from "@styled-icons/heroicons-solid";
import { Link } from "react-router-dom";
import { Box } from "@advisable/donut";
import { css } from "@styled-system/css";
import { recordPath } from "../utilities";

export default function LinkToRecord({ record }) {
  return (
    <Link to={recordPath(record)}>
      <Box
        css={css({
          padding: 4,
          display: "flex",
          color: "neutral900",
          border: "2px solid",
          borderRadius: "12px",
          alignItems: "center",
          borderColor: "neutral100",
          "&:hover": {
            cursor: "pointer",
            borderColor: "neutral300",
          },
        })}
      >
        <Box flex={1} fontWeight={460}>
          {record?._label}
        </Box>
        <Box color="neutral500">
          <ChevronRight size={20} />
        </Box>
      </Box>
    </Link>
  );
}
