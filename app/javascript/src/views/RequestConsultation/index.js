// Renders the steps for requesting a consultation with a specialist.
import React from "react";
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
  const { specialistId } = useParams();
  const { data, loading, error } = useQuery(fetchSpecialist, {
    variables: { id: specialistId },
  });

  const isComplete = Boolean(
    matchPath(location.pathname, {
      path: "/consultation/:specialistId/sent",
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
      label: "company details",
      path: "/request_consultation/:specialistId/details",
      component: CompanyInformation,
      disabled: isComplete,
    },
    {
      label: "availability",
      path: "/request_consultation/:specialistId/availability",
      component: Availability,
      disabled: isComplete,
    },
    {
      label: "topic",
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

  const handleNextStep = index => nextLocation => {
    const nextStep = STEPS[index + 1];
    if (nextStep) {
      const nextPath = generatePath(nextStep.path, { specialistId });
      history.push({
        ...location,
        pathname: nextPath,
        ...nextLocation,
      });
    }
  };

  const handlePreviousStep = index => nextLocation => {
    const previousStep = STEPS[index - 1];
    if (previousStep) {
      const previousPath = generatePath(previousStep.path, { specialistId });
      history.push({
        ...location,
        pathname: previousPath,
        ...nextLocation,
      });
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
                        nextStep={handleNextStep(i)}
                        previousStep={handlePreviousStep(i)}
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
                      to={generatePath(STEPS[0].path, { specialistId })}
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
