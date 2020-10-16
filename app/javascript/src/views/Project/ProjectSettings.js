import { useEffect } from "react";
import Loading from "components/Loading";
import { Pencil } from "@styled-icons/ionicons-solid";
import { useDialogState, DialogDisclosure } from "reakit/Dialog";
import { Box, Card, Text, Stack, Button } from "@advisable/donut";
import { useProjectSettings } from "./queries";
import UpdateProjectGoals from "./UpdateProjectGoals";
import UpdateProjectLocationModal from "./UpdateProjectLocationModal";
import UpdateProjectRequirementsModal from "./UpdateProjectRequirementsModal";
import GoalsSummary from "./components/GoalsSummary";
import SkillsSummary from "./components/SkillsSummary";
import LocationSummary from "./components/LocationSummary";
import CharacteristicsSummary from "./components/CharacteristicsSummary";

export default function ProjectSettings() {
  const locationDialog = useDialogState();
  const characteristicsDialog = useDialogState();
  const goalsDialog = useDialogState();
  const { loading, data } = useProjectSettings();

  useEffect(() => {
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
          Project Details
        </Text>
        <UpdateProjectLocationModal project={project} dialog={locationDialog} />
        <UpdateProjectRequirementsModal
          project={project}
          dialog={characteristicsDialog}
        />
        <UpdateProjectGoals project={project} dialog={goalsDialog} />
        <Stack spacing="4xl" divider="neutral100">
          <SkillsSummary project={project}>
            <Text fontSize="sm" color="neutral700">
              You cannot edit skills for a published project.
            </Text>
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
          <CharacteristicsSummary project={project}>
            <DialogDisclosure
              {...characteristicsDialog}
              size="s"
              as={Button}
              variant="subtle"
              prefix={<Pencil />}
            >
              Edit Characteristics
            </DialogDisclosure>
          </CharacteristicsSummary>
          <GoalsSummary project={project}>
            <DialogDisclosure
              {...goalsDialog}
              size="s"
              as={Button}
              variant="subtle"
              prefix={<Pencil />}
            >
              Edit Goals
            </DialogDisclosure>
          </GoalsSummary>
        </Stack>
      </Card>
    </Box>
  );
}
