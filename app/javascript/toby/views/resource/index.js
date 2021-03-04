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
import Filters from "./Filters";
import Navigation from "../../components/Navigation";
import { Attribute } from "../../attributes";

export default function Resource() {
  const filterState = useFilters();
  const { loading, data, resource, fetchMore, error } = useFetchResources(
    filterState.filters,
  );
  // [
  //   {
  //     attribute: "id",
  //     type: "one_of",
  //     value: ["2", "3", "5", "7"],
  //   },
  //   {
  //     attribute: "user",
  //     type: "one_of",
  //     value: {
  //       resource: "users",
  //       attribute: "account",
  //       type: "one_of",
  //       value: {
  //         resource: "accounts",
  //         attribute: "lastName",
  //         type: "contains",
  //         value: ["Cull"],
  //       },
  //     },
  //   },
  // ],
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
    <StyledLayout>
      <StyledHeader>
        <Navigation />
        <Filters {...filterState} />
        <StyledHeaderRow>
          {resource.attributes.map((attr) => (
            <StyledHeaderCell key={attr.name}>
              {attr.columnLabel}
            </StyledHeaderCell>
          ))}
        </StyledHeaderRow>
      </StyledHeader>
      <StyledLayoutBody ref={scrollRef}>
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
