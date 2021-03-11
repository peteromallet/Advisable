import React from "react";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import { useFetchResources } from "../../utilities";
import {
  StyledLayout,
  StyledLayoutBody,
  StyledHeader,
  StyledHeaderRow,
  StyledHeaderCell,
  StyledRow,
  StyledCell,
} from "../../styles";
import useFilters from "./useFilters";
import FilterMenu from "./FilterMenu";
import Navigation from "../../components/Navigation";
import { Attribute } from "../../attributes";

export default function Resource() {
  const filterState = useFilters();
  const { loading, data, resource, fetchMore, error } = useFetchResources(
    filterState.filters,
  );

  const hasNextPage = data?.records.pageInfo.hasNextPage;
  const endCursor = data?.records.pageInfo.endCursor;

  const scrollRef = useBottomScrollListener(() => {
    if (!hasNextPage) return;
    fetchMore({ variables: { cursor: endCursor } });
  });

  const edges = data?.records.edges || [];

  if (error) {
    return <>Failed to load {resource.type}</>;
  }

  return (
    <StyledLayout ref={scrollRef}>
      <StyledHeader>
        <Navigation />
        <FilterMenu resource={resource} {...filterState} />
      </StyledHeader>
      <StyledHeaderRow style={{ width: 200 * resource.attributes.length }}>
        {resource.attributes.map((attr) => (
          <StyledHeaderCell key={attr.name}>
            {attr.columnLabel}
          </StyledHeaderCell>
        ))}
      </StyledHeaderRow>
      <StyledLayoutBody style={{ width: 200 * resource.attributes.length }}>
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
      </StyledLayoutBody>
    </StyledLayout>
  );
}
