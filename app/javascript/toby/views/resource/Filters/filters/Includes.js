import React, { useEffect, useMemo, useState } from "react";
import { Combobox } from "@advisable/donut";
import {
  getNestedResource,
  useSearchResource,
  generateCollectionQuery,
} from "../../../../utilities";
import OneOf from "./OneOf";
import { useApolloClient } from "@apollo/client";
import { useToby } from "../../../../components/TobyProvider";

function HasManyThroughIncludes({ resource, attribute, onChange, value }) {
  const toby = useToby();
  const client = useApolloClient();
  const [loaded, setLoaded] = useState(value?.length === 0 ? true : false);
  const [selections, setSelections] = useState([]);
  const associatedResource = useMemo(
    () => getNestedResource(toby, resource, attribute.name),
    [toby, resource, attribute],
  );

  useEffect(() => {
    if (loaded) return;

    const query = generateCollectionQuery(toby, associatedResource);
    const loadRecords = async () => {
      const r = await client.query({
        query,
        variables: {
          filters: [
            {
              attribute: "id",
              type: "oneOf",
              value: value,
            },
          ],
        },
      });

      setSelections(
        r.data.records.edges.map((edge) => ({
          value: edge.node.id,
          label: edge.node._label,
        })),
      );

      setLoaded(true);
    };

    loadRecords();
  }, [loaded, client, toby, associatedResource, value]);

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

  if (!loaded) return <>loading...</>;

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
