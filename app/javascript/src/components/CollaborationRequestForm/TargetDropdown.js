import React from "react";
import { useApolloClient } from "@apollo/client";
import { Box, Combobox } from "@advisable/donut";
import { useField } from "formik";
import SEARCH_LABELS from "./queries/searchLabels.gql";
import {
  Hashtag,
  LocationMarker,
  OfficeBuilding,
  Puzzle,
} from "@styled-icons/heroicons-solid";

const ICONS = {
  Skill: Puzzle,
  Industry: OfficeBuilding,
  Location: LocationMarker,
  Other: Hashtag,
};

function LabelOption({ option }) {
  return (
    <Box display="flex" alignItems="center" width="100%">
      <Box marginRight={2} color="neutral600">
        {React.createElement(ICONS[option.kind], { size: 20 })}
      </Box>
      <Box flex={1}>{option.label}</Box>
      <Box color="neutral500">{option.kind}</Box>
    </Box>
  );
}

export default function TargetDropdown() {
  const client = useApolloClient();
  const [field, , { setValue }] = useField("labels");

  const handleSearch = async (name) => {
    const response = await client.query({
      query: SEARCH_LABELS,
      variables: { name },
    });

    return (response.data?.searchLabels || []).map((label) => {
      return {
        ...label,
        value: label.name,
        label: label.name,
      };
    });
  };

  return (
    <Combobox
      max={5}
      multiple
      value={field.value}
      loadOptions={handleSearch}
      placeholder="Skills, industries, locations..."
      onChange={setValue}
      optionComponent={LabelOption}
      closeOnSelect={false}
    />
  );
}
