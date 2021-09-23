import React from "react";
import * as Sentry from "@sentry/react";
import { useHistory } from "react-router";
import { Box, Text } from "@advisable/donut";
import { Exclamation } from "@styled-icons/heroicons-solid/Exclamation";
import { Attribute } from "../../attributes";
import { StyledRow, StyledCell } from "../../styles";
import { recordPath } from "../../utilities";

export default function Rows({ edges, resource }) {
  const history = useHistory();

  const openRecord = (record) => () => {
    history.push({
      ...location,
      pathname: recordPath(record),
    });
  };

  return edges.map(({ node }) => (
    <StyledRow key={node.id} onClick={openRecord(node)}>
      {resource.attributes.map((attr) => (
        <StyledCell key={attr.name}>
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
            <Attribute record={node} attribute={attr} />
          </Sentry.ErrorBoundary>
        </StyledCell>
      ))}
    </StyledRow>
  ));
}
