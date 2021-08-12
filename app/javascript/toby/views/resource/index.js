import React, { useCallback, useEffect, useMemo, useState } from "react";
import queryString from "query-string";
import { Box } from "@advisable/donut";
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
import LoadingIndicator from "src/components/Loading";
import Loading from "./Loading";
import { useResourceViews, useUpdateViewFilter } from "../../queries";
import HeaderButton from "../../components/HeaderButton";
import ViewsDropdown from "./ViewsDropdown";

export default function ResourceConfig({ resource }) {
  const { loading, data } = useResourceViews(resource.type);
  if (loading) return <LoadingIndicator />;

  return <Resource resource={resource} views={data.views} />;
}

function initializeViewFilters(view) {
  if (!view) return [];

  return (
    view.filters.map((f) => ({
      attribute: f.attribute,
      type: f.type,
      value: f.value,
    })) || []
  );
}

function Resource({ resource, views }) {
  const history = useHistory();
  const location = useLocation();
  const [updateViewFilters] = useUpdateViewFilter();

  const currentView = useMemo(() => {
    const queryParams = queryString.parse(location.search);
    if (!queryParams.view) return null;
    return views.find((v) => v.id === queryParams.view);
  }, [views, location.search]);

  const [filters, setFilters] = useState(initializeViewFilters(currentView));

  const [isOpen, setIsOpen] = useState(false);
  const { loading, data, fetchMore, error } = useFetchResources(
    resource,
    filters,
  );

  const hasNextPage = data?.records.pageInfo.hasNextPage;
  const endCursor = data?.records.pageInfo.endCursor;

  useEffect(() => {
    setFilters(initializeViewFilters(currentView));
  }, [currentView]);

  const updateFilters = useCallback(
    (newFilters) => {
      if (currentView) {
        updateViewFilters({
          variables: {
            id: currentView.id,
            filters: newFilters,
          },
          optimisticResponse: {
            updateTobyView: {
              __typename: "UpdateViewPayload",
              view: {
                ...currentView,
                filters: newFilters.map((filter) => ({
                  ...filter,
                  __typename: "Filter",
                })),
              },
            },
          },
        });
      } else {
        setFilters(newFilters);
      }
    },
    [currentView, updateViewFilters],
  );

  const scrollRef = useBottomScrollListener(() => {
    if (!loading && !hasNextPage) return;
    fetchMore({ variables: { cursor: endCursor } });
  });

  const edges = data?.records.edges || [];

  if (error) {
    return <>Failed to load {resource.type}</>;
  }

  const openRecord = (id) => () => {
    history.push({
      ...location,
      pathname: `${location.pathname}/${id}`,
    });
  };

  return (
    <StyledLayout>
      <DetailsModal resource={resource} />
      <StyledHeader>
        <Navigation resource={resource} />
        <Box display="flex" alignItems="center" paddingLeft="8px">
          <ViewsDropdown views={views} resource={resource} filters={filters} />
          <HeaderButton icon={Adjustments} onClick={() => setIsOpen(!isOpen)}>
            Filters
            {filters.length > 0 && (
              <Box
                paddingY={1}
                paddingX={2}
                borderRadius="8px"
                bg="white"
                fontSize="2xs"
                fontWeight={600}
                marginRight="-8px"
                marginLeft="8px"
                color="blue600"
              >
                {filters.length}
              </Box>
            )}
          </HeaderButton>
        </Box>
      </StyledHeader>
      <StyledViewport>
        <FilterDrawer
          views={views}
          resource={resource}
          open={isOpen}
          filters={filters}
          onApply={updateFilters}
        />
        <StyledScrollContainer
          ref={scrollRef}
          as={motion.div}
          $filterOpen={isOpen}
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
