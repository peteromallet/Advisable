import React from "react";
import queryString from "query-string";
import {
  useParams,
  Switch,
  Route,
  Redirect,
  useLocation,
} from "react-router-dom";
import { Container, useTheme, useBreakpoint } from "@advisable/donut";
import View from "src/components/View";
import NotFound from "../NotFound";
import Loading from "../../components/Loading";
import Topic from "./Topic";
import Skills from "./Skills";
import Availability from "./Availability";
import CompanyInformation from "./CompanyInformation";
import Sidebar from "./Sidebar";
import Send from "./Send";
import Complete from "./Complete";
import Authenticate from "./Authenticate";
import { useSpecialist } from "./queries";

const RequestConsultation = () => {
  const theme = useTheme();
  const params = useParams();
  const location = useLocation();
  const { data, loading, error } = useSpecialist({
    variables: { id: params.specialistId },
  });

  const mediumAndUp = useBreakpoint("mUp");
  const largeScreen = useBreakpoint("lUp");
  React.useEffect(() => {
    if (!mediumAndUp) {
      theme.updateTheme({ background: "white" });
    }
    return () => theme.updateTheme({ background: "default" });
  }, []);

  const queryParams = queryString.parse(location.search);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (error?.graphQLErrors[0].extensions.code === "NOT_FOUND") {
    return <NotFound />;
  }

  if (loading) return <Loading />;

  // Allows us to link directly to an abandoned consultation via a query param.
  if (queryParams.consultation) {
    return (
      <Redirect
        to={{
          pathname: `/request_consultation/${params.specialistId}/availability`,
          state: {
            consultationId: queryParams.consultation,
          },
        }}
      />
    );
  }

  return (
    <View>
      {largeScreen ? <Sidebar data={data} /> : null}
      <View.Content>
        <Container paddingY={12} paddingX={[4, 4, 6, 8]} maxWidth="750px">
          <Switch location={location} key={location.pathname}>
            <Route path="/request_consultation/:specialistId/sent">
              <Complete data={data} />
            </Route>
            <Route path="/request_consultation/:specialistId/skills">
              <Skills data={data} />
            </Route>
            <Route path="/request_consultation/:specialistId/details">
              <CompanyInformation data={data} />
            </Route>
            <Route path="/request_consultation/:specialistId/login">
              <Authenticate data={data} />
            </Route>
            <Route path="/request_consultation/:specialistId/availability">
              <Availability data={data} />
            </Route>
            <Route path="/request_consultation/:specialistId/topic">
              <Topic data={data} />
            </Route>
            <Route path="/request_consultation/:specialistId/send">
              <Send data={data} />
            </Route>
            <Route>
              <Redirect
                to={{
                  pathname: `/request_consultation/${params.specialistId}/skills`,
                  search: location.search,
                  state: {
                    skill: queryParams.skill,
                    firstName: queryParams.firstName,
                    lastName: queryParams.lastName,
                    email: queryParams.email,
                    company: queryParams.company,
                    utmSource: queryParams.utm_source,
                    utmName: queryParams.utm_campaign,
                    utmMedium: queryParams.utm_medium,
                    glid: queryParams.glid,
                  },
                }}
              />
            </Route>
          </Switch>
        </Container>
      </View.Content>
    </View>
  );
};

export default RequestConsultation;
