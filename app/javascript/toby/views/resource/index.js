import React, { useState } from "react";
import { Box } from "@advisable/donut";
import { motion } from "framer-motion";
import { useHistory, useLocation } from "react-router-dom";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import { useFetchResources } from "../../utilities";
import {
  StyledLayout,
  StyledHeader,
  StyledHeaderRow,
  StyledHeaderCell,
  StyledRow,
  StyledCell,
  StyledViewport,
  StyledScrollContainer,
} from "../../styles";
import FilterDrawer from "./Filters";
import Navigation from "../../components/Navigation";
import { Attribute } from "../../attributes";
import DetailsModal from "./DetailsModal";

export default function Resource() {
  const history = useHistory();
  const location = useLocation();
  const [filters, setFilters] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const { loading, data, resource, fetchMore, error } = useFetchResources(
    filters,
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

  const openRecord = (id) => () => {
    history.push(`${location.pathname}/${id}`);
  };

  return (
    <StyledLayout ref={scrollRef}>
      <DetailsModal resource={resource} />
      <StyledHeader>
        <Navigation />
        <button onClick={() => setIsOpen(!isOpen)}>Open filters</button>
      </StyledHeader>
      <StyledViewport>
        <FilterDrawer resource={resource} open={isOpen} onApply={setFilters} />
        <StyledScrollContainer
          as={motion.div}
          transition={{ duration: 0.2 }}
          animate={{ x: isOpen ? 400 : 0 }}
        >
          {/* Dear future developer. I know this inline-block looks random. But its important. */}
          <Box display="inline-block">
            <StyledHeaderRow>
              {resource.attributes.map((attr) => (
                <StyledHeaderCell key={attr.name}>
                  {attr.columnLabel}
                </StyledHeaderCell>
              ))}
            </StyledHeaderRow>
            <Box>
              {edges.map(({ node }) => (
                <StyledRow key={node.id} onClick={openRecord(node.id)}>
                  {resource.attributes.map((attr) => (
                    <StyledCell key={attr.name}>
                      <Attribute record={node} attribute={attr} />
                    </StyledCell>
                  ))}
                </StyledRow>
              ))}
              {loading && <>loading...</>}
            </Box>
          </Box>
        </StyledScrollContainer>
      </StyledViewport>
    </StyledLayout>
  );
}
