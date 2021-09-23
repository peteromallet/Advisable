import React, { useCallback, useEffect, useMemo, useState } from "react";
import queryString from "query-string";
import { Box } from "@advisable/donut";
import { Adjustments } from "@styled-icons/heroicons-solid/Adjustments";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { StyledLayout, StyledHeader, StyledViewport } from "../../styles";
import FilterDrawer from "./Filters";
import Navigation from "../../components/Navigation";
import DetailsModal from "./DetailsModal";
import LoadingIndicator from "src/components/Loading";
import { useResourceViews, useUpdateView } from "../../queries";
import HeaderButton from "../../components/HeaderButton";
import ViewsDropdown from "./ViewsDropdown";
import SortMenu from "./SortMenu";
import Records from "./Records";

export default function ResourceConfig({ resource }) {
  const { loading, data } = useResourceViews(resource.type);
  if (loading) return <LoadingIndicator />;

  return <Resource resource={resource} views={data.views} />;
}

function initFilters(view) {
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
  const location = useLocation();
  const [updateView] = useUpdateView();

  const currentView = useMemo(() => {
    const queryParams = queryString.parse(location.search);
    if (!queryParams.view) return null;
    return views.find((v) => v.id === queryParams.view);
  }, [views, location.search]);

  const [sortBy, setSortBy] = useState(currentView?.sortBy || "created_at");
  const [sortOrder, setSortOrder] = useState(currentView?.sortOrder || "ASC");
  const [filters, setFilters] = useState(() => initFilters(currentView));

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const queryParams = queryString.parse(location.search);
    const currentView = queryParams.view
      ? views.find((v) => v.id === queryParams.view)
      : null;
    setSortBy(currentView?.sortBy || "created_at");
    setSortOrder(currentView?.sortOrder || "ASC");
    setFilters(initFilters(currentView));
  }, [location.search]);

  const handleUpdateView = useCallback(
    (changes) => {
      if (currentView) {
        updateView({
          variables: {
            id: currentView.id,
            filters: changes.filters || currentView.filters,
            sortBy: changes.sortBy || currentView.sortBy,
            sortOrder: changes.sortOrder || currentView.sortOrder,
          },
        });
      }
    },
    [updateView, currentView],
  );

  const handleUpdateFilters = useCallback(
    (newFilters) => {
      setFilters(newFilters);
      handleUpdateView({ filters: newFilters });
    },
    [handleUpdateView],
  );

  return (
    <StyledLayout>
      <DetailsModal resource={resource} />
      <StyledHeader>
        <Navigation resource={resource} />
        <Box display="flex" alignItems="center" paddingLeft="8px">
          <ViewsDropdown
            views={views}
            resource={resource}
            filters={filters}
            sortBy={sortBy}
            sortOrder={sortOrder}
          />
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
          <SortMenu
            sortBy={sortBy}
            resource={resource}
            setSortBy={setSortBy}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            handleUpdateView={handleUpdateView}
          />
        </Box>
      </StyledHeader>
      <StyledViewport>
        <FilterDrawer
          views={views}
          open={isOpen}
          filters={filters}
          resource={resource}
          onApply={handleUpdateFilters}
        />
        <motion.div
          transition={{ duration: 0.2 }}
          animate={{ x: isOpen ? 400 : 0 }}
          style={{ width: isOpen ? "calc(100vw - 400px)" : "100vw" }}
        >
          <Records
            resource={resource}
            filters={filters}
            sortBy={sortBy}
            sortOrder={sortOrder}
          />
        </motion.div>
      </StyledViewport>
    </StyledLayout>
  );
}
