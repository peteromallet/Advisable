import React from "react";
import { filter } from "lodash-es";
import Candidate from "../components/Candidate";
import NoApplicants from "../components/NoCandidates";

const Applicants = ({ data, status, emptyStateText, emptyStateSubText }) => {
  const applications = filter(data.project.applications, { status });

  return (
    <React.Fragment>
      {applications.length > 0 ? (
        <div>
          {applications.map((application) => (
            <Candidate
              key={application.id}
              project={data.project}
              application={application}
            />
          ))}
        </div>
      ) : (
        <NoApplicants text={emptyStateText} subText={emptyStateSubText} />
      )}
    </React.Fragment>
  );
};

export default Applicants;
