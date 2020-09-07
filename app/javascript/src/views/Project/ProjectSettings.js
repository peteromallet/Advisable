import React from "react";
import Loading from "components/Loading";
import { Pencil } from "@styled-icons/ionicons-solid";
import { useDialogState, DialogDisclosure } from "reakit/Dialog";
import { Box, Card, Text, Stack, Button } from "@advisable/donut";
import { useProjectSettings } from "./queries";
import UpdateSkillsModal from "./UpdateSkillsModal";
import UpdateProjectLocationModal from "./UpdateProjectLocationModal";
import GoalsSummary from "./components/GoalsSummary";
import SkillsSummary from "./components/SkillsSummary";
import LocationSummary from "./components/LocationSummary";
import CharacteristicsSummary from "./components/CharacteristicsSummary";

export default function ProjectSettings() {
  const skillsDialog = useDialogState();
  const locationDialog = useDialogState();
  const { loading, data } = useProjectSettings();

  React.useEffect(() => {
    document.getElementById("view").scrollTo(0, 0);
  }, []);

  if (loading) return <Loading />;
  const { project } = data;

  return (
    <Box paddingY="3xl">
      <Card maxWidth="720px" marginX="auto" padding="2xl" borderRadius="12px">
        <Text
          fontSize="4xl"
          color="neutral900"
          marginBottom="2xl"
          fontWeight="medium"
          letterSpacing="-0.03em"
        >
          Project Settings
        </Text>
        <UpdateSkillsModal project={project} dialog={skillsDialog} />
        <UpdateProjectLocationModal project={project} dialog={locationDialog} />
        <Stack spacing="4xl" divider="neutral100">
          <SkillsSummary project={project}>
            <DialogDisclosure
              {...skillsDialog}
              size="s"
              as={Button}
              variant="subtle"
              prefix={<Pencil />}
            >
              Edit Skills
            </DialogDisclosure>
          </SkillsSummary>
          <LocationSummary project={project}>
            <DialogDisclosure
              {...locationDialog}
              size="s"
              as={Button}
              variant="subtle"
              prefix={<Pencil />}
            >
              Edit Location
            </DialogDisclosure>
          </LocationSummary>
          <CharacteristicsSummary project={project} />
          <GoalsSummary project={project} />
        </Stack>
      </Card>
    </Box>
  );
}
