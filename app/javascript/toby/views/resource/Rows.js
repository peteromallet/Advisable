import React from "react";
import * as Sentry from "@sentry/react";
import { useNavigate } from "react-router";
import { Box, Text } from "@advisable/donut";
import { Exclamation } from "@styled-icons/heroicons-solid/Exclamation";
import { Attribute } from "../../attributes";
import { StyledRow, StyledCell } from "../../styles";
import { recordPath } from "../../utilities";
import CopyToClipboard from "../../components/CopyToClipboard";

export default function Rows({ edges, resource, sizeForColumn, attributes }) {
  const navigate = useNavigate();

  const openRecord = (record) => () => {
    navigate(recordPath(record), {
      state: location?.state,
    });
  };

  return edges.map(({ node }) => (
    <StyledRow key={node.id} onClick={openRecord(node)}>
      {attributes.map((attr) => (
        <StyledCell style={{ width: sizeForColumn(attr.name) }} key={attr.name}>
          <Sentry.ErrorBoundary
            fallback={
              <Box display="inline-flex" alignItems="center">
                <Exclamation size={16} />
                <Text mt="-1px" ml={1}>
                  Error
                </Text>
              </Box>
            }
          >
            <CopyToClipboard record={node} attribute={attr} />
            <Attribute record={node} attribute={attr} resource={resource} />
          </Sentry.ErrorBoundary>
        </StyledCell>
      ))}
    </StyledRow>
  ));
}
