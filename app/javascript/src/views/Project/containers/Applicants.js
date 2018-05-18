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
        <Transition
          keys={applications.map(a => a.id)}
          from={{ opacity: 0, marginBottom: 0 }}
          enter={{ opacity: 1, height: 'auto', marginBottom: 20 }}
          leave={{ opacity: 0, height: 0, marginBottom: 0 }}
        >
          {applications.map(application => styles => (
            <Candidate application={application} style={styles} />
          ))}
        </Transition>
      ) : (
        <NoApplicants text={emptyStateText} />
      )}
    </React.Fragment>
  );
};

export default Project;
