import React from "react";
import { Box, Tabs, Stack } from "@advisable/donut";
import useViewer from "../../../hooks/useViewer";
import PreviousProjectFormModal, {
  usePreviousProjectModal,
} from "../../../components/PreviousProjectFormModal";
import PreviousProject from "./PreviousProject";
import NewProject from "./NewProject";

export default function PreviousProjectsList({ previousProjects }) {
  const viewer = useViewer();
  const modal = usePreviousProjectModal("/previous_projects/new");

  const drafts = filterByDraft(previousProjects, true);
  const published = filterByDraft(previousProjects, false);

  return (
    <>
      <PreviousProjectFormModal specialistId={viewer.id} modal={modal} />

      <Tabs label="Previous projects">
        <Tabs.Tab title="Published">
          <Stack pt="m" spacing="m">
            <NewProject modal={modal} />
            {published.map((project) => (
              <PreviousProject key={project.id} previousProject={project} />
            ))}
          </Stack>
        </Tabs.Tab>
        <Tabs.Tab title={draftsTitle(drafts)}>
          <Stack pt="m" spacing="m">
            <NewProject modal={modal} />
            {drafts.map((project) => (
              <PreviousProject
                key={project.id}
                previousProject={project}
                editModal={modal}
              />
            ))}
          </Stack>
        </Tabs.Tab>
      </Tabs>
    </>
  );
}

function draftsTitle(drafts) {
  let title = "Drafts";
  if (drafts.length > 0) {
    title += ` (${drafts.length})`;
  }
  return title;
}

function filterByDraft(data, draft) {
  return data.filter((n) => n.draft === draft);
}
