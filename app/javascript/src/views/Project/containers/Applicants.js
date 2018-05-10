import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Candidate from "../components/Candidate";
import { Title } from "../styles";

const query = gql`
  query project($id: ID!, $status: String!) {
    project(id: $id) {
      id
      name
      applications(status: $status) {
        id
        rate
        availability
        introduction
        questions {
          question
          answer
        }
        specialist {
          id
          name
          city
          country
          travel
          linkedin
          skills
        }
      }
    }
  }
`;

const Project = ({ status, match }) => {
  return (
    <Query
      query={query}
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
            {data.project.applications.map(application => (
              <Candidate application={application} key={application.id} />
            ))}
          </React.Fragment>
        );
      }}
    </Query>
  );
};

export default Project;
