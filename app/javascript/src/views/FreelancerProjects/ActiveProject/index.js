// Renders the card for an active booking in the manage talent view
import React from "react";
import { rgba } from "polished";
import styled from "styled-components";
import { ActiveProject } from "./styles";
import { Box, StyledCard, Text, theme } from "@advisable/donut";
import Status from "src/components/Status";
import pluralize from "src/utilities/pluralize";

const Card = styled(StyledCard)`
  cursor: pointer;
  transition: box-shadow 0.3s, transform 0.2s;
  box-shadow: 0px 8px 24px -8px ${rgba(theme.colors.blue900, 0.12)};

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0px 16px 40px -16px ${rgba(theme.colors.blue900, 0.24)};
  }
`;

const Component = ({ onClick, application }) => {
  return (
    <ActiveProject>
      <Card onClick={onClick}>
        <Box padding="l">
          <Text
            color="#0a1745"
            fontSize="18px"
            fontWeight="medium"
            lineHeight="m"
          >
            {application.project.primarySkill?.name}
          </Text>
          <Box paddingBottom="m">
            <Text fontSize="sm">{application.project.user.companyName}</Text>
          </Box>
          <Status>
            {pluralize(application.tasks.length, "Task", "Tasks")}
          </Status>
        </Box>
      </Card>
    </ActiveProject>
  );
};

export default Component;
