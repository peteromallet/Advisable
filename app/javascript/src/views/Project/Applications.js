import React from "react";
import { filter } from "lodash";
import Layout from "../../components/Layout";
import SimpleErrorBoundary from "../../components/SimpleErrorBoundary";
import Candidate from "./components/Candidate";
import NoApplicants from "./components/NoCandidates";
import useScrollRestore from "src/utilities/useScrollRestore";
import statuses from "./statuses";

const Applications = ({ data, match }) => {
  useScrollRestore();
  const slug = match.params.status;
  const { emptyStateText, emptyStateSubText, status } = statuses[slug];
  const applications = filter(data.project.applications, { status });

  return (
    <Layout.Main>
      {applications.length > 0 ? (
        <div>
          {applications.map(application => (
            <SimpleErrorBoundary key={application.id}>
              <Candidate project={data.project} application={application} />
            </SimpleErrorBoundary>
          ))}
        </div>
      ) : (
        <NoApplicants text={emptyStateText} subText={emptyStateSubText} />
      )}
    </Layout.Main>
  );
};

export default Applications;
