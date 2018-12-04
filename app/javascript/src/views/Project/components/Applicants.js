import React from "react";
import filter from "lodash/filter";
import Candidate from "../components/Candidate";
import NoApplicants from "../components/NoCandidates";
import SimpleErrorBoundary from "src/components/SimpleErrorBoundary";
import useScrollRestore from '../../../utilities/useScrollRestore';

const Applicants = ({ data, status, emptyStateText, emptyStateSubText }) => {
  useScrollRestore()
  const applications = filter(data.project.applications, { status });

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default Applicants;
