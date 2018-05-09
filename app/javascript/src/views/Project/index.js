import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import View from "../../components/View";
import Candidate from "../../components/Candidate";
import Navigation from "../../components/Navigation";
import { Container, Title } from "./styles";

const query = gql`
  query project($id: ID!) {
    project(id: $id) {
      id
      name
      applications {
        id
        specialist {
          id
          name
        }
      }
    }
  }
`;

const Project = ({ match }) => {
  return (
    <Query query={query} variables={{ id: match.params.projectID }}>
      {({ loading, data, error }) => {
        if (loading) return <span>loading...</span>;
        if (error) return <span>{error.message}</span>;

        return (
          <React.Fragment>
            <Navigation />
            <View>
              <Container>
                <Title>{data.project.name}</Title>
                {data.project.applications.map(application => (
                  <Candidate key={application.id} />
                ))}
              </Container>
            </View>
          </React.Fragment>
        );
      }}
    </Query>
  );
};

export default Project;
