// Renders the card for an active booking in the manage talent view
import React from "react";
import { get } from "lodash";
import { Box, Text } from "@advisable/donut";
import { TalentCard } from "./styles";
import Card from "../../../components/Card";
import Status from "../../../components/Status";
import Avatar from "../../../components/Avatar";
import Heading from "../../../components/Heading";
import { Padding } from "../../../components/Spacing";
import pluralize from "../../../utilities/pluralize";

const Component = ({ onClick, application }) => {
  return (
    <TalentCard>
      <Card elevation={1} hoverElevation={3} onClick={onClick}>
        <Box padding="l">
          <Box mb="m">
            <Avatar
              size="l"
              name={application.specialist.name}
              url={get(application.specialist.image, "url")}
            />
          </Box>
          <Text size="l" weight="medium" as="h4" mb="xxs">
            {application.specialist.name}
          </Text>
          <Text size="s" color="neutral.5" mb="m">
            {application.project.primarySkill}
          </Text>
          <Status>
            {pluralize(application.tasks.length, "Task", "Tasks")}
          </Status>
        </Box>
      </Card>
    </TalentCard>
  );
};

export default Component;
