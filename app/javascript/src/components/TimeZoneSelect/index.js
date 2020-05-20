import React from "react";
import { Autocomplete } from "@advisable/donut";
import ZONES from "./zones";

const OPTIONS = ZONES.map((z) => ({ label: z, value: z }));

function TimeZoneSelect(props) {
  return <Autocomplete {...props} options={OPTIONS} />;
}

export default TimeZoneSelect;
