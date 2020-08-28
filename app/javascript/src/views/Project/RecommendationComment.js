import React from "react";
import { rgba } from "polished";
import styled from "styled-components";
import { Flash } from "@styled-icons/ionicons-solid";
import { Avatar, Box, Text, StyledCard, theme } from "@advisable/donut";

const Card = styled(StyledCard)`
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0px 4px 12px -4px ${rgba(theme.colors.neutral900, 0.04)},
    0px 4px 20px -4px ${rgba(theme.colors.neutral900, 0.08)};
`;

function RecommendationComment({ application, project }) {
  const salesPerson = project.user.salesPerson;
  const comment = application.comment;

  return (
    <Card marginBottom="52px">
      <Box display="flex" alignItems="center">
        <Text color="blue700" marginRight="8px">
          <Flash size="20px" />
        </Text>
        <Text fontSize="14px" color="neutral600">
          This candidate was hand picked by Advisable
        </Text>
      </Box>
      <Box padding="16px" marginTop="16px" borderRadius="12px" bg="neutral100">
        <Box marginBottom="12px" display="flex" alignItems="center">
          <Avatar
            size="s"
            bg="neutral200"
            name={salesPerson.name}
            url={salesPerson.image}
          />
          <Box paddingLeft="12px">
            <Text marginBottom="2px">{salesPerson.name}</Text>
            <Text fontSize="14px" color="neutral500">
              Advisable Team
            </Text>
          </Box>
        </Box>
        <Text
          fontSize="15px"
          lineHeight="20px"
          fontStyle="italic"
          color="neutral800"
        >
          &quot;{comment}&quot;
        </Text>
      </Box>
    </Card>
  );
}

export default RecommendationComment;
