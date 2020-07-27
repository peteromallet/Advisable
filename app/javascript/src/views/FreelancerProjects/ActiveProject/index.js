// Renders the card for an active booking in the manage talent view
import React from "react";
import { ActiveProject } from "./styles";
import Card from "../../../components/Card";
import Text from "../../../components/Text";
import Status from "../../../components/Status";
import Heading from "../../../components/Heading";
import { Padding } from "../../../components/Spacing";
import pluralize from "../../../utilities/pluralize";

const Component = ({ onClick, application }) => {
  return (
    <ActiveProject>
      <Card elevation={1} hoverElevation={3} onClick={onClick}>
        <Padding size="l">
          <Heading level={4}>{application.project.primarySkill.name}</Heading>
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
