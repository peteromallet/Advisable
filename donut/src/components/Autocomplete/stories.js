import React from "react";
import { storiesOf } from "@storybook/react";
import Autocomplete from "./";

const options = [
  { label: "Ireland", value: "irl" },
  { label: "United Kingdom", value: "gbr" },
  { label: "Germany", value: "deu" },
  { label: "France", value: "fra" },
  { label: "United States", value: "usa" },
  { label: "Japan", value: "jpn" },
  { label: "Sweeden", value: "swe" },
];

storiesOf("Autocomplete", module).add("Basic", () =>
  React.createElement(() => {
    return (
      <div style={{ width: 550, margin: "50px auto " }}>
        <Autocomplete
          label="Select a country"
          placeholder="Search for a country..."
          options={options}
        />
      </div>
    );
  })
);
