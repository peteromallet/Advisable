// Renders the card for an active booking in the manage talent view
import { rgba } from "polished";
import styled from "styled-components";
import { ActiveProject } from "./styles";
import { Box, StyledCard, theme } from "@advisable/donut";
import Text from "../../../components/Text";
import Status from "../../../components/Status";
import Heading from "../../../components/Heading";
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
        <Box padding="l">
          <Heading level={4}>{application.project.primarySkill?.name}</Heading>
          <Box paddingBottom="m">
            <Text size="s">{application.project.user.companyName}</Text>
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
