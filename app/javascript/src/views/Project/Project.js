import React from "react";
import { Route, Redirect } from "react-router-dom";
import Layout from "src/components/Layout";
import ProjectNavigation from "./ProjectNavigation";
import useMobile from "src/utilities/useMobile";
import useScrollRestore from "src/utilities/useScrollRestore";
import Applications from "./Applications";

const Project = ({ data }) => {
  useScrollRestore();
  const isMobile = useMobile();

  return (
    <Layout>
      {/* On mobile we only want to show the project navigation if the user is
      on the /projects/id URL exactly */}
      <Route
        exact={isMobile}
        path="/projects/:projectID"
        render={(route) => <ProjectNavigation {...route} data={data} />}
      />
      <Route
        path="/projects/:projectId/:status"
        render={(route) => <Applications data={data} {...route} />}
      />
      {/* If the user is not on mobile, and there is no status then redirect
        to the applied page. */}
      {!isMobile && (
        <Route
          exact
          path="/projects/:projectId"
          render={() => (
            <Redirect to={`/projects/${data.project.airtableId}/applied`} />
          )}
        />
      )}
    </Layout>
  );
};

export default Project;
