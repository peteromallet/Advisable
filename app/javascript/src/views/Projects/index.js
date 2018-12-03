// Renders the projects view for a user.
import React from "react";
import { Query } from "react-apollo";
import PROJECTS from "./projects.graphql";
import Header from "../../components/Header";
import Heading from "../../components/Heading";
import Loading from "../../components/Loading";
import Divider from "../../components/Divider";
import { Container, Projects } from "./styles";
import ProjectsList from "./ProjectsList";

export default () => {
  return (
    <React.Fragment>
      <Header />
      <Container>
        <Heading weight="semibold" size="l">
          Your projects
        </Heading>
        <Divider marginTop="l" marginBottom="xl" />
        <Projects>
          <Query query={PROJECTS}>
          {query => {
            if (query.loading) return <Loading />;

            return (
              <ProjectsList projects={query.data.viewer.client.projects} />
            );
          }}
        </Query>
        </Projects>
      </Container>
    </React.Fragment>
  );
};
