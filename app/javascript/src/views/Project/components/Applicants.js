import React from "react";
import gql from "graphql-tag";
import filter from 'lodash/filter';
import { Transition } from "react-spring";
import Candidate from "../components/Candidate";
import { Title } from "../styles";
import NoApplicants from '../components/NoCandidates';

const Project = ({ data, status, emptyStateText }) => {
  const applications = filter(data.project.applications, { status });

  return (
    <React.Fragment>
      <Title>{data.project.name}</Title>

      {applications.length > 0 ? (
        applications.map(application => (
          <Candidate application={application} key={application.id} />
        ))
      ) : (
        <NoApplicants text={emptyStateText} />
      )}
    </React.Fragment>
  );
};

export default Project;
