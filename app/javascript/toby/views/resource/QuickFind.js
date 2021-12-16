import { Search } from "@styled-icons/heroicons-solid";
import React from "react";
import { Box } from "@advisable/donut";
import { useHistory, useLocation } from "react-router-dom";
import Combobox from "src/components/Combobox";
import { recordPath, useSearchResource } from "../../utilities";

export default function QuickFind({ resource }) {
  const history = useHistory();
  const location = useLocation();
  const search = useSearchResource(resource);

  const handleSearch = async (query) => {
    const response = await search(query);
    const data = response.data?.records?.nodes || [];
    return data.map((node) => ({
      __typename: node.__typename,
      id: node.id,
      value: node.id,
      label: node._label,
    }));
  };

  const handleSelect = (value) => {
    history.push({
      ...location,
      pathname: recordPath(value),
    });
  };

  return (
    <Box width="400px">
      <Combobox
        size="xs"
        prefix={<Search />}
        placeholder="Search"
        loadOptions={handleSearch}
        onChange={handleSelect}
      />
    </Box>
  );
}
