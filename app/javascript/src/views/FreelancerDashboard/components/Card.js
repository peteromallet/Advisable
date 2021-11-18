import styled from "styled-components";
import css from "@styled-system/css";

export default styled.div(
  css({
    padding: "12px",
    marginX: "-12px",
    cursor: "pointer",
    display: "flex",
    border: "2px solid transparent",
    borderRadius: "16px",
    transition: "border-color 200ms, box-shadow 200ms, transform 200ms",
    "&:hover": {
      transform: "translateY(-2px)",
      borderColor: "neutral100",
      boxShadow: "0 6px 20px -8px rgba(0, 0, 0, 0.12)",
    },
  }),
);
