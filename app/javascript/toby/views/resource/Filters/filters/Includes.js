import React, { useState } from "react";
import { Combobox } from "@advisable/donut";
import { useSchema } from "../../../../components/schema";
import { getNestedResource, useSearchResource } from "../../../../utilities";
import OneOf from "./OneOf";

function HasManyThroughIncludes({ resource, attribute, onChange }) {
  const schema = useSchema();
  const [selections, setSelections] = useState([]);
  const associatedResource = getNestedResource(
    schema,
    resource,
    attribute.name,
  );

  const search = useSearchResource(associatedResource);

  const handleSearch = async (query) => {
    const response = await search(query);
    const data = response.data?.records?.nodes || [];
    return data.map((node) => ({
      value: node.id,
      label: node._label,
    }));
  };

  const handleChange = (next) => {
    setSelections(next);
    onChange(next.map((v) => v.value));
  };

  return (
    <Combobox
      multiple
      value={selections}
      loadOptions={handleSearch}
      onChange={handleChange}
    />
  );
}

export default function Includes(props) {
  if (props.attribute.__typename === "HasManyThroughAttribute") {
    return <HasManyThroughIncludes {...props} />;
  }

  return <OneOf {...props} />;
}
