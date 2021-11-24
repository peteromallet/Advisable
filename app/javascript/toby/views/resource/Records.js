import css from "@styled-system/css";
import { Reorder, useDragControls } from "framer-motion";
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
import DragHandle from "./DragHandle";
import useColumnOrder from "./useColumnOrder";

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

function HeaderCell({ attribute, width, resizeProps, isResizing }) {
  const controls = useDragControls();

  return (
    <StyledHeaderCell
      value={attribute}
      as={!isResizing && Reorder.Item}
      style={{ width }}
      dragListener={false}
      dragControls={controls}
    >
      <Box
        display="flex"
        marginRight={1.5}
        alignItems="center"
        color="neutral400"
        css={css({
          "&:hover": {
            cursor: "move",
            color: "neutral800",
          },
        })}
        onPointerDown={(e) => controls.start(e)}
      >
        <DragHandle />
      </Box>
      <Text paddingY={1} fontWeight={500} letterSpacing="-0.01rem" $truncate>
        {attribute.columnLabel}
      </Text>
      <StyledResizeHandler {...resizeProps} />
    </StyledHeaderCell>
  );
}

export default function Records({ resource, filters, sortBy, sortOrder }) {
  const { sizeForColumn, resizePropsForHeaderCell, isResizing } =
    useColumnSizes(resource);

  const { orderedAttributes, updateAttributeOrder } = useColumnOrder(resource);
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
          <Reorder.Group
            axis="x"
            values={orderedAttributes}
            onReorder={updateAttributeOrder}
          >
            {orderedAttributes.map((attr) => (
              <HeaderCell
                key={attr.name}
                attribute={attr}
                isResizing={isResizing}
                width={sizeForColumn(attr.name)}
                resizeProps={resizePropsForHeaderCell(attr.name)}
              />
            ))}
          </Reorder.Group>
        </StyledHeaderRow>
        <Box>
          {error ? (
            <APIError />
          ) : (
            <Rows
              edges={edges}
              resource={resource}
              sizeForColumn={sizeForColumn}
              attributes={orderedAttributes}
            />
          )}
          {loading && (
            <Loading
              sizeForColumn={sizeForColumn}
              attributes={orderedAttributes}
            />
          )}
        </Box>
      </Box>
    </StyledScrollContainer>
  );
}
