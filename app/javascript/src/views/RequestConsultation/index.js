import React from "react";
import queryString from "query-string";
import {
  useParams,
  Switch,
  Route,
  Redirect,
  useLocation,
} from "react-router-dom";
import { Box, useTheme, useBreakpoint } from "@advisable/donut";
import NotFound from "../NotFound";
import Loading from "../../components/Loading";
import Topic from "./Topic";
import Skills from "./Skills";
import Availability from "./Availability";
import CompanyInformation from "./CompanyInformation";
import Sidebar from "./Sidebar";
import Send from "./Send";
import Complete from "./Complete";
import { useSpecialist } from "./queries";

const RequestConsultation = () => {
  const theme = useTheme();
  const params = useParams();
  const location = useLocation();
  const { data, loading, error } = useSpecialist({
    variables: { id: params.specialistId },
  });

  const mediumAndUp = useBreakpoint("mUp");
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

  if (error?.graphQLErrors[0].extensions.code === "notFound") {
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
    <Box
      width="100%"
      display="flex"
      maxWidth={960}
      margin="0 auto"
      py={["none", "m", "l"]}
    >
      <Box
        mr="l"
        width={250}
        flexShrink={0}
        display={{ _: "none", l: "block" }}
      >
        <Sidebar data={data} />
      </Box>
      <Box width="100%" position="relative">
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
      </Box>
    </Box>
  );
};

export default RequestConsultation;
