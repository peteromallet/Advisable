import React from "react";
import TagsInput from "../../../../components/TagsInput";

export default function OneOf({ value, onChange }) {
  return <TagsInput value={value} onChange={onChange} />;
}
