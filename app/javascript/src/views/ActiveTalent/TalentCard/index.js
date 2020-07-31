// Renders the card for an active booking in the manage talent view
import React from "react";
import { Card, Avatar, Text } from "@advisable/donut";
import { TalentCard as StyledTalentCard } from "./styles";
import Status from "../../../components/Status";
import pluralize from "../../../utilities/pluralize";

const TalentCard = ({ onClick, application }) => {
  return (
    <StyledTalentCard>
      <Card onClick={onClick} padding="xl">
        <Avatar
          mb="m"
          size="l"
          mx="auto"
          display="inline-block"
          name={application.specialist.name}
          url={application.specialist.image?.url}
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
          {application.project.primarySkill.name}
        </Text>
        <Status>{pluralize(application.tasks.length, "Task", "Tasks")}</Status>
      </Card>
    </StyledTalentCard>
  );
};

export default TalentCard;
