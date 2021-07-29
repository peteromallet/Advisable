import React, { useState } from "react";
import { useApolloClient } from "@apollo/client";
import PreviousProjects from "../PreviousProjects";
import Testimonials from "../Testimonials";
import NoProjects from "../NoProjects";
import CallToActionBox from "../CallToActionBox";
import useViewer from "src/hooks/useViewer";

import { useModal } from "@advisable/donut";
import ValidationModal from "src/components/PreviousProjectValidationModal";
import PreviousProjectFormModal, {
  usePreviousProjectModal,
} from "src/components/PreviousProjectFormModal";
import { GET_PROFILE } from "../queries";

export default function MainProfile({ isOwner, data }) {
  const [addedProject, setAddedProject] = useState(null);
  const modal = usePreviousProjectModal("/previous_projects/new");
  const validationModal = useModal();
  const client = useApolloClient();
  const viewer = useViewer();

  const viewerIsGuild = viewer?.guild || false;
  const reviews = data.specialist.reviews.filter((r) => r.comment);
  const hasReviews = reviews.length > 0;

  const handleNewProject = (project) => {
    const previous = client.readQuery({
      query: GET_PROFILE,
      variables: { id: viewer.id },
    });
    client.writeQuery({
      query: GET_PROFILE,
      variables: { id: viewer.id },
      data: {
        specialist: {
          ...previous.specialist,
          previousProjects: {
            ...previous.specialist.previousProjects,
            nodes: [...previous.specialist.previousProjects.nodes, project],
          },
        },
      },
    });
  };

  const handlePublish = (project) => {
    setAddedProject(project);
    validationModal.show();
  };

  return (
    <>
      {addedProject && (
        <ValidationModal
          modal={validationModal}
          previousProject={addedProject}
        />
      )}
      {isOwner ? (
        <PreviousProjectFormModal
          modal={modal}
          onPublish={handlePublish}
          onCreate={handleNewProject}
        />
      ) : null}
      {data.specialist.previousProjects.nodes.length > 0 && (
        <PreviousProjects data={data} isOwner={isOwner} modal={modal} />
      )}
      {data.specialist.previousProjects.nodes.length === 0 && (
        <NoProjects data={data} isOwner={isOwner} modal={modal} />
      )}
      {hasReviews && <Testimonials reviews={reviews} />}
      {!isOwner && !viewerIsGuild && (
        <CallToActionBox specialist={data.specialist} />
      )}
    </>
  );
}
