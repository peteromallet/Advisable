import React from "react";
import { withKnobs, text } from "@storybook/addon-knobs";
import Card from "../Card";
import Autocomplete from "./";

export default {
  title: "Autocomplete",
  decorators: [withKnobs],
};

export const singleSelect = () => {
  const [value, setValue] = React.useState("");

  return (
    <Card maxWidth={600} margin="50px auto" padding="l">
      <Autocomplete
        value={value}
        label="Choose a color"
        placeholder="Select a color"
        onChange={v => setValue(v.value)}
        options={COLORS.map(color => ({
          label: color,
          value: color,
        }))}
      />
    </Card>
  );
};

export const multipleSelect = () => {
  const [value, setValue] = React.useState([]);

  return (
    <Card maxWidth={600} margin="50px auto" padding="l">
      <Autocomplete
        multiple
        value={value}
        label="Choose a color"
        placeholder="Select a color"
        onChange={v => setValue(v)}
        options={COLORS.map(color => ({
          label: color,
          value: color,
        }))}
      />
    </Card>
  );
};

export const PrimarySelection = () => {
  const [value, setValue] = React.useState("");
  const [primary, setPrimary] = React.useState(null);

  return (
    <Card maxWidth={600} margin="50px auto" padding="l">
      <Autocomplete
        multiple
        value={value}
        label="Choose a color"
        primary={primary}
        onPrimaryChange={p => setPrimary(p)}
        placeholder="Select a color"
        onChange={v => setValue(v)}
        options={COLORS.map(color => ({
          label: color.charAt(0).toUpperCase() + color.slice(1),
          value: color,
        }))}
      />
    </Card>
  );
};

const COLORS = [
  "amber",
  "ash",
  "asphalt",
  "auburn",
  "avocado",
  "aquamarine",
  "azure",
  "beige",
  "bisque",
  "black",
  "blue",
  "bone",
  "bordeaux",
  "brass",
  "bronze",
  "brown",
  "burgundy",
  "camel",
  "caramel",
  "canary",
  "celeste",
  "cerulean",
  "champagne",
  "charcoal",
  "chartreuse",
  "chestnut",
  "chocolate",
  "citron",
  "claret",
  "coal",
  "cobalt",
  "coffee",
  "coral",
  "corn",
  "cream",
  "crimson",
  "cyan",
  "denim",
  "desert",
  "ebony",
  "ecru",
  "emerald",
  "feldspar",
  "fuchsia",
  "gold",
  "gray",
  "green",
  "heather",
  "indigo",
  "ivory",
  "jet",
  "khaki",
  "lime",
  "magenta",
  "maroon",
  "mint",
  "navy",
  "olive",
  "orange",
  "pink",
  "plum",
  "purple",
  "red",
  "rust",
  "salmon",
  "sienna",
  "silver",
  "snow",
  "steel",
  "tan",
  "teal",
  "tomato",
  "violet",
  "white",
  "yellow",
];
