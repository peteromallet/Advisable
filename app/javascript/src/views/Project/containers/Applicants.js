import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Transition } from "react-spring";
import Candidate from "../components/Candidate";
import { Title } from "../styles";
import FETCH_PROJECT from "../graphql/fetchProject.graphql";

const Project = ({ status, match }) => {
  return (
    <Query
      query={FETCH_PROJECT}
      fetchPolicy="network-only"
      variables={{
        id: match.params.projectID,
        status: status
      }}
    >
      {({ loading, data, error }) => {
        if (loading) return <span>loading...</span>;
        if (error) return <span>{error.message}</span>;

        return (
          <React.Fragment>
            <Title>{data.project.name}</Title>

            {data.project.applications.length > 0 ? (
              <Transition
                keys={data.project.applications.map(a => a.id)}
                from={{ opacity: 0 }}
                enter={{ opacity: 1, height: 'auto', marginBottom: 20 }}
                leave={{ opacity: 0, height: 0, marginBottom: 0 }}
              >
                {data.project.applications.map(application => styles => (
                  <Candidate application={application} style={styles} />
                ))}
              </Transition>
            ) : (
              <div>No applications</div>
            )}
          </React.Fragment>
        );
      }}
    </Query>
  );
};

export default Project;
