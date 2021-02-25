import React from "react";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import { useResources } from "../../utilities";
import IdAttribute from "../../attributes/id";
import StringAttribute from "../../attributes/string";
import SelectAttribute from "../../attributes/select";
import HasManyAttribute from "../../attributes/hasMany";
import TextArrayAttribute from "../../attributes/textArray";
import BelongsToAttribute from "../../attributes/belongsTo";
import { StyledRow, StyledCell } from "../../styles";
import useFilters from "./useFilters";
import Filters from "./Filters";

const ATTRIBUTES = {
  IdAttribute,
  TextArrayAttribute,
  StringAttribute,
  BelongsToAttribute,
  HasManyAttribute,
  SelectAttribute,
};

function renderField(record, field) {
  const renderer = ATTRIBUTES[field.__typename];
  return <renderer.render record={record} field={field} />;
}

export default function Resource() {
  const filterState = useFilters();
  const { loading, data, resource, fetchMore, refetch, error } = useResources();

  const hasNextPage = data?.records.pageInfo.hasNextPage;
  const endCursor = data?.records.pageInfo.endCursor;

  useBottomScrollListener(() => {
    if (!hasNextPage) return;
    fetchMore({ variables: { cursor: endCursor } });
  });

  const edges = data?.records.edges || [];

  if (error) {
    return <>Failed to load {resource.type}</>;
  }

  return (
    <>
      <Filters {...filterState} refetch={refetch} />
      <StyledRow>
        {resource.attributes.map((attr) => (
          <StyledCell key={attr.name}>{attr.name}</StyledCell>
        ))}
      </StyledRow>
      {edges.map(({ node }) => (
        <StyledRow key={node.id}>
          {resource.attributes.map((attr) => (
            <StyledCell key={attr.name}>{renderField(node, attr)}</StyledCell>
          ))}
        </StyledRow>
      ))}
      {loading && <>loading...</>}
    </>
  );
}
