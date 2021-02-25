import React from "react";
import { Text } from "@advisable/donut";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import { useResources } from "../../utilities";
import { StyledRow, StyledCell } from "../../styles";
import useFilters from "./useFilters";
import Filters from "./Filters";
import { Attribute } from "../../attributes";

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
          <StyledCell key={attr.name}>
            <Text fontWeight="500">{attr.name}</Text>
          </StyledCell>
        ))}
      </StyledRow>
      {edges.map(({ node }) => (
        <StyledRow key={node.id}>
          {resource.attributes.map((attr) => (
            <StyledCell key={attr.name}>
              <Attribute record={node} attribute={attr} />
            </StyledCell>
          ))}
        </StyledRow>
      ))}
      {loading && <>loading...</>}
    </>
  );
}
