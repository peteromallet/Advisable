// Renders the projects view for a user.
import React from "react";
import { useQuery } from "react-apollo";
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
  const query = useQuery(PROJECTS);

  if (viewer.__typename !== "User") {
    return <Redirect to="/" />;
  }

  return (
    <Layout>
      <Layout.Main>
        <Heading level={2}>Your projects</Heading>
        <Divider marginTop="l" marginBottom="xl" />
        <Projects>
          {query.loading ? (
            <Loading />
          ) : (
            <ProjectsList projects={query.data.viewer.projects} />
          )}
        </Projects>
      </Layout.Main>
    </Layout>
  );
};
