import React from "react";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import { useResources } from "../../utilities";
import StringAttribute from "../../attributes/string";
import BelongsToAttribute from "../../attributes/belongsTo";
import { StyledRow, StyledCell } from "../../styles";

const ATTRIBUTES = {
  StringAttribute,
  BelongsToAttribute,
};

function renderField(record, field) {
  const renderer = ATTRIBUTES[field.__typename];
  return renderer.render({ record, field });
}

export default function Resource() {
  const { loading, data, resource, fetchMore, error } = useResources();

  const hasNextPage = data?.records.pageInfo.hasNextPage;
  const endCursor = data?.records.pageInfo.endCursor;

  useBottomScrollListener(() => {
    if (!hasNextPage) return;
    fetchMore({ variables: { cursor: endCursor } });
  });

  const edges = data?.records.edges || [];

  return (
    <>
      <StyledRow>
        <StyledCell>id</StyledCell>
        {resource.attributes.map((attr) => (
          <StyledCell key={attr.name}>{attr.name}</StyledCell>
        ))}
      </StyledRow>
      {edges.map(({ node }) => (
        <StyledRow key={node.id}>
          <StyledCell>{node.id}</StyledCell>
          {resource.attributes.map((attr) => (
            <StyledCell key={attr.name}>{renderField(node, attr)}</StyledCell>
          ))}
        </StyledRow>
      ))}
      {loading && <>loading...</>}
    </>
  );
}
