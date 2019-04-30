// Renders the card for an active booking in the manage talent view
import React from "react";
import { TalentCard } from "./styles";
import Card from "../../../components/Card";
import Text from "../../../components/Text";
import Status from "../../../components/Status";
import Avatar from "../../../components/Avatar";
import Heading from "../../../components/Heading";
import { Padding } from "../../../components/Spacing";
import pluralize from "../../../utilities/pluralize";

const Component = ({ onClick, application }) => {
  return (
    <TalentCard>
      <Card elevation={1} hoverElevation={3} onClick={onClick}>
        <Padding size="xl">
          <Padding bottom="m">
            <Avatar size="m" name={application.specialist.name} />
          </Padding>
          <Heading level={4}>{application.specialist.name}</Heading>
          <Padding bottom="m">
            <Text size="s">{application.project.primarySkill}</Text>
          </Padding>
          <Status>{pluralize(application.tasks.length, "Task", "Tasks")}</Status>
        </Padding>
      </Card>
    </TalentCard>
  );
};

export default Component;
