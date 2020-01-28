// Renders the card for an active booking in the manage talent view
import React from "react";
import { get } from "lodash";
import { Card, Avatar, Box, Text } from "@advisable/donut";
import { TalentCard } from "./styles";
import Status from "../../../components/Status";
import { Padding } from "../../../components/Spacing";
import pluralize from "../../../utilities/pluralize";

const Component = ({ onClick, application }) => {
  return (
    <TalentCard>
      <Card onClick={onClick} padding="xl">
        <Avatar
          mb="m"
          size="l"
          mx="auto"
          display="inline-block"
          name={application.specialist.name}
          url={get(application.specialist.image, "url")}
        />
        <Text
          fontSize="l"
          fontWeight="medium"
          as="h4"
          mb="xs"
          letterSpacing="-0.01em"
        >
          {application.specialist.name}
        </Text>
        <Text color="neutral.7" mb="m">
          {application.project.primarySkill}
        </Text>
        <Status>{pluralize(application.tasks.length, "Task", "Tasks")}</Status>
      </Card>
    </TalentCard>
  );
};

export default Component;
