import React from "react";
import gql from "graphql-tag";
import filter from "lodash/filter";
import { Transition } from "react-spring";
import Candidate from "../components/Candidate";
import { Title, Count } from "../styles";
import NoApplicants from "../components/NoCandidates";

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
            <Candidate application={application} key={application.id} />
          ))}
        </div>
      ) : (
        <NoApplicants text={emptyStateText} />
      )}
    </React.Fragment>
  );
};

export default Applicants;
