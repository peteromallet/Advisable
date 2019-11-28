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
import { Box, Card } from "@advisable/donut";
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
  const history = useHistory();
  const location = useLocation();
  const params = useParams();
  const { data, loading, error } = useQuery(fetchSpecialist, {
    variables: { id: params.specialistId },
  });

  const queryParams = queryString.parse(location.search);

  const isComplete = Boolean(
    matchPath(location.pathname, {
      path: "/request_consultation/:specialistId/:consultationId/sent",
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
      path: "/request_consultation/:specialistId/:consultationId/availability",
      component: Availability,
      disabled: isComplete,
    },
    {
      label: "Topic",
      path: "/request_consultation/:specialistId/:consultationId/topic",
      component: Topic,
      disabled: isComplete,
    },
    {
      path: "/request_consultation/:specialistId/:consultationId/sent",
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
      width="94%"
      maxWidth={960}
      margin="0 auto"
      py={["s", "m", "l"]}
      display="flex"
    >
      <Box
        width={250}
        mr="l"
        flexShrink={0}
        display={{ _: "none", l: "block" }}
      >
        <Sidebar steps={STEPS} data={data} />
      </Box>
      <Box width="100%" position="relative">
        <AnimatePresence initial={false}>
          <Switch location={location} key={location.pathname}>
            {STEPS.map((step, i) => (
              <Route
                key={step.path}
                path={step.path}
                render={route => (
                  <motion.div
                    key={step.path}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{
                      position: "absolute",
                      opacity: 0,
                      y: -80,
                    }}
                  >
                    <Card padding={["m", "l"]} elevation="m">
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
                        },
                      }}
                    />
                  </motion.div>
                );
              }}
            />
          </Switch>
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default RequestConsultation;
