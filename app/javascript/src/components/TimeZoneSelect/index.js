import React from "react";
import { Combobox } from "@advisable/donut";
import ZONES from "./zones";

const OPTIONS = ZONES.map((z) => ({ label: z, value: z }));

function TimeZoneSelect(props) {
  return <Combobox {...props} options={OPTIONS} />;
}

export default TimeZoneSelect;
