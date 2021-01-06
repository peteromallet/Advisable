import React from "react";
import { useBreakpoint } from "@advisable/donut";
import Desktop from "./Desktop";
import Mobile from "./Mobile";
import useCombobox from "./useCombobox";

export default function Autocomplete(props) {
  const sUp = useBreakpoint("sUp");
  const combobox = useCombobox(props);

  if (sUp) {
    return <Desktop {...props} {...combobox} />;
  }

  return <Mobile {...props} {...combobox} />;
}
