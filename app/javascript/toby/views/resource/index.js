import React from "react";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import { useResources } from "../../utilities";
import {
  StyledHeader,
  StyledHeaderRow,
  StyledHeaderCell,
  StyledRow,
  StyledCell,
} from "../../styles";
import useFilters from "./useFilters";
import Filters from "./Filters";
import Navigation from "../../components/Navigation";
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
      <StyledHeader>
        <Navigation />
        <Filters {...filterState} refetch={refetch} />
        <StyledHeaderRow>
          {resource.attributes.map((attr) => (
            <StyledHeaderCell key={attr.name}>{attr.name}</StyledHeaderCell>
          ))}
        </StyledHeaderRow>
      </StyledHeader>
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
