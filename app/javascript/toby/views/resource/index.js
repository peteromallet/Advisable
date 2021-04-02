import React, { useState } from "react";
import { Box, Button } from "@advisable/donut";
import { Adjustments } from "@styled-icons/heroicons-solid/Adjustments";
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
import Loading from "./Loading";

export default function Resource({ resource }) {
  const history = useHistory();
  const location = useLocation();
  const [filters, setFilters] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const { loading, data, fetchMore, error } = useFetchResources(
    resource,
    filters,
  );

  const hasNextPage = data?.records.pageInfo.hasNextPage;
  const endCursor = data?.records.pageInfo.endCursor;

  const scrollRef = useBottomScrollListener(() => {
    if (!loading && !hasNextPage) return;
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
    <StyledLayout>
      <DetailsModal resource={resource} />
      <StyledHeader>
        <Navigation />
        <Button
          ml={2}
          mt={2}
          size="s"
          prefix={<Adjustments />}
          variant="subtle"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "Close Filters" : "Open filters"}
          {filters.length ? ` (${filters.length})` : null}
        </Button>
      </StyledHeader>
      <StyledViewport>
        <FilterDrawer resource={resource} open={isOpen} onApply={setFilters} />
        <StyledScrollContainer
          ref={scrollRef}
          as={motion.div}
          transition={{ duration: 0.2 }}
          animate={{ x: isOpen ? 400 : 0 }}
        >
          {/* Dear future developer. I know this inline-block looks random. But its important. */}
          <Box display="inline-block" minWidth="100vw">
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
              {loading && <Loading resource={resource} />}
            </Box>
          </Box>
        </StyledScrollContainer>
      </StyledViewport>
    </StyledLayout>
  );
}
