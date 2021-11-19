import React, { useEffect } from "react";
import { Box, Text } from "@advisable/donut";
import { Exclamation } from "@styled-icons/heroicons-solid/Exclamation";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import { useNotifications } from "src/components/Notifications";
import { useFetchResources } from "../../utilities";
import {
  StyledHeaderRow,
  StyledHeaderCell,
  StyledScrollContainer,
  StyledResizeHandler,
} from "../../styles";
import Rows from "./Rows";
import Loading from "./Loading";
import useColumnSizes from "./useColumnSizes";

function APIError() {
  return (
    <Box
      margin={4}
      padding={4}
      maxWidth="400px"
      color="neutral800"
      display="inline-flex"
      alignItems="center"
    >
      <Exclamation size={20} />
      <Text ml={2}>Failed to fetch records</Text>
    </Box>
  );
}

export default function Records({ resource, filters, sortBy, sortOrder }) {
  const { sizeForColumn, resizePropsForHeaderCell } = useColumnSizes(resource);
  const { error: notifyError } = useNotifications();
  const { loading, data, fetchMore, error } = useFetchResources(
    resource,
    filters,
    sortBy,
    sortOrder,
  );

  useEffect(() => {
    if (error) notifyError("Failed to load records");
  }, [error, notifyError]);

  const scrollRef = useBottomScrollListener(() => {
    if (!loading && !hasNextPage) return;
    fetchMore({ variables: { cursor: endCursor } });
  });

  const hasNextPage = data?.records.pageInfo.hasNextPage;
  const endCursor = data?.records.pageInfo.endCursor;
  const edges = data?.records.edges || [];

  return (
    <StyledScrollContainer ref={scrollRef}>
      {/* Dear future developer. I know this inline-block looks random. But its important. */}
      <Box display="inline-block" minWidth="100vw">
        <StyledHeaderRow>
          {resource.attributes.map((attr) => (
            <StyledHeaderCell
              style={{
                width: sizeForColumn(attr.name),
              }}
              key={attr.name}
            >
              <Text
                paddingY={1}
                fontWeight={500}
                letterSpacing="-0.01rem"
                $truncate
              >
                {attr.columnLabel}
              </Text>
              <StyledResizeHandler {...resizePropsForHeaderCell(attr.name)} />
            </StyledHeaderCell>
          ))}
        </StyledHeaderRow>
        <Box>
          {error ? (
            <APIError />
          ) : (
            <Rows
              edges={edges}
              resource={resource}
              sizeForColumn={sizeForColumn}
            />
          )}
          {loading && (
            <Loading resource={resource} sizeForColumn={sizeForColumn} />
          )}
        </Box>
      </Box>
    </StyledScrollContainer>
  );
}
