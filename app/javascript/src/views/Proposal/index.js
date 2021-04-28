import React from "react";
import { useQuery } from "@apollo/client";
import { Switch, Redirect } from "react-router-dom";
import Route from "src/components/Route";
import useViewer from "src/hooks/useViewer";
import Layout from "../../components/Layout";
import Rate from "./Rate";
import Send from "./Send";
import Sent from "./Sent";
import Tasks from "./Tasks";
import ProjectType from "./ProjectType";
import Sidebar from "./Sidebar";
import Loading from "./Loading";
import FETCH_APPLICATION from "./fetchApplication";
import Notfound from "../NotFound";

const Proposals = ({ match }) => {
  const viewer = useViewer();
  const { loading, data } = useQuery(FETCH_APPLICATION, {
    variables: {
      id: match.params.applicationId,
    },
  });

  if (loading) {
    return <Loading />;
  }

  const application = data.application;
  const isSpecialist = viewer.id === application?.specialist?.id;
  if (!application || !isSpecialist) return <Notfound />;
  const urlPrefix = `/applications/:applicationId/proposal`;

  return (
    <Layout>
      <Sidebar application={application} />
      <Layout.Main>
        <Switch>
          <Route
            exact
            path={urlPrefix}
            render={(props) => <Rate application={application} {...props} />}
          />
          <Route
            path={`${urlPrefix}/type`}
            render={(props) => (
              <ProjectType application={application} {...props} />
            )}
          />
          <Route
            path={`${urlPrefix}/tasks`}
            render={(props) => <Tasks application={application} {...props} />}
          />
          <Route
            path={`${urlPrefix}/send`}
            render={(props) => <Send application={application} {...props} />}
          />
          <Route
            path={`${urlPrefix}/sent`}
            render={(props) => <Sent application={application} {...props} />}
          />
          <Route render={() => <Redirect to={urlPrefix} />} />
        </Switch>
      </Layout.Main>
    </Layout>
  );
};

export default Proposals;
