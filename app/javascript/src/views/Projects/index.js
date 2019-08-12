// Renders the projects view for a user.
import React from "react";
import { Query } from "react-apollo";
import PROJECTS from "./getProjects";
import { Redirect } from "react-router-dom";
import Heading from "../../components/Heading";
import Loading from "../../components/Loading";
import Divider from "../../components/Divider";
import Layout from "../../components/Layout";
import useScrollRestore from "../../utilities/useScrollRestore";
import { Projects } from "./styles";
import ProjectsList from "./ProjectsList";
import useViewer from "../../hooks/useViewer";

export default () => {
  useScrollRestore();
  const viewer = useViewer();

  if (viewer.__typename !== "User") {
    return <Redirect to="/" />;
  }

  return (
    <Layout>
      <Layout.Main>
        <Heading level={2}>Your projects</Heading>
        <Divider marginTop="l" marginBottom="xl" />
        <Projects>
          <Query query={PROJECTS}>
            {query => {
              if (query.loading) return <Loading />;

              return <ProjectsList projects={query.data.viewer.projects} />;
            }}
          </Query>
        </Projects>
      </Layout.Main>
    </Layout>
  );
};
