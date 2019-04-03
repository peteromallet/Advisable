import * as React from "react";
import { Padding } from "../../components/Spacing";
import PreviousProjects from "../../components/PreviousProjects";
import PreviousProjectsEmptyState from "../../components/PreviousProjectsEmptyState";

export default ({ data }) => {
  const { application } = data.project;

  return (
    <Padding bottom="l">
      {application.previousProjects.length > 0 ? (
        <PreviousProjects
          title={`Previous projects related to ${data.project.primarySkill}`}
          name={application.specialist.name}
          hasMoreProjects={application.hasMoreProjects}
          specialistId={application.specialist.airtableId}
          previousProjects={application.previousProjects || []}
        />
      ) : (
        <PreviousProjectsEmptyState
          name={application.specialist.name}
          applicationId={application.airtableId}
          specialistId={application.specialist.airtableId}
          referencesRequested={application.referencesRequested}
        />
      )}
    </Padding>
  );
};
