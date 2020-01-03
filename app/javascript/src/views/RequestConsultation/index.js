// Renders the steps for requesting a consultation with a specialist.
import React from "react";
import queryString from "query-string";
import { useQuery } from "react-apollo";
import {
  useParams,
  Switch,
  Route,
  Redirect,
  matchPath,
  useHistory,
  useLocation,
  generatePath,
} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Card, useTheme, useBreakpoint } from "@advisable/donut";
import NotFound from "../NotFound";
import Loading from "../../components/Loading";
import Topic from "./Topic";
import Skills from "./Skills";
import fetchSpecialist from "./fetchSpecialist";
import Availability from "./Availability";
import CompanyInformation from "./CompanyInformation";
import Sidebar from "./Sidebar";
import Complete from "./Complete";

const RequestConsultation = () => {
  const theme = useTheme();
  const params = useParams();
  const history = useHistory();
  const location = useLocation();
  const { data, loading, error } = useQuery(fetchSpecialist, {
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

  const isComplete = Boolean(
    matchPath(location.pathname, {
      path: "/request_consultation/:specialistId/sent",
    })
  );

  const STEPS = [
    {
      label: "Skills",
      path: "/request_consultation/:specialistId/skills",
      component: Skills,
      disabled: isComplete,
    },
    {
      label: "Company Details",
      path: "/request_consultation/:specialistId/details",
      component: CompanyInformation,
      disabled: isComplete,
    },
    {
      label: "Availability",
      path: "/request_consultation/:specialistId/availability",
      component: Availability,
      disabled: isComplete,
    },
    {
      label: "Topic",
      path: "/request_consultation/:specialistId/topic",
      component: Topic,
      disabled: isComplete,
    },
    {
      path: "/request_consultation/:specialistId/sent",
      component: Complete,
    },
  ];

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (error?.graphQLErrors[0].extensions.code === "notFound") {
    return <NotFound />;
  }

  if (loading) return <Loading />;

  if (queryParams.consultation) {
    return (
      <Redirect
        to={{
          pathname: generatePath(STEPS[2].path, params),
          state: {
            consultationId: queryParams.consultation,
          },
        }}
      />
    );
  }

  const buildStepLocation = (step, params, state) => {
    const pathname = generatePath(step.path, params || {});
    return { ...location, pathname, state: state || location.state };
  };

  const handleStepURL = index => (params, state) => {
    const step = STEPS[index];
    if (step) {
      return buildStepLocation(step, params, state);
    }
  };

  const gotoStep = index => (params, state) => {
    const nextStep = STEPS[index];
    if (nextStep) {
      history.push(buildStepLocation(nextStep, params, state));
    }
  };

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
        <Sidebar steps={STEPS} data={data} />
      </Box>
      <Box width="100%" position="relative">
        <>
          <Switch location={location} key={location.pathname}>
            {STEPS.map((step, i) => (
              <Route
                key={step.path}
                path={step.path}
                render={route => (
                  <motion.div
                    key={step.path}
                    transition={{
                      damping: 30,
                      stiffness: 300,
                      type: "spring",
                    }}
                    initial={{
                      y: mediumAndUp ? 100 : 0,
                      x: mediumAndUp ? 0 : 100,
                      opacity: 0,
                      position: "static",
                    }}
                    animate={{
                      y: 0,
                      x: 0,
                      opacity: 1,
                      position: "static",
                    }}
                    exit={{
                      y: mediumAndUp ? -80 : 0,
                      x: mediumAndUp ? 0 : -80,
                      opacity: 0,
                      position: "absolute",
                    }}
                  >
                    <Card elevation={["none", "m", "m"]}>
                      <step.component
                        {...route}
                        data={data}
                        nextStep={gotoStep(i + 1)}
                        nextStepURL={handleStepURL(i + 1)}
                        previousStep={gotoStep(i - 1)}
                        previousStepURL={handleStepURL(i - 1)}
                      />
                    </Card>
                  </motion.div>
                )}
              />
            ))}
            <Route
              render={() => {
                return (
                  <motion.div exit={{}}>
                    <Redirect
                      to={{
                        pathname: generatePath(STEPS[0].path, params),
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
                  </motion.div>
                );
              }}
            />
          </Switch>
        </>
      </Box>
    </Box>
  );
};

export default RequestConsultation;
