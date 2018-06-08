import React from "react";
import gql from "graphql-tag";
import filter from "lodash/filter";
import { Transition } from "react-spring";
import Candidate from "../components/Candidate";
import { Title, Count } from "../styles";
import NoApplicants from "../components/NoCandidates";
import SimpleErrorBoundary from 'src/components/SimpleErrorBoundary';

const Applicants = ({ data, status, emptyStateText, countLabel }) => {
  const applications = filter(data.project.applications, { status });
  const count =
    applications.length === 1
      ? "1 Applicant"
      : `${applications.length} Applicants`;

  return (
    <React.Fragment>
      <Title>{data.project.name}</Title>
      <Count>{countLabel || status} - {count}</Count>

      {applications.length > 0 ? (
        <div>
          {applications.map(application => (
            <SimpleErrorBoundary key={application.id}>
              <Candidate application={application} />
            </SimpleErrorBoundary>
          ))}
        </div>
      ) : (
        <NoApplicants text={emptyStateText} />
      )}
    </React.Fragment>
  );
};

export default Applicants;
