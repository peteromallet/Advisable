import React from "react";
import { useQuery } from "@apollo/client";
import { Route, Switch, Redirect, useRouteMatch } from "react-router-dom";
import { Container } from "@advisable/donut";
import useViewer from "src/hooks/useViewer";
import View from "src/components/View";
import Rate from "./Rate";
import Send from "./Send";
import Sent from "./Sent";
import Tasks from "./Tasks";
import ProjectType from "./ProjectType";
import Navigation from "./Navigation";
import Loading from "./Loading";
import FETCH_APPLICATION from "./fetchApplication";
import Notfound from "../NotFound";

const Proposals = () => {
  const viewer = useViewer();
  const match = useRouteMatch();
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
    <View>
      <View.Sidebar>
        <Navigation application={application} />
      </View.Sidebar>
      <View.Content>
        <Container
          pt={{ _: 4, s: 0, l: 12 }}
          pb={10}
          paddingX={[4, 4, 6, 8]}
          maxWidth={{ l: "800px" }}
        >
          <Switch>
            <Route exact path={urlPrefix}>
              <Rate application={application} />
            </Route>
            <Route path={`${urlPrefix}/type`}>
              <ProjectType application={application} />
            </Route>
            <Route path={`${urlPrefix}/tasks`}>
              <Tasks application={application} />
            </Route>
            <Route path={`${urlPrefix}/send`}>
              <Send application={application} />
            </Route>
            <Route path={`${urlPrefix}/sent`}>
              <Sent application={application} />
            </Route>
            <Route>
              <Redirect to={urlPrefix} />
            </Route>
          </Switch>
        </Container>
      </View.Content>
    </View>
  );
};

export default Proposals;
