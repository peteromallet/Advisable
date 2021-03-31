import React from "react";
import TagsInput from "./index";

export default {
  title: "Components/TagsInput",
};

export const Basic = () => {
  const [value, setValue] = React.useState([]);

  return <TagsInput value={value} onChange={setValue} />;
};
