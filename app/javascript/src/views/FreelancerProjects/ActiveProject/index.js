// Renders the card for an active booking in the manage talent view
import React from "react";
import { rgba } from "polished";
import styled from "styled-components";
import { ActiveProject } from "./styles";
import { StyledCard, theme } from "@advisable/donut";
import Text from "../../../components/Text";
import Status from "../../../components/Status";
import Heading from "../../../components/Heading";
import { Padding } from "../../../components/Spacing";
import pluralize from "../../../utilities/pluralize";

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
        <Padding size="l">
          <Heading level={4}>{application.project.primarySkill?.name}</Heading>
          <Padding bottom="m">
            <Text size="s">{application.project.user.companyName}</Text>
          </Padding>
          <Status>
            {pluralize(application.tasks.length, "Task", "Tasks")}
          </Status>
        </Padding>
      </Card>
    </ActiveProject>
  );
};

export default Component;
